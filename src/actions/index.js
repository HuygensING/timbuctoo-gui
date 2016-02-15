import clone from "clone-deep";
import xhr from "xhr";

import store from "../store";
import fieldDefinitions from "../static/field-definitions";

const fetchEntity = (location, next) => {
	xhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: location
	}, (err, resp, body) => {
		const data = JSON.parse(body);
		next(data);
	});
};


// Use XHR to fetch the keyword options defined in the fieldDefinition
// using path property.
//  --> FIXME: we should not use async for all this stuff,
//      the server could give these values via the fieldDefinitions directly
const fetchKeywordOptions = (fieldDefinition, done) =>
		xhr({
			url: `/api/v2.1/${fieldDefinition.path}`,
			headers: {"Accept": "application/json", "VRE_ID": "WomenWriters"}
		}, (err, resp, body) => resp.statusCode !== 200 ?
			done({key: fieldDefinition.name, options: []}) :
			done({key: fieldDefinition.name, options: JSON.parse(body).map((opt) => {return {key: opt.key.replace(/^.*\//, ""), value: opt.value}; }) }));


// Three step approach:
// 0. Fetch the fieldDefinitions for the given domain (TODO: should become server request in stead of static source file)
// 1. Fetch all the options for the fields which are of type "keyword"/relation (FIXME: this should come directly from the fieldDefinition)
// 2. Add the options as a property to the fieldDefinition
// 3. Dispatch the requested actionType (RECEIVE_ENTITY or NEW_ENTITY)
const getFieldDescription = (domain, actionType, data = null) => {
	return (dispatch) => {

		const promises = fieldDefinitions[domain]
			.filter((fieldDef) => fieldDef.type === "keyword")
			.map((fieldDef) => new Promise((resolve) => fetchKeywordOptions(fieldDef, resolve)));

		Promise.all(promises).then((responses) => {
			dispatch({
				type: actionType,
				domain: domain,
				fieldDefinitions: fieldDefinitions[domain].map((fieldDef) => {
					return {
						...fieldDef,
						options: fieldDef.options || (responses.find((r) => r.key === fieldDef.name) || {}).options || null
					};
				}),
				data: data
			});
		});
	};
};


const saveRelations = (data, relationData, fieldDefs, token, dispatch) => {
	const makeSaveRelationPayload = (relation, key) => {
			const fieldDef = fieldDefs.find((def) => def.name === key);
			const jsonPayload = {
				"@type": fieldDef.relation.type,
				"^sourceId": fieldDef.relation.isInverseName ? relation.id : data._id,
				"^sourceType": fieldDef.relation.isInverseName ? fieldDef.relation.targetType : fieldDef.relation.sourceType,
				"^targetId": fieldDef.relation.isInverseName ? data._id : relation.id,
				"^targetType": fieldDef.relation.isInverseName ? fieldDef.relation.sourceType : fieldDef.relation.targetType,
				"^typeId": fieldDef.relation.typeId,
				accepted: relation.accepted
			};

			if(relation.relationId) { jsonPayload._id = relation.relationId; }
			if(relation.rev) { jsonPayload["^rev"] = relation.rev; }

			return {
				method: relation.relationId ? "PUT" : "POST",
				headers: {
					"Accept": "application/json",
					"Content-type": "application/json",
					"Authorization": token,
					"VRE_ID": "WomenWriters"
				},
				url: `/api/v2.1/domain/${fieldDef.relation.type}s${relation.relationId ? "/" + relation.relationId : ""}`,
				data: JSON.stringify(jsonPayload)
			};
	};

	const newPayloads = Object.keys(relationData).map((key) =>
		relationData[key]
			.filter((relation) => (data["@relations"][key] || []).map((origRelation) => origRelation.id).indexOf(relation.id) < 0)
			.map((relation) => makeSaveRelationPayload(relation, key))
	).reduce((a, b) => a.concat(b), []);

	const updatePayloads = Object.keys(data["@relations"]).map((key) =>
		data["@relations"][key]
			.filter((origRelation) =>
				(origRelation.accepted === false && (relationData[key] || []).map((relation) => relation.id).indexOf(origRelation.id) > -1) ||
				((relationData[key] || []).map((relation) => relation.id).indexOf(origRelation.id) < 0)
			)
			.map((relation) => {
				console.log(relation);
				return makeSaveRelationPayload(relation, key);
			})

	).reduce((a, b) => a.concat(b), []);

	const promises = newPayloads
		.map((payload) => new Promise((resolve) => xhr(payload, resolve)))
		.concat(updatePayloads
			.map((payload) => new Promise((resolve) => xhr(payload, resolve)))
		);

	Promise.all(promises).then(() => {
		fetchEntity(
			`/api/v2.1/domain/${data["@type"]}s/${data._id}`,
			(respData) => dispatch(getFieldDescription(respData["@type"], "RECEIVE_ENTITY", respData))
		);
	});

};

const saveEntity = () => (dispatch, getState) => {
	let saveData = clone(getState().entity.data);
	let relationData = clone(saveData["@relations"]);
	delete saveData["@relations"];

	xhr({
		method: getState().entity.data._id ? "PUT" : "POST",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": getState().user.token,
			"VRE_ID": "WomenWriters"
		},
		body: JSON.stringify(saveData),
		url: `/api/v2.1/domain/${getState().entity.domain}s${getState().entity.data._id ? "/" + getState().entity.data._id : ""}`
	}, (err, resp, body) => {
		if(resp.statusCode === 201) {
			// POST RESPONSE --> FETCH ENTITY --> SAVE RELATIONS --> FETCH ENTITY
			dispatch((redispatch) => fetchEntity(resp.headers.location, (data) =>
				saveRelations(data, relationData, getState().entity.fieldDefinitions, getState().user.token, redispatch)
			));
		} else if(resp.statusCode === 200) {
			// PUT RESPONSE --> SAVE RELATIONS --> FETCH ENTITY
			const data = JSON.parse(resp.body);
			dispatch((redispatch) => saveRelations(data, relationData, getState().entity.fieldDefinitions, getState().user.token, redispatch));
		} else {
			console.log(err, resp, body);
			// TEMP
			dispatch((redispatch) => saveRelations(getState().entity.data, relationData, getState().entity.fieldDefinitions, getState().user.token, redispatch));
		}
	});
};

const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

export default {
	onNew: (domain) => store.dispatch(getFieldDescription(domain, "NEW_ENTITY")),
	onSelect: (record) => store.dispatch((redispatch) =>
		fetchEntity(`/api/v2.1/domain/${record.domain}s/${record.id}`, (data) => redispatch(getFieldDescription(data["@type"], "RECEIVE_ENTITY", data))
	)),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onSave: () => store.dispatch(saveEntity()),
	onLoginChange: (response) => store.dispatch(setUser(response))
};