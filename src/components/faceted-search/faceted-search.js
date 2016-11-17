import React from "react";
import SelectField from "../fields/select-field";
import SearchFields from "./search-fields";
import Page from "../page.js";
import CurrentQuery from "./current-query";
import Pagination from "./results/pagination";
import SortMenu from "./sort-menu";
import {Link} from "react-router";
import searchClient from "../../solr-client";


const activeDatasetsFromFacets = (facets) => (facets || []).reduce((accum, curr, idx) => {
    if (idx % 2 === 0) {
      accum.push({name: curr});
    } else {
      accum[accum.length - 1] = {
        ...accum[accum.length - 1],
        count: curr
      }
    }
    return accum;
  }, []).filter((facet) => facet.count > 0).map((facet) => facet.name);


class FacetedSearch extends React.Component {

  onShowAllDatasetsClick() {
    searchClient.getHandlers().onSearchFieldChange("dataset_s", []);

  }

  onDatasetClick(value) {
    const { solrSearch: { results : { facets }} } = this.props;
    const datasetFilter = activeDatasetsFromFacets(facets.dataset_s).filter((dataset) => dataset !== value);

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


    const datasetsFromFacets = activeDatasetsFromFacets(solrSearch.results.facets.dataset_s);

    return (
      <Page>
        <div className="container big-margin">
          <div className="row basic-margin hi-underline facet">
            <div className="col-sm-4 col-md-3">
              <h2>Dataset</h2>
            </div>
            <div className="col-sm-8 col-md-9 text-right">
              {datasetsFromFacets.map((dataset) => (
                <span key={dataset} style={{marginRight: "4px"}} className="btn btn-primary btn-sm" onClick={() => this.onDatasetClick(dataset)}>
                  {dataset}
                  <span className="glyphicon glyphicon-remove-sign hi-half-transp" />
                </span>
              )).concat((
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
              <SortMenu onChange={onSortFieldChange} sortFields={solrSearch.query.sortFields} />
              <div className="basic-margin">
                <strong>Found {solrSearch.results.numFound} {solrSearch.results.numFound === 1
                  ? "result"
                  : "results"
                }
                </strong>
              </div>
              <div className="result-list big-margin">
                <ol start={solrSearch.query.start + 1} style={{counterReset: `step-counter ${solrSearch.query.start}`}}>
                  {solrSearch.results.docs.map((doc, i) => (
                    <li key={i + solrSearch.query.start}>
                        <Link to={`?foo=bar`}>
                          {doc.displayName_s && doc.displayName_s.length ? doc.displayName_s : "<No display name found>"}
                        </Link>
                    </li>
                  ))}
                </ol>
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