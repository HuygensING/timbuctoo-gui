import xhr from "xhr";

const fetchMyVres = (token, callback) => (dispatch) => {
  xhr(process.env.server + "/v2.1/system/users/me/vres", {
    headers: {
      "Authorization": token
    }
  }, (err, resp, body) => {
    const vreData = JSON.parse(body);
    dispatch({type: "RECEIVE_MY_VRES", data: token, vreData: vreData});
    callback(vreData);
  });
};

export { fetchMyVres }