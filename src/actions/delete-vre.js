import xhr from "xhr";

const deleteVre = (vreId, confirmedVreId) => (dispatch, getState) => {

  if (vreId !== confirmedVreId) { return; }

  const {
    userdata: { userId },
  } = getState();

  dispatch({type: "BEFORE_DELETE_VRE", vreId: confirmedVreId});

  xhr({
    uri: `${process.env.server}/v2.1/system/vres/${confirmedVreId}`,
    headers: {
      "Authorization": userId
    },
    method: "DELETE"
  }, (err, resp, body) => {
    if (err) {
      dispatch({type: "DELETE_VRE_ERROR", err: err, vreId: confirmedVreId});
    } else {
      if (resp.statusCode == 200) {
        dispatch({type: "DELETE_VRE_SUCCESS", vreId: confirmedVreId});
      } else {
        dispatch({type: "DELETE_VRE_ERROR", vreId: confirmedVreId});
      }
    }
    dispatch({type: "DELETE_VRE_DONE", vreId: confirmedVreId});

  });
};

export { deleteVre }
