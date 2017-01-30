import xhr from "xhr";
import { selectCollection } from "./select-collection"
import { deserializeSavedRmlMapping } from "./predicate-object-mappings";
import PublishState from "../util/publish-state";

const fetchBulkUploadedMetadata = (vreId, navigateTo, onFetchError = () => {}) => (dispatch, getState)  => {
  let location = `${process.env.TIMBUCTOO_URL}/v2.1/bulk-upload/${vreId}`;
  xhr.get(location, {headers: {"Authorization": getState().userdata.userId}}, function (err, resp, body) {
    if (resp.statusCode > 299 || resp.statusCode < 200) {
      return onFetchError();
    }

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
    if(responseData.publishState === PublishState.AVAILABLE) {
      onFetchError();
    }
  });
};

export { fetchBulkUploadedMetadata };