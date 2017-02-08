const initialState = {};

export default function (state = initialState, action) {
	
	switch (action.type) {
		
		case "RECEIVE_URL":
			return {
				...state,
				data: action.data,
				isFetching: false
			};

		case "NO_DATA":
			return {
				...state,
				data: action.data,
				isFetching: false
			}

		case "SELECT_VALUE":
			let newData = Object.assign({}, state.data)
			if ([action.property] != 'sameAs') {
				newData[action.provenance][action.property].list[action.id].selected = !state.data[action.provenance][action.property].list[action.id].selected
				return {
					...state,
					data: newData
				};
			}

		case "EXPAND_ROWS":
			newData = Object.assign({}, state.data)
			if ([action.property] != 'sameAs') {
				newData[action.provenance][action.property].isExpanded = !state.data[action.provenance][action.property].isExpanded
				newData[action.provenance][action.property].list[0].selected = !newData[action.provenance][action.property].list[0].selected
				return {
					...state,
					data: newData
				};
			}
			return {
					...state,
					data: newData
				};
		case "NEW_SOURCE_ERROR":
			var uploadedSources = action.uploaded
			if(typeof uploadedSources != 'undefined'){
				var OldSameAs = Object.assign({}, state.data);
				var keys = Object.keys(OldSameAs['Other sources']['sameAs'])
				for (var k = 0; k < keys.length; k++) {
					var dataList = OldSameAs['Other sources']['sameAs'][keys[k]]
					for (var d = 0; d < dataList.length; d++) {
						if (uploadedSources.indexOf(OldSameAs['Other sources']['sameAs'][keys[k]][d].object) != -1) {
							OldSameAs['Other sources']['sameAs'][keys[k]].splice(d, 1)
						}
					}
				}
				var mergedData = Object.assign({}, state.data, OldSameAs)
				return {
					...state,
					errorText: true,
					data: mergedData,
					isFetching: false
				}}

		case "LOADING":
			return Object.assign({}, state, {
    			isFetching: true
			})

		case "CLOSE_ERROR_DIV":
			return Object.assign({}, state, {
    			errorText: false
			})

		case "INCLUDE_NEW_SOURCE":
			if (typeof (action.data) != 'undefined') {
				var uploadedSources = action.uploaded;
				var OldSameAs = Object.assign({}, state.data);
				var keys = Object.keys(OldSameAs['Other sources']['sameAs'])
				for (var k = 0; k < keys.length; k++) {
					var dataList = OldSameAs['Other sources']['sameAs'][keys[k]]
					for (var d = 0; d < dataList.length; d++) {
						if (uploadedSources.indexOf(OldSameAs['Other sources']['sameAs'][keys[k]][d].object) != -1) {
							OldSameAs['Other sources']['sameAs'][keys[k]].splice(d, 1)
						}
					}
				}

				if (typeof (action.data['Other sources']) != 'undefined') {
					var NewSameAs = action.data['Other sources']['sameAs'].list
					for (var i = 0; i < NewSameAs.length; i++) {
						var flag = false
						for (var ii = 0; ii < OldSameAs['Other sources']['sameAs'].list.length; ii++) {
							var cleaned_OldSameAs = OldSameAs['Other sources']['sameAs'].list[ii].object.replace('http://', '').replace('www.', '')
							var cleaned_NewSameAs = NewSameAs[i].object.replace('http://', '').replace('www.', '')
							if (cleaned_OldSameAs == cleaned_NewSameAs) {
								OldSameAs['Other sources']['sameAs'].list[ii].provenance += ', ' + NewSameAs[i].provenance
								flag = true
								break
							}
						}
						if (flag == false) {
							OldSameAs['Other sources']['sameAs'].list.push(NewSameAs[i])
						}
					}
				}




				var mergedData = Object.assign({}, state.data, action.data, OldSameAs)

				return {
					...state,
					data: mergedData,
					isFetching: false,
					errorText:false
				}
			};

		case "UPLOAD":
			var triples2load = new Array;
			newData = Object.assign({}, state.data);
			for (var key in newData) {
				for (var key2 in newData[key]) {
					var object_list = newData[key][key2].list
					for (var i = 0; i < object_list.length; i++) {
						if (object_list[i].selected == true) {
							// if(Object.keys(triples2load).indexOf(object_list[i].subject_uri) ==-1){
							// 	triples2load[object_list[i].subject_uri] = new Map
							// }
							// if(Object.keys(triples2load[object_list[i].subject_uri]).indexOf(object_list[i].property_uri) ==-1){
							// 	triples2load[object_list[i].subject_uri][object_list[i].property_uri] = new Array
							// }
							triples2load.push([object_list[i].subject_uri, object_list[i].property_uri, object_list[i].object_uri])
						}
					}
				}
			}
			console.log(triples2load)
			// var jsonLDMAP = '['
			// var subjects = Object.keys(triples2load)
			// for (var keySub in triples2load){
			//  	jsonLDMAP += '{"@id":"' +  keySub +'"'
			// 	if(subjects.length >1){
			// 		jsonLDMAP += ',"http://www.w3.org/2002/07/owl#sameAs":['
			// 		var index = subjects.indexOf(keySub)
			// 		subjects.splice(index, 1)
			// 		for (var s = 0 ; s < subjects.length; s++){
			// 			if (keySub!=subjects[s]){
			// 				jsonLDMAP += '"' +subjects[s] +'"'
			// 				if (s<subjects.length-1){
			// 					jsonLDMAP += ','
			// 				}
			// 			}
			// 		}
			// 		jsonLDMAP += ']'
			// 	}

			// 	for (var keyProp in triples2load[keySub]){
			// 		jsonLDMAP += ',"'+ keyProp +'":['
			// 		for (var o =0; o  < triples2load[keySub][keyProp].length ; o++){
			// 			jsonLDMAP += '"'+triples2load[keySub][keyProp][o] +'"'
			// 			if (o != triples2load[keySub][keyProp].length-1){
			// 				jsonLDMAP +=","
			// 			}else{
			// 				jsonLDMAP +="]"
			// 			}
			// 		}
			// 	}
			// 	jsonLDMAP +="},"
			// }
			// if(jsonLDMAP[jsonLDMAP.length-1]==','){
			// 	jsonLDMAP = jsonLDMAP.substring(0, jsonLDMAP.length - 1) + "]"
			// }else{
			// 	jsonLDMAP += "]"
			// }

			// console.log(typeof jsonLDMAP)	

			return {
				...state,
				uploadDatajs: triples2load,
				propertyList: action.properties
			}
	}

	return state;
}