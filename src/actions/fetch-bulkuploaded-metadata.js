import xhr from "xhr";
import { selectCollection } from "./select-collection"

const fetchBulkUploadedMetadata = (vreId, mappingsFromUrl) => (dispatch, getState)  => {
  let location = `${process.env.server}/v2.1/bulk-upload/${vreId}`;
  xhr.get(location, {headers: {"Authorization": getState().userdata.userId}}, function (err, resp, body) {
    const responseData = JSON.parse(body);
    dispatch({type: "FINISH_UPLOAD", data: responseData});

    if (responseData.collections && responseData.collections.length) {
      dispatch(selectCollection(responseData.collections[0].name));
    }

    if (mappingsFromUrl) {
      dispatch({type: "MAP_COLLECTION_ARCHETYPES", data: mappingsFromUrl});

    }
  });
};

export { fetchBulkUploadedMetadata };