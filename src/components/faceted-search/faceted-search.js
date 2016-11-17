import React from "react";
import SelectField from "../fields/select-field";
import SearchFields from "./search-fields";
import Page from "../page.js";
import CurrentQuery from "./current-query";
import Pagination from "./results/pagination";
import SortMenu from "./sort-menu";
import {Link} from "react-router";
import searchClient from "../../solr-client";


class FacetedSearch extends React.Component {
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
    return (
      <Page>
        <div className="container big-margin">
          <div className="row">
            <div className="col-sm-4 col-md-3">

              <SearchFields fields={solrSearch.query.searchFields}
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