import xhr from "xhr";

export default function actionsMaker(navigateTo, dispatch) {
  const actions = {
    onFetchEntity: (collectionName, id) => {
      dispatch((redispatch) => {
        redispatch({type: "START_ENTITY_FETCH"});
        xhr(`${process.env.server}/v2.1/domain/${collectionName}/${id}`, (err, resp, body) => {
          redispatch({type: "RECEIVE_ENTITY", entity: JSON.parse(body)});
        })

      });

    }
  };
  return actions;
}