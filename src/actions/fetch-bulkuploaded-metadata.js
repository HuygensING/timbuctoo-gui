import xhr from "xhr";
import { selectCollection } from "./select-collection"
import { deserializeSavedRmlMapping } from "./predicate-object-mappings";

const fetchBulkUploadedMetadata = (vreId, navigateTo) => (dispatch, getState)  => {
  let location = `${process.env.server}/v2.1/bulk-upload/${vreId}`;
  xhr.get(location, {headers: {"Authorization": getState().userdata.userId}}, function (err, resp, body) {
    const responseData = JSON.parse(body);
    dispatch({type: "FINISH_UPLOAD", data: responseData});

    if (responseData.collections && responseData.collections.length) {
      dispatch(selectCollection(responseData.collections[0].name));
    }

    if (responseData.savedMappingState) {
      dispatch(deserializeSavedRmlMapping(responseData.savedMappingState));
    }

    if (navigateTo) {
      if (responseData.savedMappingState) {
        navigateTo("mapData", [vreId]);
      } else {
        navigateTo("mapArchetypes", [vreId]);
      }
    }
  });
};

export { fetchBulkUploadedMetadata };