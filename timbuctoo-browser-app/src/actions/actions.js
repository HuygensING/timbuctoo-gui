// import SampleClick from './actions/SampleClick'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from "redux-thunk";

const properties2skip = ['http://www.w3.org/2000/01/rdf-schema#comment', 'http://purl.org/dc/terms/identifier', 'http://www.w3.org/2000/01/rdf-schema#seeAlso']
const ontologies = ['http://downloads.dbpedia.org/2016-04/dbpedia_2016-04.owl', 'http://xmlns.com/foaf/spec/index.rdf', 'http://www.w3.org/2000/01/rdf-schema.rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns.rdf', 'https://www.w3.org/2009/08/skos-reference/skos.rdf', 'https://www.w3.org/ns/prov-o.owl', 'http://www.w3.org/2002/07/owl.ttl', 'http://dublincore.org/2012/06/14/dcterms.ttl']
const $rdf = require('rdflib');
const store = $rdf.graph()
const timeout = 5000 // 5000 ms timeout
const fetcher = new $rdf.Fetcher(store, timeout)
const uploadedSources = new Array
const Labels = new Map();



function fix_url(url) {
	var entityURL = url;
	var url_fixed;

	if (url.indexOf('http://viaf') == 0) {

		url_fixed = url + '/rdf.xml'
	} else if (url.indexOf('http://dbpedia.org/page') == 0) {
		url_fixed = url_fixed.replace('page', 'resource')

		entityURL = url_fixed
	} else if (url.indexOf('https://www.wikidata.org') == 0 || url.indexOf('http://www.wikidata.org') == 0) {
		var splittedURL = url.split('/')
		var entityID = splittedURL[splittedURL.length - 1]

		url_fixed = 'https://www.wikidata.org/wiki/Special:EntityData/' + entityID + '.rdf'
		entityURL = 'http://www.wikidata.org/entity/' + entityID
	} else if (url.indexOf('http://d-nb.info/gnd/') == 0) {
		url_fixed = url + '/about/lds'
	} else if (url.indexOf('http://id.loc.gov/') == 0) {
		url_fixed = url + '.rdf'
	} else {
		url_fixed = url;

	}
	url_fixed = process.env.TIMBUCTOO_PROXY_URL + "?url="+ encodeURIComponent(url_fixed);
	return ([url_fixed, entityURL])
}

function pushTriple(triples_array, object_uri, provenance, property_uri, subject_uri) {
	if (typeof object_uri == 'string') {
		var propertyLabel = getPropertyLabel(property_uri)
		var objectLabel = getObjectLabel(object_uri)

		if (propertyLabel == 'sameAs') {
			if (uploadedSources.indexOf(object_uri) == -1) {
				var row = { property: propertyLabel, object: objectLabel, provenance: provenance, selected: false, property_uri: property_uri, object_uri: object_uri, subject_uri: subject_uri, hasLink: true }
				if (Object.keys(triples_array).indexOf('Other sources') == -1) {
					triples_array['Other sources'] = new Map()
				}
				if (Object.keys(triples_array['Other sources']).indexOf('sameAs') == -1) {
					triples_array['Other sources']['sameAs'] = { list: new Array(), isExpanded: true }
				}
				var flag = false
				for (var i = 0; i < triples_array['Other sources']['sameAs'].list.length; i++) {
					if (triples_array['Other sources']['sameAs'].list[i].object == row.object) {
						triples_array['Other sources']['sameAs'].list[i].provenance += ', ' + row.provenance
						flag = true
						break
					}
				}
				if (flag == false) {
					triples_array['Other sources']['sameAs'].list.push(row)
				}
			}
		} else {
			if (Object.keys(triples_array).indexOf(provenance) == -1) {
				triples_array[provenance] = new Map()
			}
			if (Object.keys(triples_array[provenance]).indexOf(propertyLabel) == -1) {
				triples_array[provenance][propertyLabel] = new Map
				triples_array[provenance][propertyLabel] = { list: new Array(), isExpanded: false }
			}
			var row = { property: propertyLabel, object: objectLabel, provenance: provenance, selected: false, property_uri: property_uri, object_uri: object_uri, subject_uri: subject_uri, hasLink: false }
			triples_array[provenance][propertyLabel].list.push(row)
		}
	}
	return triples_array
}

