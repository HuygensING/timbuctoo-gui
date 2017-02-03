import xhr from "xhr";
import {fetchMyVres} from "./fetch-my-vres";
import {selectCollection} from "./select-collection";


const submitRsDiscovery = (dispatch, getState)  => {
  const { resourceSync: { discovery }} = getState();

  dispatch({type: "RS_PENDING"});
  xhr(`${process.env.TIMBUCTOO_URL}/v2.1/remote/rs/discover/listgraphs/${encodeURIComponent(discovery)}`, (err, resp, body) => {
    if (resp.statusCode !== 200) {
      dispatch({type: "RECEIVE_RS_ERROR"});
    } else {
      dispatch({type: "RECEIVE_RS_SET_DETAILS", data: JSON.parse(body).setDetails});
    }
  });

};

const importRsDataset = (navigateTo, dispatch1) => (name, {vreId, vreName}) => {

  dispatch1((dispatch, getState) => {
    const { resourceSync: { discovery: source }, userdata: { userId }} = getState();
    const payLoad = {
      source: source,
      name: name,
      vreName: vreId || vreName
    };

    dispatch({type: "START_RS_IMPORT", status: "Importing dataset " + name});

    const req = new XMLHttpRequest();
    req.open("POST", `${process.env.TIMBUCTOO_URL}/v2.1/remote/rs/import`);
    req.setRequestHeader("Authorization", userId);
    req.setRequestHeader("Content-type", "application/json");
    var isRedirectedToSettings = false;

    req.onreadystatechange = function() {
      if (!isRedirectedToSettings) {
        isRedirectedToSettings = true;
        dispatch(fetchMyVres(userId, (vreData) => {
          if (vreId) {
            navigateTo("editDatasetWithFormat", [vreId, "rs"]);
          } else if (vreName) {
            const vreFromLabel = Object.keys(vreData.mine)
              .map(key => vreData.mine[key]).find(vre => vre.label === vreName);
            if (vreFromLabel) {
              navigateTo("editDatasetWithFormat", [vreFromLabel.name, "rs"]);
            }
          }
        }));
      }

      if (req.readyState != null && (req.readyState < 3 || req.status != 200)) {
        return
      }
      var newPart = req.responseText.substr(pos);
      pos = req.responseText.length;
      newPart.split("\n").forEach((line) => {
        dispatch({type: "RS_IMPORT_STATUS_UPDATE", data: line});
      });
    };

    const afterUpload = () => {
      dispatch(fetchMyVres(userId, () => { }));
      xhr.get(process.env.TIMBUCTOO_URL + "/v2.1/system/vres", (err, resp, body) => {
        dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
      });
    };

    const onError = () => {
      dispatch({type: "FINISH_RS_IMPORT", success: false});
      afterUpload();
    };

    req.onerror = onError;

    req.onload = function () {
      if (this.status >= 300 || this.status < 200) {
        onError();
      } else {
        dispatch({type: "FINISH_RS_IMPORT", success: true});
        afterUpload();
      }
    };

    req.send(JSON.stringify(payLoad));
  })

};

export { submitRsDiscovery, importRsDataset }