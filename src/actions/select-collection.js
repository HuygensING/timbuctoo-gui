import xhr from "xhr";

const selectCollection = (collection, altUrl = null, onlyErrors = false) => (dispatch, getState) => {
  const { importData: { collections }, userdata: { userId }} = getState();
  const selectedCollection = collections.find((col) => col.name === collection);

  if (userId && collections && selectedCollection && selectedCollection.dataUrl) {
    dispatch({type: "ACTIVE_COLLECTION_PENDING"});
    xhr.get((altUrl || selectedCollection.dataUrl) + (onlyErrors ? "?onlyErrors=true" : ""), {
      headers: { "Authorization": userId }
    }, (err, resp, body) => {
      if (err) {
        dispatch({type: "ACTIVE_COLLECTION_FETCH_ERROR", collection: collection, error: err});
      } else {
        try {
          console.log(JSON.parse(body));
          dispatch({type: "RECEIVE_ACTIVE_COLLECTION", collection: collection, data: JSON.parse(body)});
        } catch(e) {
          dispatch({type: "ACTIVE_COLLECTION_FETCH_ERROR", collection: collection, error: e})
        }
      }
      dispatch({type: "ACTIVE_COLLECTION_DONE"});
    });
  }
};


export { selectCollection }