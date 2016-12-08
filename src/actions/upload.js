import xhr from "xhr";
import { selectCollection } from "./select-collection";
import { fetchMyVres } from "./fetch-my-vres";


const onUploadFileSelect = (navigateTo, dispatch) => (files, vreName = null) => {
  let file = files[0];
  let formData = new FormData();
  if (vreName) {
    formData.append("vreName", vreName);
  }
  formData.append("file", file);

  dispatch({type: "START_UPLOAD"});
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
      newPart.split("\n").forEach((line, idx) => {
        if (idx % 21 === 0) { dispatch({type: "UPLOAD_STATUS_UPDATE", data: line}); }
      });
    };
    req.onload = function () {
      let location = req.getResponseHeader("location");
      xhr.get(location, {headers: {"Authorization": state.userdata.userId}}, function (err, resp, body) {
        const responseData = JSON.parse(body);
        dispatch({type: "FINISH_UPLOAD", data: responseData, uploadedFileName: file.name});
        navigateTo("mapArchetypes", [responseData.vre]);
        dispatch(fetchMyVres(state.userdata.userId, () => {}));

        if (responseData.collections && responseData.collections.length) {
          dispatch(selectCollection(responseData.collections[0].name));
        }
      });
    };
    req.send(formData);
  });
}

export { onUploadFileSelect };