import generateRmlMapping from "../util/generate-rml-mapping";
import {fetchMyVres} from "./fetch-my-vres";
import xhr from "xhr"
import {selectCollection} from "./select-collection";

const publishMappings = (navigateTo) => (dispatch, getState) => {
  const {
    importData: { vre, executeMappingUrl },
    mappings: { collections },
    userdata: { userId },
    predicateObjectMappings,
    activeCollection
  } = getState();

  const jsonLd = generateRmlMapping(vre, collections, predicateObjectMappings);

  console.log(JSON.stringify(jsonLd, null, 2));

  dispatch({type: "PUBLISH_START"});
  xhr({
    url: executeMappingUrl,
    method: "POST",
    headers: {
      "Authorization": userId,
      "Content-type": "application/ld+json"
    },
    data: JSON.stringify(jsonLd)
  }, (err, resp, body) => {
    if (err) {
      dispatch({type: "PUBLISH_HAD_ERROR"})
    } else {
      const { success } = JSON.parse(body);
      if (success) {
        dispatch({type: "PUBLISH_SUCCEEDED"});
        dispatch(fetchMyVres(userId, () => navigateTo("root")));
      } else {
        dispatch({type: "PUBLISH_HAD_ERROR"});
        dispatch(selectCollection(activeCollection.name, null, true));
      }
    }
    dispatch({type: "PUBLISH_FINISHED"});
  });
};

const saveMappingState = () => (dispatch, getState) => {
  const {
    importData: { vre, saveMappingUrl },
    mappings: { collections },
    userdata: { userId },
    predicateObjectMappings
  } = getState();

  const jsonLd = generateRmlMapping(vre, collections, predicateObjectMappings);
  dispatch({type: "SAVE_MAPPING_START"});
  xhr({
    url: saveMappingUrl,
    method: "POST",
    headers: {
      "Authorization": userId,
      "Content-type": "application/ld+json"
    },
    data: JSON.stringify(jsonLd)
  }, (err, resp, body) => {
    if (err) {
      dispatch({type: "SAVE_HAD_ERROR"});
    } else {
      dispatch({type: "SAVE_SUCCEEDED"})
    }
    dispatch({type: "SAVE_FINISHED"});
  })
};

export { publishMappings, saveMappingState }
