import xhr from "xhr";


const submitRsDiscovery = (dispatch, getState)  => {
  const { resourceSync: { discovery }} = getState();

  dispatch({type: "RS_PENDING"});
  xhr(`${process.env.server}/v2.1/remote/rs/discover/listgraphs/${encodeURIComponent(discovery)}`, (err, resp, body) => {
    if (resp.statusCode !== 200) {
      dispatch({type: "RECEIVE_RS_ERROR"});
    } else {
      dispatch({type: "RECEIVE_RS_SET_DETAILS", data: JSON.parse(body).setDetails});
    }
  });

};

const importRsDataset = (navigateTo, dispatch1) => (name, vreName) => {

  dispatch1((dispatch, getState) => {
    const { resourceSync: { discovery: source }} = getState();
    const payLoad = {
      source: source,
      name: name,
      vreName: vreName
    };

    dispatch({type: "START_UPLOAD", uploadedFileName: name, uploadStatus: "Importing dataset"});

    console.log(JSON.stringify(payLoad));

  })

};

export { submitRsDiscovery, importRsDataset }