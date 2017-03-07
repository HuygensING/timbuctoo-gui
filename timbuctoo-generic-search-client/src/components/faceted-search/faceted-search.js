import React from "react";
import SelectField from "../fields/select-field";
import SearchFields from "./search-fields";
import Page from "../page.jsx";
import CurrentQuery from "./current-query";
import Pagination from "./results/pagination";
import SortMenu from "./sort-menu";
import { urls } from "../../router";
import { Link } from "react-router";

class FacetedSearch extends React.Component {
  // componentDidMount(){
  //   onCsvExport();
  // }  
  render() {
    const { collections, truncateFacetListsAt, vreId} = this.props;
    const { onCollectionSelect, onSearchFieldChange, onNewSearch, onCsvExport,
      onPageChange, onSortFieldChange, onSetCollapse, onFacetSortChange } = this.props;
    const activeCollection = collections.find((collection) => collection.selected);
    console.log(onCsvExport())
    return (
      <Page>
        <div className="container big-margin">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <div className="basic-margin">
                  <SelectField btnClass="btn-default" onChange={onCollectionSelect} noClear={true} value={activeCollection.name}>
                  {collections.map((collection) => (
                    <span key={collection.name} value={collection.name}>
                      {collection.label}
                    </span>
                  ))}
                </SelectField>
              </div>
              <SearchFields fields={activeCollection.query.searchFields}
                            query={activeCollection.query}
                            truncateFacetListsAt={truncateFacetListsAt}
                            onSetCollapse={onSetCollapse}
                            onFacetSortChange={onFacetSortChange}
                            results={activeCollection.results} 
                            onSearchFieldChange={onSearchFieldChange} />
            </div>

            <div className=".hidden-sm col-md-1" />

            <div className="col-sm-8 col-md-8">
              <SortMenu onChange={onSortFieldChange} sortFields={activeCollection.query.sortFields} />
              <button className="btn btn-default pull-right" style={{position: "relative", zIndex: "100"}} onClick={onCsvExport}>Download CSV</button>
              <div className="basic-margin">
                <strong>Found {activeCollection.results.numFound} {activeCollection.results.numFound === 1
                  ? activeCollection.label.replace(/s$/, "")
                  : activeCollection.label
                }
                </strong>
              </div>
              <div className="result-list big-margin">
                <ol start={activeCollection.query.start + 1} style={{counterReset: `step-counter ${activeCollection.query.start}`}}>
                  {activeCollection.results.docs.map((doc, i) => (
                    <li key={i + activeCollection.query.start}>
                        <Link to={urls.entity(activeCollection.name, doc.id, vreId)}>
                          {doc.displayName_s && doc.displayName_s.length ? doc.displayName_s : "<No display name found>"}
                          {doc.birthDate_i ? (<span className="hi-light-grey pull-right">{doc.birthDate_i} - {doc.deathDate_i}</span>) : null}
                          {doc.country_s ? (<span className="hi-light-grey pull-right">{doc.country_s}</span>) : null}
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
            <CurrentQuery onChange={onSearchFieldChange} searchFields={activeCollection.query.searchFields} />
          </div>
        </span>
        <span type="footer-body">
          <Pagination onChange={onPageChange}
                      numFound={activeCollection.results.numFound}
                      start={activeCollection.query.start || 0}
                      rows={activeCollection.query.rows} />
          <div style={{position: "fixed", bottom: "0", left: "0", zIndex: 10, width: "100%"}}>
            <div className="container">
              This search is machine-generated based on the data-model. <a href="https://github.com/huygensing/timbuctoo/issues/new" target="_blank">Suggestions</a> for improvement are very welcome!
            </div>
          </div>
        </span>
      </Page>
    )
  }
}

export default FacetedSearch