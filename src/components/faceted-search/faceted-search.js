import React from "react";
import SearchFields from "./search-fields";
import Page from "../page.js";
import CurrentQuery from "./current-query";
import Pagination from "./results/pagination";
import GroupMenu from "./group-menu";
import ResultList from "./results/list";
import searchClient from "../../solr-client";


const datasetsFromSearchFields = (datasets, searchFields) => {
  if (searchFields.length === 0) {
    return datasets;
  }

  const selectedDatasets = searchFields.filter((sf) => sf.field === "dataset_s")[0].value;
  if (!selectedDatasets || selectedDatasets.length === 0) {
    return datasets;
  }
  return selectedDatasets;
};


class FacetedSearch extends React.Component {

  onShowAllDatasetsClick() {
    searchClient.getHandlers().onSearchFieldChange("dataset_s", []);
  }

  onDatasetClick(value) {
    const { solrSearch: { query : { searchFields }, datasets } } = this.props;
    const selectedDatasets = datasetsFromSearchFields(datasets, searchFields);
    const datasetFilter = selectedDatasets.indexOf(value) < 0
      ? selectedDatasets.concat(value)
      : selectedDatasets.filter((dataset) => dataset !== value);

    searchClient.getHandlers().onSearchFieldChange("dataset_s", datasetFilter);
  }

  render() {
    const { solrSearch } = this.props;
    const {
      onSetCollapse,
      onFacetSortChange,
      onSearchFieldChange,
      onSortFieldChange,
      onPageChange,
      onNewSearch
    } = searchClient.getHandlers();

    const activeDatasets = datasetsFromSearchFields(solrSearch.datasets, solrSearch.query.searchFields);

    return (
      <Page>
        <div className="container big-margin">
          <div className="row basic-margin hi-underline facet">
            <div className="col-sm-2 col-md-1">
              <h2>Dataset</h2>
            </div>
            <div className="col-sm-10 col-md-11 text-right">
              {solrSearch.datasets.map((dataset) =>
                activeDatasets.indexOf(dataset) > -1 ?
                  (<span key={dataset} className="btn toggleTag toggleTag--active" onClick={() => this.onDatasetClick(dataset)}>
                    {dataset.replace(/^[^_]+_+/, "")}{" "}
                    <span className="glyphicon glyphicon-remove-sign hi-half-transp" />
                  </span>)
                  : (<span key={dataset} className="btn toggleTag toggleTag--inactive" onClick={() => this.onDatasetClick(dataset)}>
                    {dataset.replace(/^[^_]+_+/, "")}{" "}
                  </span>)
              ).concat((
                <button key="__all_datasets__" className="btn btn-default btn-sm" onClick={() => this.onShowAllDatasetsClick()}>
                  Show all datasets
                </button>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-md-3">

              <SearchFields fields={solrSearch.query.searchFields.filter((sf) => sf.field !== "dataset_s")}
                            query={solrSearch.query}
                            truncateFacetListsAt={20}
                            onSetCollapse={onSetCollapse}
                            onFacetSortChange={onFacetSortChange}
                            results={solrSearch.results}
                            onSearchFieldChange={onSearchFieldChange} />
            </div>

            <div className=".hidden-sm col-md-1" />

            <div className="col-sm-8 col-md-8">
              <GroupMenu onChange={onSortFieldChange} sortFields={solrSearch.query.sortFields} />
              <div className="basic-margin">
                <strong>Found {solrSearch.results.numFound} {solrSearch.results.numFound === 1
                  ? "result"
                  : "results"
                }
                </strong>
              </div>
              <div className="result-list big-margin">
                <ResultList solrSearch={solrSearch} />
              </div>
            </div>
          </div>
        </div>
        <span type="footer-body">
          <span className="col-sm-2 col-md-2">
            <button className="btn btn-default" onClick={onNewSearch}>
              New Search
            </button>
          </span>
          <div className="col-sm-10 col-md-10 text-right">
            <CurrentQuery onChange={onSearchFieldChange} searchFields={solrSearch.query.searchFields} />
          </div>
        </span>
        <span type="footer-body">
          <Pagination onChange={onPageChange}
                      numFound={solrSearch.results.numFound}
                      start={solrSearch.query.start || 0}
                      rows={solrSearch.query.rows || 50} />
        </span>
      </Page>
    )
  }
}

export default FacetedSearch