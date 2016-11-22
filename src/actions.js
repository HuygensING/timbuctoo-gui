import xhr from "xhr";
import solrPaginationQuery from "./solr-pagination-query";

const setPagination = (state) => (redispatch, getState) => {
  const { query } = state;
  const newQuery = solrPaginationQuery(query);
  const lastQuery = solrPaginationQuery(getState().solrSearch.query);

  if (newQuery === lastQuery) { return; }
  const timeStamp = new Date().getTime();
  redispatch({type: "CLEAR_PAGINATION"});
  xhr({
    url: "/repositorysolr/aggregated",
    method: "POST",
    data: newQuery,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }, (err, resp, body) => {
    redispatch({
      type: "SET_PAGINATION",
      requestTime: timeStamp,
      docs: JSON.parse(body).response.docs
    });
  });
};

export { setPagination }

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