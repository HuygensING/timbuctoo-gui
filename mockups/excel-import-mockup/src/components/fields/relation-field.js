import React from "react";
import SelectField from "./select-field";
import BoolField from "./bool-field";

class RelationField extends React.Component {


	render() {
		const { collectionData, importData, onChange, relationTypes, value } = this.props;
		const targetCollectionData = importData.sheets.find((sheet) => sheet.collection === value.targetCollection);

		const collectionSelect = value.linksToOtherSheet ?
			<SelectField label="Links to collection" onChange={(val) => onChange("targetCollection", val)}
				options={importData.sheets.map((sheet) => sheet.collection)} value={value.targetCollection} /> :
			<SelectField label="Links to collection" onChange={(val) => onChange("targetCollection", val)}
				options={["persons", "documents", "keywords", "archives", "collectives"]} value={value.targetCollection} />;

		const reusesBool = collectionData.extendsCollection ?
			<BoolField id="relation-reuses-timbuctoo-relation-type" label="Use existing relation type"
					labelFalse="This creates a new relation type"
					labelTrue="This reuses an existing relation type"
					onChange={(val) => onChange("reusesRelationType", val)}
					value={value.reusesRelationType} /> : null;

		const identifyingColumnSelect = value.linksToOtherSheet && value.targetCollection ?
			<SelectField label="With identifying column" onChange={(val) => onChange("identifyingColumn", val)}
				options={Object.keys(targetCollectionData.variables)} value={value.identifyingColumn} /> : null;

		let relationTypeSelect = null, warningExtendsNone = null, warningTargetExtendsNone = null;
		if (value.reusesRelationType && value.targetCollection && collectionData.extendsCollection && targetCollectionData.extendsCollection) {
			const sourceTypeName = (collectionData.archetypeName || "").replace(/s$/, "");
			const targetTypeName = value.linksToOtherSheet ?
				(targetCollectionData.archetypeName || "").replace(/s$/, "") :
				value.targetCollection.replace(/s$/, "");
			const selectOptions = relationTypes.filter((relType) => 
				relType.sourceTypeName === sourceTypeName && relType.targetTypeName === targetTypeName ||
				relType.targetTypeName === sourceTypeName && relType.sourceTypeName === targetTypeName);

			warningExtendsNone = sourceTypeName === "" ?
				<li className="list-group-item"><p className="danger">* extended collection not specified for this table</p></li> : null;

			warningTargetExtendsNone = !warningExtendsNone && targetTypeName === "" ?
				<li className="list-group-item"><p className="danger">* extended collection not specified for linked table</p></li> : null;

			relationTypeSelect = selectOptions.length ?
				(<SelectField label="Existing relation type" onChange={(val) => onChange("relationType", val)}
					options={selectOptions.map((r) => r.regularName)}
					value={value.relationType} />) : null;

		}

		return (
			<ul className="list-group">
				<BoolField id="relation-links-to-other-sheet" label="Type of link"
					labelFalse="This links to existing timbuctoo data"
					labelTrue="This links to another uploaded table"
					onChange={(val) => onChange("linksToOtherSheet", val)}
					value={value.linksToOtherSheet} />

				{collectionSelect}
				{identifyingColumnSelect}
				{reusesBool}
				{relationTypeSelect}
				{warningExtendsNone}
				{warningTargetExtendsNone}
			</ul>
		);
	}

}

RelationField.propTypes = {
	collectionData: React.PropTypes.object,
	importData: React.PropTypes.object,
	onChange: React.PropTypes.func,
	relationTypes: React.PropTypes.array,
	value: React.PropTypes.object
};

export default RelationField;