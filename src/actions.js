/*eslint no-shadow: [2, { "allow": ["dispatch"] }]*/
import xhr from "xhr";
import mappingToJsonLdRml from "./util/mappingToJsonLdRml";

export default function actionsMaker(navigateTo, dispatch) {
  //bind to variable so an action can trigger other actions
  let actions = {
    onToken: function (token) {
      xhr(process.env.server + "/v2.1/system/users/me/vres", {
        headers: {
          "Authorization": token
        }
      }, (err, resp, body) => {
        const vreData = JSON.parse(body);
        dispatch({type: "LOGIN", data: token, vreData: vreData});
        if (vreData.mine) {
          navigateTo("collectionsOverview");
        }
      });
    },
    onLoadMoreClick: function (url, collection) {
      dispatch((dispatch, getState) => {
        var state = getState();
        var payload = {
          headers: {
            "Authorization": state.userdata.userId
          }
        };
        xhr.get(url, payload, function (err, resp, body) {
          if (err) {
            dispatch({type: "COLLECTION_ITEMS_LOADING_ERROR", collection: collection, error: err })
          } else {
            try {
              dispatch({type: "COLLECTION_ITEMS_LOADING_SUCCEEDED", collection: collection, data: JSON.parse(body)});
            } catch(e) {
              dispatch({type: "COLLECTION_ITEMS_LOADING_ERROR", collection: collection, error: e })
            }
          }
          dispatch({type: "COLLECTION_ITEMS_LOADING_FINISHED", collection: collection})
        });
      })

    },
    onUploadFileSelect: function (files, isReupload = false) {
      let file = files[0];
      let formData = new FormData();
      formData.append("file", file);
      dispatch({type: "START_UPLOAD"})
      dispatch(function (dispatch, getState) {
        var state = getState();
        var req = new XMLHttpRequest();
        req.open('POST', process.env.server + "/v2.1/bulk-upload", true);
        req.setRequestHeader("Authorization", state.userdata.userId);
        var pos = 0;
        req.onreadystatechange = function handleData() {
          if (req.readyState != null && (req.readyState < 3 || req.status != 200)) {
              return
          }
          var newPart = req.responseText.substr(pos);
          pos = req.responseText.length;
          newPart.split("\n").forEach(line => dispatch({type: "UPLOAD_STATUS_UPDATE", data: line}));
        };
        req.onload = function (err, resp) {
          let location = req.getResponseHeader("location");
          xhr.get(location, {headers: {"Authorization": state.userdata.userId}}, function (err, resp, body) {
            dispatch({type: "FINISH_UPLOAD", data: JSON.parse(body), uploadedFileName: file.name});
            if (isReupload) {
              actions.onSelectCollection(state.importData.activeCollection);
            } else {
              navigateTo("mapArchetypes");
            }
          });
        };
        req.send(formData);
      });
    },
    onContinueMapping: function (vreId) {
      dispatch(function(dispatch, getState) {
        var state = getState();
        xhr.get(state.userdata.myVres[vreId].rmlUri, {headers: {"Authorization": state.userdata.userId}}, function (err, resp, body) {
          dispatch({type: "FINISH_UPLOAD", data: JSON.parse(body)});
          navigateTo("mapArchetypes");
        });
      });
    },
/*		onSaveMappings: function () {
      dispatch({type: "SAVE_STARTED"})
      dispatch(function (dispatch, getState) {
        var state = getState();
        var payload = {
          json: mappingToJsonLdRml(state.mappings, state.importData.vre),
          headers: {
            "Authorization": state.userdata.userId
          }
        };

        xhr.post(state.importData.saveMappingUrl, payload, function (err, resp) {
          if (err) {
            dispatch({type: "SAVE_HAD_ERROR"})
          } else {
            dispatch({type: "SAVE_SUCCEEDED"})
          }
          dispatch({type: "SAVE_FINISHED"})
        });
      });
    },*/

    onPublishData: function (){
      dispatch({type: "SAVE_STARTED"});
      dispatch({type: "SAVE_FINISHED"});
      dispatch({type: "PUBLISH_STARTED"});
      dispatch(function (dispatch, getState) {
        var state = getState();
        var jsonLd = mappingToJsonLdRml(state.mappings, state.importData.vre, state.archetype);
        console.log(jsonLd);
        var payload = {
          body: JSON.stringify(jsonLd),
          headers: {
            "Authorization": state.userdata.userId,
            "Content-type": "application/ld+json"
          }
        };

        xhr.post(state.importData.executeMappingUrl, payload, function (err, resp) {
          if (err) {
            dispatch({type: "PUBLISH_HAD_ERROR"})
          } else {
            if (JSON.parse(resp.body).success) {
              dispatch({type: "PUBLISH_SUCCEEDED"});
              actions.onToken(state.userdata.userId);
            } else {
              dispatch({type: "PUBLISH_HAD_ERROR"});
              actions.onSelectCollection(state.importData.activeCollection);
            }
          }
          dispatch({type: "PUBLISH_FINISHED"});
        });
      });
    },

    onSelectCollection: (collection) => {
      dispatch({type: "SET_ACTIVE_COLLECTION", collection: collection});
      dispatch(function (dispatch, getState) {
        var state = getState();
        var currentSheet = state.importData.sheets.find(x => x.collection === collection);
        if (currentSheet.rows.length === 0 && currentSheet.nextUrl && !currentSheet.isLoading) {
          var payload = {
            headers: {
              "Authorization": state.userdata.userId
            }
          };
          dispatch({type: "COLLECTION_ITEMS_LOADING" })
          xhr.get(currentSheet.nextUrl, payload, function (err, resp, body) {
            if (err) {
              dispatch({type: "COLLECTION_ITEMS_LOADING_ERROR", collection: collection, error: err })
            } else {
              try {
                dispatch({type: "COLLECTION_ITEMS_LOADING_SUCCEEDED", collection: collection, data: JSON.parse(body)});
              } catch(e) {
                dispatch({type: "COLLECTION_ITEMS_LOADING_ERROR", collection: collection, error: e })
              }
            }
            dispatch({type: "COLLECTION_ITEMS_LOADING_FINISHED", collection: collection})
          });
        }
      });
    },

    onMapCollectionArchetype: (collection, value) =>
      dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),

    onConfirmCollectionArchetypeMappings: () => {
      dispatch({type: "CONFIRM_COLLECTION_ARCHETYPE_MAPPINGS"})
      dispatch(function (dispatch, getState) {
        let state = getState();
        actions.onSelectCollection(state.importData.activeCollection);
      })
      navigateTo("mapData");
    },

    onSetFieldMapping: (collection, propertyField, importedField) =>
      dispatch({type: "SET_FIELD_MAPPING", collection: collection, propertyField: propertyField, importedField: importedField}),

    onClearFieldMapping: (collection, propertyField, clearIndex) =>
      dispatch({type: "CLEAR_FIELD_MAPPING", collection: collection, propertyField: propertyField, clearIndex: clearIndex}),

    onSetDefaultValue: (collection, propertyField, value) =>
      dispatch({type: "SET_DEFAULT_VALUE", collection: collection, propertyField: propertyField, value: value}),

    onConfirmFieldMappings: (collection, propertyField) =>
      dispatch({type: "CONFIRM_FIELD_MAPPINGS", collection: collection, propertyField: propertyField}),

    onUnconfirmFieldMappings: (collection, propertyField) =>
      dispatch({type: "UNCONFIRM_FIELD_MAPPINGS", collection: collection, propertyField: propertyField}),

    onSetValueMapping: (collection, propertyField, timValue, mapValue) =>
      dispatch({type: "SET_VALUE_MAPPING", collection: collection, propertyField: propertyField, timValue: timValue, mapValue: mapValue}),

    onIgnoreColumnToggle: (collection, variableName) =>
      dispatch({type: "TOGGLE_IGNORED_COLUMN", collection: collection, variableName: variableName}),

    onAddCustomProperty: (collection, propertyName, propertyType) =>
      dispatch({type: "ADD_CUSTOM_PROPERTY", collection: collection, propertyField: propertyName, propertyType: propertyType}),

    onRemoveCustomProperty: (collection, propertyName) =>
      dispatch({type: "REMOVE_CUSTOM_PROPERTY", collection: collection, propertyField: propertyName}),

    onCloseMessage: (messageId) =>
      dispatch({type: "TOGGLE_MESSAGE", messageId: messageId})
  };
  return actions;
}
