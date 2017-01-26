import React from "react";
import cx from "classnames";

import { Link } from "react-router";
import { urls } from "../router";

import CsvForm from "./upload-form/csv";
import ExcelForm from "./upload-form/excel";

const formatForms = {
  csv: (props) =>  <CsvForm {...props} />,
  excel: (props) => <ExcelForm {...props} />
};

class UploadForm extends React.Component {

  render() {
    const { vreId, uploadError, format } = this.props;

    const activeTab = format ? format : "excel";

    const tabUrls = vreId ? {
      excel: urls.editDataset(vreId),
      csv: urls.editDatasetWithFormat(vreId, "csv")
    } : {
      excel: urls.newDataset(),
      csv: urls.newDatasetWithFormat("csv")
    };

    return (
      <div className="container basic-margin">
        <h4>Import dataset</h4>

        <ul className="nav nav-tabs" role="tablist">
          <li className={cx({active: activeTab === "excel"})}>
            <Link to={tabUrls.excel} style={{cursor: activeTab === "excel" ? "default" : "pointer"}}>
              Excel upload
            </Link>
          </li>
          <li className={cx({active: activeTab === "csv"})}>
            <Link to={tabUrls.csv} style={{cursor: activeTab === "csv" ? "default" : "pointer"}}>
              CSV upload
            </Link>
          </li>
        </ul>
        <div style={{border: "1px solid #ddd", borderTop: "none", padding: "1em"}}>
          {uploadError}
          {formatForms[activeTab](this.props)}
        </div>
      </div>
    );
  }
}

export default UploadForm;