const properties2skip =['http://www.w3.org/2000/01/rdf-schema#comment','http://purl.org/dc/terms/identifier','http://www.w3.org/2000/01/rdf-schema#seeAlso']
const ontologies = ['http://downloads.dbpedia.org/2016-04/dbpedia_2016-04.owl','http://xmlns.com/foaf/spec/index.rdf','http://www.w3.org/2000/01/rdf-schema.rdf','http://www.w3.org/1999/02/22-rdf-syntax-ns.rdf','https://www.w3.org/2009/08/skos-reference/skos.rdf','https://www.w3.org/ns/prov-o.owl','http://www.w3.org/2002/07/owl.ttl','http://dublincore.org/2012/06/14/dcterms.ttl']	
const $rdf = require('rdflib');
const store = $rdf.graph()
const timeout = 5000 // 5000 ms timeout
const fetcher = new $rdf.Fetcher(store, timeout)
const uploadedSources = new Array


function pushTriple(triples_array, object, provenance, property_uri, subject_uri, propertiesLabels){
			
	var propertyLabel = getPropertyLabel(property_uri,propertiesLabels)
	if(propertyLabel=='sameas' & uploadedSources.indexOf(object)==-1){
		var hasLink = true
		var row = {property: propertyLabel, object: object, provenance: provenance, selected: false, property_uri:property_uri, object_uri: object, subject_uri: subject_uri, hasLink: hasLink}
		if(Object.keys(triples_array).indexOf('Other sources') == -1){
			triples_array['Other sources'] = new Map()
		}
		if(Object.keys(triples_array['Other sources']).indexOf('sameas')==-1){
			triples_array['Other sources'][propertyLabel]= {list: new Array(), isExpanded: true}
		}
		var flag = false
		for(var i = 0; i < triples_array['Other sources'][propertyLabel].list.length; i++){
			if(triples_array['Other sources'][propertyLabel].list[i].object == row.object){
				triples_array['Other sources'][propertyLabel].list[i].provenance += ', ' + row.provenance
				flag = true
				break
			}
		}
		if (flag == false){
			triples_array['Other sources'][propertyLabel].list.push(row)
		}
	}else{
		if(Object.keys(triples_array).indexOf(provenance)==-1){
			triples_array[provenance] = new Map()
		}
		if(Object.keys(triples_array[provenance]).indexOf(propertyLabel)==-1){
			triples_array[provenance][propertyLabel] = new Map
			triples_array[provenance][propertyLabel]= {list: new Array(), isExpanded: false}
		}
		var row = {property: propertyLabel, object: object, provenance: provenance, selected: false, property_uri:property_uri, object_uri: object, subject_uri: subject_uri, hasLink: false}
		triples_array[provenance][propertyLabel].list.push(row) 
	}
	return triples_array
}

function removeUploadedSource(dataArray){
	var keys = Object.keys(dataArray['Other sources']['sameas'])
	for(var k = 0; k<keys.length; k++){
		var dataList = dataArray['Other sources']['sameas'][keys[k]]
		for(var d = 0; d < dataList.length; d++){
			if(uploadedSources.indexOf(dataArray['Other sources']['sameas'][keys[k]][d].object)!=-1){
				dataArray['Other sources']['sameas'][keys[k]].splice(d, 1)
			}		
		}
	}
	
	return(dataArray)
}

function extractSource(source){
	if (source.indexOf('http://viaf')==0){
		source = source.split('/rdf.xml')[0]
	}
	if(uploadedSources.indexOf(source)==-1){
		uploadedSources.push(source)
	}
	source = source.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1");
	return source.split('http://')[1]
}
function getPropertyLabel(property,propertiesLabels){
	if((typeof (propertiesLabels)) =='undefined'){
		var parts = property.split('/');
			if (parts[parts.length-1].indexOf('#') != -1){
				parts = parts[parts.length-1].split('#')
			}
		var label = parts[parts.length-1]
	}else{	
		if(typeof (propertiesLabels[property]) =='undefined'){
			var parts = property.split('/');
			if (parts[parts.length-1].indexOf('#') != -1){
				parts = parts[parts.length-1].split('#')
			}
			var label = parts[parts.length-1]
		}else{
			var label = propertiesLabels[property]	
			// console.log(label)
		}
	}
	return label.toLowerCase()
};

function uniqueArray(inputArray){
	var outputArray = new Array()
	for(var i=0; i<inputArray.length; i++){
		var pro = inputArray[i];
		if (outputArray.indexOf(pro.value)==-1){
			outputArray.push(pro.value);
		}
	}
	return outputArray
};

function uniqueArrayObjects(array2sort){
	var result = new Array()
	for(var i = 0; i < array2sort.length; i++){
		if(typeof array2sort[i].lang !='undefined'){
			if(array2sort[i].lang.indexOf('en')==0){
				if(result.indexOf(array2sort[i].value)== -1){
					result.push(array2sort[i].value)
				}
			}
		}else{
			if(result.indexOf(array2sort[i].value)== -1){
				result.push(array2sort[i].value)
			}
		}
	}
	return result
};

const getData = (subject, property, objects, prov, primary_data, propertyLabels,sameAsList) =>{	
	
	if (properties2skip.indexOf(property) ==-1 & property.indexOf('http://www.iana.org')!=0){
		var unique_objects = uniqueArrayObjects(objects)
		for(var i=0; i<unique_objects.length; i++){
			var object = unique_objects[i]
			primary_data = pushTriple(primary_data, object, prov, property, subject,propertyLabels)
			
		}
		
	}
	
	return(primary_data)
};

