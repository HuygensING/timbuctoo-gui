import xhr from "xhr";
import { selectCollection } from "./select-collection";
import { fetchMyVres } from "./fetch-my-vres";


const onUploadFileSelect = (navigateTo, dispatch) => (files, { vreName, vreId, redirectTo, format, csvSettings }) => {
  let formData = new FormData();
  if (!vreId && vreName) {
    // Set a name on first upload
    formData.append("vreName", vreName);
  } else if (vreId) {
    // This is a reupload
    formData.append("vreId", vreId);
  }
  formData.append("uploadType", format);

  if (csvSettings) {
    for (let setting in csvSettings) {
      if (csvSettings.hasOwnProperty(setting) && csvSettings[setting]) {
        formData.append(setting, csvSettings[setting]);
      }
    }
  }

  let uploadedFileNames = [];
  for (let i = 0; i < files.length; i++) {
    formData.append("file", files.item(i));
    uploadedFileNames.push(files.item(i).name);
  }

  dispatch({type: "START_UPLOAD", uploadedFileName: uploadedFileNames.join("; ")});
  dispatch(function (dispatch, getState) {
    var state = getState();
    var req = new XMLHttpRequest();
    if (vreId) {
      // This is a re-upload of the data
      req.open('PUT', process.env.server + "/v2.1/bulk-upload", true);
    } else {
      req.open('POST', process.env.server + "/v2.1/bulk-upload", true);
    }
    req.setRequestHeader("Authorization", state.userdata.userId);
    var pos = 0;
    var isRedirectedToSettings = false;
    req.onreadystatechange = function handleData() {
      if (!isRedirectedToSettings) {
        isRedirectedToSettings = true;
        dispatch(fetchMyVres(state.userdata.userId, (vreData) => {
          if (vreId) {
            navigateTo(redirectTo || "editDatasetWithFormat", [vreId, format]);
          } else if (vreName) {
            const vreIdFromLabel = Object.keys(vreData.mine)
              .map(key => vreData.mine[key]).find(vre => vre.label === vreName).name;
            navigateTo(redirectTo || "editDatasetWithFormat", [vreIdFromLabel, format]);
          }
        }));
      }
      if (req.readyState != null && (req.readyState < 3 || req.status != 200)) {
        return
      }
      var newPart = req.responseText.substr(pos);
      pos = req.responseText.length;
      newPart.split("\n").forEach((line) => {
        dispatch({type: "UPLOAD_STATUS_UPDATE", data: line});
      });
    };

    req.onload = function () {
      let location = req.getResponseHeader("location");
      xhr.get(location, {headers: {"Authorization": state.userdata.userId}}, function (err, resp, body) {
        const responseData = JSON.parse(body);
        dispatch({type: "FINISH_UPLOAD", data: responseData, uploadedFileName: uploadedFileNames});
        dispatch(fetchMyVres(state.userdata.userId, () => { }));
        xhr.get(process.env.server + "/v2.1/system/vres", (err, resp, body) => {
          dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
        });
        if (responseData.collections && responseData.collections.length) {
          dispatch(selectCollection(responseData.collections[0].name));
        }
      });
    };
    req.send(formData);
  });
};

const uploadImage = (vreId, files) => (dispatch, getState) => {
  const { userdata: { userId } } = getState();

  const file = files[0];
  const formData = new FormData();
  const req = new XMLHttpRequest();

  formData.append("file", file);

  req.open('POST', `${process.env.server}/v2.1/bulk-upload/${vreId}/image`, true);
  req.setRequestHeader("Authorization", userId);
  dispatch({type: "IMAGE_UPLOAD_STARTED"});
  req.onload = function() {
    if (this.status >= 300 || this.status < 200) {
      dispatch({type: "IMAGE_UPLOAD_ERROR", message: this.responseText});
    } else {
      dispatch({type: "IMAGE_UPLOAD_SUCCESS"});
      dispatch(fetchMyVres(userId, () => { }));
      xhr.get(process.env.server + "/v2.1/system/vres", (err, resp, body) => {
        dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
      });
    }
    dispatch({type: "IMAGE_UPLOAD_FINISHED"});
  };

  req.send(formData);

};

const saveDatasetSettings = (vreId, next = () => {}) => (dispatch, getState) => {
  const { datasetSettings, userdata: { userId } } = getState();
  xhr({
    url: `${process.env.server}/v2.1/bulk-upload/${vreId}`,
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": userId
    },
    data: JSON.stringify({
      label: datasetSettings.newVreName,
      provenance: datasetSettings.provenance,
      colorCode: datasetSettings.colorCode,
      description: datasetSettings.description
    })
  }, (err, resp, body) => {
    dispatch(fetchMyVres(userId, () => { }));
    xhr.get(process.env.server + "/v2.1/system/vres", (err, resp, body) => {
      dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
    });
    next();
  });
};

export { onUploadFileSelect, saveDatasetSettings, uploadImage };