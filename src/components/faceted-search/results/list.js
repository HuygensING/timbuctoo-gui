import React from "react";
import { Link } from "react-router";
import { urls } from "../../../router";

const downCaseAndCapitalize = (str) => str.toLowerCase().replace(/^./, (match) => match.toUpperCase());

const archetypeSubtitle = {
  archive: (doc) => `${(doc.has_archive_keyword_ss || []).concat(doc.has_archive_place_ss || []).join(", ")}`,
  archiver: (doc) => `${(doc.has_archiver_keyword_ss || []).concat(doc.has_archiver_place_ss || []).join(", ")}`,
  collective: (doc) => `${downCaseAndCapitalize(doc.type_s || "")} ${(doc.hasLocation_ss || []).join(", ")}`,
  concept: (doc) => ``,
  document: (doc) => `${downCaseAndCapitalize(doc.documentType_s || "Document")}, ${(doc.hasPublishLocation_ss || []).join(", ")} (${doc.date_s || "?"})`,
  keyword: (doc) => ``,
  language: (doc) => ``,
  legislation: (doc) => `${(doc.has_legislation_keyword_ss || []).concat(doc.has_legislation_place_ss || []).join(", ")}`,
  location: (doc) => ``,
  person: (doc) => `${doc.birthDate_s || "?"} - ${doc.deathDate_s || "?"}`,
};

const injectDatasets = (docs) => docs.reduce((accum, cur) => {
  return accum.length === 0 || accum[accum.length - 1].dataset_s !== cur.dataset_s
    ? accum.concat({isDatasetHeader: true, dataset_s: cur.dataset_s}).concat(cur)
    : accum.concat({isDatasetHeader: false, ...cur});
}, []);

class ResultList extends React.Component {

  render() {
    const { solrSearch: { results, query: { start, sortFields } } } = this.props;

    const renderDocs = sortFields.length && sortFields.find((sf) => sf.field === "dataset_s").value ?
      injectDatasets(results.docs) : results.docs;

    return (
      <ol start={start + 1} style={{counterReset: `step-counter ${start}`}}>
        {renderDocs.map((doc, index) => doc.isDatasetHeader ? (
            <div key={index + start} className="result-list-dataset-info clearfix">
              <span className="row pull-right ">
                <span className="col-md-12 small text-right no-lr-padding">
                  <a href="#">Go to {doc.dataset_s.replace(/^[^_]+_+/, "")} dataset</a>
                </span>
              </span>
            </div>
          ) : (
            <li key={index + start} className="clearfix">
              <Link to={urls.entity(doc.dataset_s, doc.id)}>
                <span className="row pull-right clearfix">
                  <span className="col-md-8 no-lr-padding" style={{display: "inline-block", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                    {doc.displayName_s && doc.displayName_s.length ? doc.displayName_s : "<No display name found>"}
                  </span>
                  <span className="col-md-4 hi-light-grey text-right small" style={{display: "inline-block", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                    {doc.dataset_s.replace(/^[^_]+_+/, "")}
                  </span>
                </span>
                <span className="row pull-right clearfix">
                  <span className="col-md-8 hi-light-grey small no-lr-padding">
                    {archetypeSubtitle[doc.archetype_name_s](doc)}
                  </span>
                  <span className="col-md-4 hi-light-grey text-right small" style={{display: "inline-block", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                    {doc.archetype_name_s}
                  </span>
                </span>
              </Link>
            </li>
          )
        )}
      </ol>
    );
  }
}

export default ResultList;