export function SampleClick() {
	var url = document.getElementById('input_url').value;
	var url_complete = '';
	if (url.indexOf('http://viaf')==0){
		url_complete = url+'/rdf.xml';
	}else{
		url_complete = url;
	};
	var primary_data = new Array();
	var propertiesLabels = new Map();
		
	
	// fetcher.nowOrWhenFetched(ontologies[0], function(ok, body, xhr) {
	// if (!ok) {
	// 		console.log("Oops, something happened and couldn't fetch data");
	// 	} else {
	// 		fetcher.nowOrWhenFetched(ontologies[1], function(ok, body, xhr) {
	// 			if (!ok) {
	// 				console.log("Oops, something happened and couldn't fetch data");
	// 			} else {
	// 				fetcher.nowOrWhenFetched(ontologies[2], function(ok, body, xhr) {
	// 					if (!ok) {
	// 						console.log("Oops, something happened and couldn't fetch data");
	// 					} else {
	// 						fetcher.nowOrWhenFetched(ontologies[3], function(ok, body, xhr) {
	// 							if (!ok) {
	// 								console.log("Oops, something happened and couldn't fetch data");
	// 							} else {
	// 								fetcher.nowOrWhenFetched(ontologies[4], function(ok, body, xhr) {
	// 									if (!ok) {
	// 										console.log("Oops, something happened and couldn't fetch data");
	// 									} else {
	// 										fetcher.nowOrWhenFetched(ontologies[5], function(ok, body, xhr) {
	// 											if (!ok) {
	// 												console.log("Oops, something happened and couldn't fetch data");
	// 											} else {
	// 												fetcher.nowOrWhenFetched(ontologies[6], function(ok, body, xhr) {
	// 													if (!ok) {
	// 														console.log("Oops, something happened and couldn't fetch data");
	// 													} else {
	// 														fetcher.nowOrWhenFetched(ontologies[7], function(ok, body, xhr) {
	// 															if (!ok) {
	// 																console.log("Oops, something happened and couldn't fetch data");
	// 															} else {
																	fetcher.nowOrWhenFetched(url_complete, function(ok, body, xhr) {
																		if (!ok) {
																			console.log("Oops, something happened and couldn't fetch data");
																			dispatch({type: "NO_DATA", 
																					  data: "The url you typed is not a valid RDF resource. Please try again."
																					})
																		} else {												
																			var labels_data = store.statementsMatching(undefined,$rdf.sym('http://www.w3.org/2000/01/rdf-schema#label'),undefined)																
																			for(var i = 0; i<labels_data.length; i++){
																				if(labels_data[i].object.lang){
																					if(labels_data[i].object.lang == 'en'){
																						var sub = labels_data[i].subject.value
																						var obj = labels_data[i].object.value
																						propertiesLabels[sub] = obj
																					}
																				}else{
																					var sub = labels_data[i].subject.value
																					var obj = labels_data[i].object.value
																					propertiesLabels[sub] = obj
																				}
																			}	
																			
																			var s = $rdf.sym(url),
																			prop = store.each(s, undefined);																			
																			var sameAs_prop = $rdf.sym("http://schema.org/sameAs");
																			var sameASes = store.each(s,sameAs_prop,undefined);
																			for (var i=0; i<sameASes.length; i++){
																				var temp = sameASes[i].value;
																				if (temp.indexOf('http://dbpedia.org/resource/')==0){
																					var Dbpedia_sameAs = temp;
																				}
																			}
																			var prov = extractSource(url_complete)																					
																			var unique_prop = uniqueArray(prop)																			
																			for(var i=0; i<unique_prop.length; i++){       	
																				var prop = unique_prop[i];
																				var objects = store.each(s,$rdf.sym(prop),undefined);
																				primary_data = getData(url,prop,objects,prov,primary_data,propertiesLabels)																						
																			}
																			if(typeof (Dbpedia_sameAs)=='undefined') {
																				primary_data = removeUploadedSource(primary_data)
																				dispatch({type: "RECEIVE_URL", 
																						data: primary_data
																				})
																				}else{
																					fetcher.nowOrWhenFetched(Dbpedia_sameAs, function(ok, body, xhr) {
																						if (!ok) {
																							console.log("Oops, something happened and couldn't fetch data");
																						} else {
																							var s = $rdf.sym(Dbpedia_sameAs)
																							var props = store.each(s, undefined)
																							var unique_prop = uniqueArray(props)
																							var prov = extractSource(Dbpedia_sameAs)
																							var count = 0
																							for(var i=0; i<unique_prop.length; i++){     
																								var prop = unique_prop[i];
																								var objects = store.each(s,$rdf.sym(prop),undefined);
																								primary_data = getData(Dbpedia_sameAs,prop,objects,prov,primary_data,propertiesLabels)	
																							}
																							primary_data = removeUploadedSource(primary_data)
																							console.log(primary_data)
																							// return primary_data
																							return({type: "RECEIVE_URL", 
																									data: primary_data
 																								})
																						}
																					})	
																				}
																			}
																		})
		// 															}
		// 														})
		// 													}
		// 												})
		// 											}
		// 										})
		// 									}
		// 								})
		// 							}
		// 						})
		// 					}
		// 				})
		// 			}
		// 		})
		// 	}
	// })
}