function removeUploadedSource(dataArray) {
	if (typeof (dataArray['Other sources']) != 'undefined') {
		var keys = Object.keys(dataArray['Other sources']['sameAs'])
		for (var k = 0; k < keys.length; k++) {
			var dataList = dataArray['Other sources']['sameAs'][keys[k]]
			for (var d = 0; d < dataList.length; d++) {
				if (uploadedSources.indexOf(dataArray['Other sources']['sameAs'][keys[k]][d].object) != -1) {
					dataArray['Other sources']['sameAs'][keys[k]].splice(d, 1)
				}
			}
		}
	}
	return (dataArray)
}

function extractSource(source) {
	if (source.indexOf('http://viaf') == 0) {
		source = source.split('/rdf.xml')[0]
	}
	if (uploadedSources.indexOf(source) == -1) {
		uploadedSources.push(source)
	}
	source = source.toString().replace(/^(.*\/\/[^\/?#]*).*$/, "$1")
	return source.split('http://')[1]
}

function getObjectLabel(url) {
	var label = url
	if (typeof url == 'string') {
		url = url.replace('prop/direct', 'entity')
		url = url.replace('prop', 'entity')
		if ((typeof (Labels)) != 'undefined') {
			if (typeof (Labels[url]) != 'undefined') {
				label = Labels[url]
			}
		}
	}
	return label
}

function getPropertyLabel(url) {
	url = url.replace('prop/direct', 'entity')
	url = url.replace('prop', 'entity')
	if ((typeof (Labels)) == 'undefined') {
		var parts = url.split('/');
		if (parts[parts.length - 1].indexOf('#') != -1) {
			parts = parts[parts.length - 1].split('#')
		}
		var label = parts[parts.length - 1]
	} else {
		if (typeof (Labels[url]) == 'undefined') {
			var parts = url.split('/');
			if (parts[parts.length - 1].indexOf('#') != -1) {
				parts = parts[parts.length - 1].split('#')
			}
			var label = parts[parts.length - 1]
		} else {
			var label = Labels[url]
		}
	}
	return label
};

function uniqueArray(inputArray) {
	var outputArray = new Array()
	for (var i = 0; i < inputArray.length; i++) {
		var pro = inputArray[i];
		if (outputArray.indexOf(pro.value) == -1) {
			outputArray.push(pro.value);
		}
	}
	return outputArray
};

function uniqueArrayObjects(array2sort) {
	var result = new Array()
	for (var i = 0; i < array2sort.length; i++) {
		if (typeof array2sort[i].lang != 'undefined') {
			if (array2sort[i].lang.indexOf('en') != -1) {
				if (result.indexOf(array2sort[i].value) == -1) {
					result.splice(0,0,array2sort[i].value)
				}
			} else {
				if (result.indexOf(array2sort[i].value) == -1) {
					result.push(array2sort[i].value)
				}
			}
		} else {
			if (result.indexOf(array2sort[i].value) == -1) {
				result.push(array2sort[i].value)
			}
		}
	}

	return result
};

function getData(subject, property, objects, prov, primary_data) {
	if (properties2skip.indexOf(property) == -1 & property.indexOf('http://www.iana.org') != 0) {
		var unique_objects = uniqueArrayObjects(objects)
		for (var i = 0; i < unique_objects.length; i++) {
			var object = unique_objects[i]
			primary_data = pushTriple(primary_data, object, prov, property, subject)
		}
	}

	return (primary_data)
};



export default function (navigateTo, dispatch) {
	return {

		
		onSampleClick: function (input) {

			dispatch({
				type: "LOADING",
			})
			
			if(typeof input[0] !='string'){
				var input_url = new Array
				input_url.push(document.getElementById('input_url').value)
			}else if(typeof input =='string'){
				var input_url = new Array
				input_url.push(input)
			}else if(typeof input =='object'){
				var input_url = input
			}
			var primary_data = new Array();

			input_url.forEach(function(listItem, url_index){
				var url = fix_url(input_url[url_index])
				var entityURL = url[1]
				var url_complete = decodeURIComponent(url[0])
				
				fetcher.nowOrWhenFetched(url_complete, function (ok, body, xhr) {
					if (!ok) {
						console.log("Oops, something happened and couldn't fetch data");
						dispatch({
							type: "INVALID_URL"
						})
					} else {

						var labels_data = store.statementsMatching(undefined, $rdf.sym('http://www.w3.org/2000/01/rdf-schema#label'), undefined)

						for (var i = 0; i < labels_data.length; i++) {
							if (labels_data[i].object.lang) {
								if (labels_data[i].object.lang == 'en') {
									var sub = labels_data[i].subject.value
									var obj = labels_data[i].object.value
									Labels[sub] = obj
								}
							} else {
								var sub = labels_data[i].subject.value
								var obj = labels_data[i].object.value
								Labels[sub] = obj
							}
						}
						var s = $rdf.sym(entityURL)
						var prop = store.each(s, undefined)
						var unique_prop = uniqueArray(prop)
						var prov = extractSource(entityURL)

						for (var i = 0; i < unique_prop.length; i++) {
							var prop = unique_prop[i];
							var objects = store.each(s, $rdf.sym(prop), undefined);
							primary_data = getData(url, prop, objects, prov, primary_data)
						}

						// if (input_url.length == 1 && url_complete.indexOf('dbpedia') == -1) {
						// 	//look for DBpedia url
						// 	for (var i = 0; i < primary_data['Other sources']['sameAs'].list.length; i++) {
						// 		if (primary_data['Other sources']['sameAs'].list[i].object.indexOf('http://dbpedia') == 0) {
						// 			var Dbpedia_sameAs = primary_data['Other sources']['sameAs'].list[i].object
						// 			break //when found stop searching
						// 		}
						// 	}
						// 	if (typeof (Dbpedia_sameAs) != 'undefined') {
						// 		var escaped_Dbpedia_sameAs = process.env.TIMBUCTOO_PROXY_URL + "?url="+ encodeURIComponent(Dbpedia_sameAs);
						// 		fetcher.nowOrWhenFetched(escaped_Dbpedia_sameAs, function (ok, body, xhr) {
						// 			if (!ok) {
						// 				console.log("Oops, something happened and couldn't fetch data");
						// 				primary_data = removeUploadedSource(primary_data)
						// 				dispatch({
						// 					type: "RECEIVE_URL",
						// 					data: primary_data
						// 				})
						// 			} else {
						// 				var s = $rdf.sym(Dbpedia_sameAs)
						// 				var props = store.each(s, undefined)
						// 				var unique_prop = uniqueArray(props)
						// 				var prov = extractSource(Dbpedia_sameAs)
						// 				for (var i = 0; i < unique_prop.length; i++) {
						// 					var prop = unique_prop[i];
						// 					var objects = store.each(s, $rdf.sym(prop), undefined);
						// 					primary_data = getData(Dbpedia_sameAs, prop, objects, prov, primary_data)
						// 				}
						// 				primary_data = removeUploadedSource(primary_data)
						// 				dispatch({
						// 					type: "RECEIVE_URL",
						// 					data: primary_data
						// 				})
						// 			}
						// 		})
						// 	}
						// } else {
							primary_data = removeUploadedSource(primary_data)
							dispatch({
								type: "RECEIVE_URL",
								data: primary_data
							})
						// }
					}
				})
			})
		},

		onValueClick: function (property, id, provenance) {
			dispatch({
				type: "SELECT_VALUE",
				provenance: provenance,
				property: property,
				id: id
			})
		},

		onLinkClick: function (objectUri) {
			dispatch({
				type: "LOADING",
			})
			const store = $rdf.graph()
			const fetcher = new $rdf.Fetcher(store, timeout)
			var newData = new Array()
			var url = fix_url(objectUri)
			var new_url = url[0]
			var entityURL = url[1]
			fetcher.nowOrWhenFetched(new_url, function (ok, body, xhr) {
				if (!ok) {
					var prov = extractSource(entityURL)
					console.log("Oops, something happened and couldn't fetch data");
					dispatch({
						type: "NEW_SOURCE_ERROR",
						uploaded: uploadedSources
					})
				} else {

					var labels_data = store.statementsMatching(undefined, $rdf.sym('http://www.w3.org/2000/01/rdf-schema#label'), undefined)
					for (var i = 0; i < labels_data.length; i++) {
						if (labels_data[i].object.lang) {
							if (labels_data[i].object.lang == 'en') {
								var sub = labels_data[i].subject.value
								var obj = labels_data[i].object.value
								Labels[sub] = obj
							}
						} else {
							var sub = labels_data[i].subject.value
							var obj = labels_data[i].object.value
							Labels[sub] = obj
						}
					}
					var s = $rdf.sym(entityURL)
					var props = store.each(s, undefined)
					var unique_prop = uniqueArray(props)
					var prov = extractSource(entityURL)

					for (var i = 0; i < unique_prop.length; i++) {
						var prop = unique_prop[i];
						var objects = store.each(s, $rdf.sym(prop), undefined);
						newData = getData(new_url, prop, objects, prov, newData)
					}

					dispatch({
						type: "INCLUDE_NEW_SOURCE",
						uploaded: uploadedSources,
						data: newData
					})
				}
			})
		},

		closeErrorDiv: function(){
			dispatch({
				type:"CLOSE_ERROR_DIV"
			})
		},
		expandClick: function (property, provenance) {
			dispatch({
				type: "EXPAND_ROWS",
				property: property,
				provenance: provenance
			})
		},

		uploadData: function () {
			// var collectionInfoURL = `${process.env.server}/v2.1/metadata/Admin?withCollectionInfo=true`
			// fetch(collectionInfoURL, {
			// method: 'get',
			// headers: {
			// 	'Accept': 'application/json',
			// 	'Content-Type': 'application/json',
			// },
			// })
			// .then(response => {
			// if (response.status >= 200 && response.status < 300) {
			// 	console.log(response);
			// 	dispatch(loginSuccess(response));
			// } else {
			// 	const error = new Error(response.statusText);
			// 	error.response = response;
			// 	dispatch(loginError(error));
			// 	throw error;
			// }
			// })
			// .catch(error => { console.log('request failed', error); });

			var response = JSON.parse('{"relations":{"collectionName":"relations","collectionLabel":"relations","description":null,"unknown":false,"relationCollection":true,"archetypeName":"relation","properties":[]},"concepts":{"collectionName":"concepts","collectionLabel":"concepts","description":"Concepts which do not conform to a specific archetype.","unknown":false,"relationCollection":false,"archetypeName":"concept","properties":[{"name":"hasFirstPerson","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"OUT","outName":"hasFirstPerson","inName":"isFirstPersonInRelation","targetCollection":"persons","relationCollection":"relations","relationTypeId":"fcaed6c6-afdc-4345-a795-596c9f10a33b"}},{"name":"hasSecondPerson","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"OUT","outName":"hasSecondPerson","inName":"isSecondPersonInRelation","targetCollection":"persons","relationCollection":"relations","relationTypeId":"db9fb895-bfb1-4d78-8eeb-c56e3825e87a"}},{"name":"hasPersonToPersonRelationType","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"OUT","outName":"hasPersonToPersonRelationType","inName":"isPersonToPersonRelationTypeOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"2dddb267-7da1-412c-ae20-4f35fa2299fb"}},{"name":"hasStateType","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"OUT","outName":"hasStateType","inName":"isStateTypeOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"196aeaab-c1f5-452f-a73c-d2c02274d1ea"}},{"name":"isStateOfPerson","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"OUT","outName":"isStateOfPerson","inName":"hasPersonState","targetCollection":"persons","relationCollection":"relations","relationTypeId":"13f1ed51-c66a-4250-9016-591f247a3f98"}},{"name":"isStateLinkedToInstitute","type":"relation","quicksearch":"/v2.1/domain/collectives/autocomplete","relation":{"direction":"OUT","outName":"isStateLinkedToInstitute","inName":"isInstituteLinkedToState","targetCollection":"collectives","relationCollection":"relations","relationTypeId":"20d51c91-fd15-4f8f-bace-da73a8238d45"}},{"name":"isStateLinkedToLocation","type":"relation","quicksearch":"/v2.1/domain/locations/autocomplete","relation":{"direction":"OUT","outName":"isStateLinkedToLocation","inName":"isLocationLinkedToState","targetCollection":"locations","relationCollection":"relations","relationTypeId":"0e58684f-3bf9-45b2-b534-c5302d9ed8f2"}},{"name":"hasDataLineType","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"OUT","outName":"hasDataLineType","inName":"isDataLineTypeOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"fd1d272e-376f-4ed3-b592-3708e43703bd"}},{"name":"isDataLineForPerson","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"OUT","outName":"isDataLineForPerson","inName":"hasDataLine","targetCollection":"persons","relationCollection":"relations","relationTypeId":"e7096a9f-b7be-447c-b101-da7e86b0440b"}},{"name":"hasFieldOfInterest","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"OUT","outName":"hasFieldOfInterest","inName":"isFieldOfInterestOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"1e8c984d-44e2-4253-b462-1819c51d9c0d"}},{"name":"isScientistBioOf","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"OUT","outName":"isScientistBioOf","inName":"hasScientistBio","targetCollection":"persons","relationCollection":"relations","relationTypeId":"4f840df2-00c5-4643-849d-ac00dc791dfc"}},{"name":"isPersonToPersonRelationTypeOf","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"hasPersonToPersonRelationType","inName":"isPersonToPersonRelationTypeOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"2dddb267-7da1-412c-ae20-4f35fa2299fb"}},{"name":"isStateTypeOf","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"hasStateType","inName":"isStateTypeOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"196aeaab-c1f5-452f-a73c-d2c02274d1ea"}},{"name":"isDataLineTypeOf","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"hasDataLineType","inName":"isDataLineTypeOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"fd1d272e-376f-4ed3-b592-3708e43703bd"}},{"name":"isFieldOfInterestOf","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"hasFieldOfInterest","inName":"isFieldOfInterestOf","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"1e8c984d-44e2-4253-b462-1819c51d9c0d"}}]},"documents":{"collectionName":"documents","collectionLabel":"documents","description":"Stories, novels, letters, diaries, plays, films, etc.","unknown":false,"relationCollection":false,"archetypeName":"document","properties":[{"name":"title","type":"text"},{"name":"documentType","type":"text"},{"name":"date","type":"datable"},{"name":"isCreatedBy","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"OUT","outName":"isCreatedBy","inName":"isCreatorOf","targetCollection":"persons","relationCollection":"relations","relationTypeId":"b2bb977b-63e6-46f9-99d7-9de55f82e0b1"}}]},"collectives":{"collectionName":"collectives","collectionLabel":"collectives","description":"Institutes, multiple persons, companies, etc.","unknown":false,"relationCollection":false,"archetypeName":"collective","properties":[{"name":"name","type":"text"},{"name":"hasMember","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"OUT","outName":"hasMember","inName":"isMemberOf","targetCollection":"persons","relationCollection":"relations","relationTypeId":"595e6e24-a171-493b-9a4e-88da1e110c40"}},{"name":"locatedAt","type":"relation","quicksearch":"/v2.1/domain/locations/autocomplete","relation":{"direction":"OUT","outName":"locatedAt","inName":"isHomeOf","targetCollection":"locations","relationCollection":"relations","relationTypeId":"cbbd772e-1409-4b25-9625-8793120ff9c5"}},{"name":"isInstituteLinkedToState","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"isStateLinkedToInstitute","inName":"isInstituteLinkedToState","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"20d51c91-fd15-4f8f-bace-da73a8238d45"}}]},"locations":{"collectionName":"locations","collectionLabel":"locations","description":"Countries, cities, villages, streets, etc.","unknown":false,"relationCollection":false,"archetypeName":"location","properties":[{"name":"name","type":"text"},{"name":"country","type":"text"},{"name":"isBirthPlaceOf","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"IN","outName":"hasBirthPlace","inName":"isBirthPlaceOf","targetCollection":"persons","relationCollection":"relations","relationTypeId":"89907c10-081d-48f2-91b8-9810f966bcf0"}},{"name":"isDeathPlaceOf","type":"relation","quicksearch":"/v2.1/domain/persons/autocomplete","relation":{"direction":"IN","outName":"hasDeathPlace","inName":"isDeathPlaceOf","targetCollection":"persons","relationCollection":"relations","relationTypeId":"75b76004-579d-4339-9e03-7f229abc8cde"}},{"name":"isHomeOf","type":"relation","quicksearch":"/v2.1/domain/collectives/autocomplete","relation":{"direction":"IN","outName":"locatedAt","inName":"isHomeOf","targetCollection":"collectives","relationCollection":"relations","relationTypeId":"cbbd772e-1409-4b25-9625-8793120ff9c5"}},{"name":"isLocationLinkedToState","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"isStateLinkedToLocation","inName":"isLocationLinkedToState","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"0e58684f-3bf9-45b2-b534-c5302d9ed8f2"}}]},"persons":{"collectionName":"persons","collectionLabel":"persons","description":"People with at least a name, birthdate and birthplace.","unknown":false,"relationCollection":false,"archetypeName":"person","properties":[{"name":"names","type":"names","options":["FORENAME","SURNAME","NAME_LINK","ROLE_NAME","GEN_NAME"]},{"name":"gender","type":"text"},{"name":"birthDate","type":"datable"},{"name":"deathDate","type":"datable"},{"name":"hasBirthPlace","type":"relation","quicksearch":"/v2.1/domain/locations/autocomplete","relation":{"direction":"OUT","outName":"hasBirthPlace","inName":"isBirthPlaceOf","targetCollection":"locations","relationCollection":"relations","relationTypeId":"89907c10-081d-48f2-91b8-9810f966bcf0"}},{"name":"hasDeathPlace","type":"relation","quicksearch":"/v2.1/domain/locations/autocomplete","relation":{"direction":"OUT","outName":"hasDeathPlace","inName":"isDeathPlaceOf","targetCollection":"locations","relationCollection":"relations","relationTypeId":"75b76004-579d-4339-9e03-7f229abc8cde"}},{"name":"isMemberOf","type":"relation","quicksearch":"/v2.1/domain/collectives/autocomplete","relation":{"direction":"IN","outName":"hasMember","inName":"isMemberOf","targetCollection":"collectives","relationCollection":"relations","relationTypeId":"595e6e24-a171-493b-9a4e-88da1e110c40"}},{"name":"isCreatorOf","type":"relation","quicksearch":"/v2.1/domain/documents/autocomplete","relation":{"direction":"IN","outName":"isCreatedBy","inName":"isCreatorOf","targetCollection":"documents","relationCollection":"relations","relationTypeId":"b2bb977b-63e6-46f9-99d7-9de55f82e0b1"}},{"name":"isFirstPersonInRelation","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"hasFirstPerson","inName":"isFirstPersonInRelation","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"fcaed6c6-afdc-4345-a795-596c9f10a33b"}},{"name":"isSecondPersonInRelation","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"hasSecondPerson","inName":"isSecondPersonInRelation","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"db9fb895-bfb1-4d78-8eeb-c56e3825e87a"}},{"name":"hasPersonState","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"isStateOfPerson","inName":"hasPersonState","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"13f1ed51-c66a-4250-9016-591f247a3f98"}},{"name":"hasDataLine","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"isDataLineForPerson","inName":"hasDataLine","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"e7096a9f-b7be-447c-b101-da7e86b0440b"}},{"name":"hasScientistBio","type":"relation","quicksearch":"/v2.1/domain/concepts/autocomplete","relation":{"direction":"IN","outName":"isScientistBioOf","inName":"hasScientistBio","targetCollection":"concepts","relationCollection":"relations","relationTypeId":"4f840df2-00c5-4643-849d-ac00dc791dfc"}}]}}')
			// console.log(response)
			var keys = Object.keys(response)
			var properties = new Array
			for (var i = 0; i < keys.length; i++) {
				var k = Object.keys(response[keys[i]]['properties'])
				for (var ii = 0; ii < k.length; ii++) {
					// if(response[keys[i]]['properties'][k[ii]].type=='relation'){
					properties.push(response[keys[i]]['properties'][k[ii]].name)
					// }
				}
			}
			dispatch({
				type: "UPLOAD",
				properties: properties
			})
		}
	}
};

