import generateRmlMapping from "../util/generate-rml-mapping";
import {fetchMyVres} from "./fetch-my-vres";
import xhr from "xhr"
import {selectCollection} from "./select-collection";

const saveMappingState = (navigateTo = null, redirectTo = null) => (dispatch, getState) => {
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
      dispatch({type: "SAVE_SUCCEEDED"});
      if (redirectTo) {
        navigateTo(redirectTo, [vre, "asd"]);
      }
    }
    dispatch({type: "SAVE_FINISHED"});
  })
};

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

  dispatch(saveMappingState());
  dispatch({type: "PUBLISH_START"});
  const req = new XMLHttpRequest();
  req.open("POST", executeMappingUrl);
  req.setRequestHeader("Authorization", userId);
  req.setRequestHeader("Content-type", "application/ld+json");

  let pos = 0;
  req.onreadystatechange = function handleData() {
    if (req.readyState != null && (req.readyState < 3 || req.status != 200)) {
      return;
    }
    const newPart = req.responseText.substr(pos);
    pos = req.responseText.length;
    newPart.split("\n").forEach((line, idx) => {
      if (idx % 125 === 0 && line.length > 0) {
        dispatch({type: "PUBLISH_STATUS_UPDATE", data: line});
      }
    });
  };
  req.onload = function () {
    const parts = req.responseText.split("\n");
    if (parts[parts.length - 1] === "success") {
      dispatch({type: "PUBLISH_SUCCEEDED"});
      dispatch(fetchMyVres(userId, () => navigateTo("root")));
      xhr.get(process.env.server + "/v2.1/system/vres", (err, resp, body) => {
        dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
      });
    } else {
      dispatch({type: "PUBLISH_HAD_ERROR"});
      dispatch(selectCollection(activeCollection.name, null, true));
    }

    dispatch({type: "PUBLISH_FINISHED"});
  };
  req.send(JSON.stringify(jsonLd));
};

const saveNewMappingState = (navigateTo) => (dispatch) => {
  dispatch({type: "CLEAR_PREDICATE_OBJECT_MAPPINGS"});

  dispatch(saveMappingState(navigateTo, "mapData"));
};

export { publishMappings, saveMappingState, saveNewMappingState }
