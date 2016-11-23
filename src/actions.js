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

const buildRdfUriQuery = (rdfAlternatives) => rdfAlternatives
  .map((uri) => `(rdfUri_s:"${uri}" OR rdfAlternatives_ss:"${uri}")`)
  .join(" OR ");

export default function actionsMaker(navigateTo, dispatch) {
  const actions = {
    onFetchEntity: (collectionName, id) => {
      dispatch((redispatch) => {
        redispatch({type: "START_ENTITY_FETCH"});
        xhr(`${process.env.server}/v2.1/domain/${collectionName}/${id}`, (err, resp, body) => {


          const entity = JSON.parse(body);
          if (entity["^rdfAlternatives"]) {
            xhr({
              url: "/repositorysolr/aggregated",
              method: "POST",
              data: `q=${encodeURIComponent(buildRdfUriQuery(entity["^rdfAlternatives"]))}&fl=dataset_s&wt=json`,
              headers: {
                "Content-type": "application/x-www-form-urlencoded"
              }
            }, (err, resp, body) => {
              redispatch({type: "RECEIVE_ENTITY", entity: {
                ...entity,
                "^datasets": JSON.parse(body).response.docs.map((doc) => doc.dataset_s)
              }});
            });

          } else {
            redispatch({type: "RECEIVE_ENTITY", entity: entity});
          }
        })

      });

    }
  };
  return actions;
}