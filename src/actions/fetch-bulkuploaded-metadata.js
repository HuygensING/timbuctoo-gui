import xhr from "xhr";

const fetchBulkUploadedMetadata = (vreId) => (dispatch, getState)  => {
  let location = `${process.env.server}/v2.1/bulk-upload/${vreId}`;
  xhr.get(location, {headers: {"Authorization": getState().userdata.userId}}, function (err, resp, body) {
    const responseData = JSON.parse(body);
    dispatch({type: "FINISH_UPLOAD", data: responseData});
  });
};

export { fetchBulkUploadedMetadata };