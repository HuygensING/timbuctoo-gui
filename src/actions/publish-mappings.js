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


/*  const req = new XMLHttpRequest();
  req.open('POST', executeMappingUrl, true);
  req.setRequestHeader("Authorization", userId);
  req.setRequestHeader("Content-type", "application/ld+json");

  dispatch({type: "PUBLISH_START"});

  let pos = 0;
  req.onreadystatechange = function handleData() {
    if (req.readyState != null && (req.readyState < 3 || req.status != 200)) {
      return
    }
    let newPart = req.responseText.substr(pos);
    pos = req.responseText.length;
    newPart.split("\n").forEach(line => {
      dispatch({type: "PUBLISH_STATUS_UPDATE", data: line});
    });
  };

  req.onload = function () {
    if (req.status > 400) {
      dispatch({type: "PUBLISH_HAD_ERROR"})
    } else {
      dispatch(function (dispatch, getState) {
        var state = getState();
        if (state.importData.publishErrorCount === 0) {
          dispatch({type: "PUBLISH_SUCCEEDED"});
          dispatch(fetchMyVres(userId, () => navigateTo("root")));
        } else {
          dispatch({type: "PUBLISH_HAD_ERROR"});
        }
      });
    }
    dispatch({type: "PUBLISH_FINISHED"});
  };
  req.send(JSON.stringify(jsonLd));*/
};

export { publishMappings }
