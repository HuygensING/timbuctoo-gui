import React from "react";
import cx from "classnames";

import { Link } from "react-router";
import { urls } from "../router";

import CsvForm from "./upload-form/csv";
import ExcelForm from "./upload-form/excel";
import DataperfectForm from "./upload-form/dataperfect";
import ResourceSyncForm from "./upload-form/resource-sync";
import AccessForm from "./upload-form/access";

const formatForms = {
  csv: (props) =>  <CsvForm {...props} />,
  xlsx: (props) => <ExcelForm {...props} />,
  dataperfect: (props) => <DataperfectForm {...props} />,
  rs: (props) => <ResourceSyncForm {...props} />,
  mdb: (props) => <AccessForm {...props} />
};

class UploadForm extends React.Component {

  render() {
    const { vreId, uploadError, format } = this.props;

    const activeTab = format ? format : "xlsx";

    const tabUrls = vreId ? {
      xlsx: urls.editDataset(vreId),
      csv: urls.editDatasetWithFormat(vreId, "csv"),
      dataperfect: urls.editDatasetWithFormat(vreId, "dataperfect"),
      rs: urls.editDatasetWithFormat(vreId, "rs"),
      mdb: urls.editDatasetWithFormat(vreId, "mdb"),
    } : {
      xlsx: urls.newDataset(),
      csv: urls.newDatasetWithFormat("csv"),
      dataperfect: urls.newDatasetWithFormat("dataperfect"),
      rs: urls.newDatasetWithFormat("rs"),
      mdb: urls.newDataset(),
    };

    return (
      <div className="container basic-margin">
        <h4>Import dataset</h4>

        <ul className="nav nav-tabs" role="tablist">
          <li className={cx({active: activeTab === "xlsx"})}>
            <Link to={tabUrls.xlsx} style={{cursor: activeTab === "xlsx" ? "default" : "pointer"}}>
              Excel upload
            </Link>
          </li>
          <li className={cx({active: activeTab === "csv"})}>
            <Link to={tabUrls.csv} style={{cursor: activeTab === "csv" ? "default" : "pointer"}}>
              CSV upload
            </Link>
          </li>
          <li className={cx({active: activeTab === "dataperfect"})}>
            <Link to={tabUrls.dataperfect} style={{cursor: activeTab === "dataperfect" ? "default" : "pointer"}}>
              Dataperfect upload
            </Link>
          </li>
          <li className={cx({active: activeTab === "mdb"})}>
          <Link to={tabUrls.mdb} style={{cursor: activeTab === "mdb" ? "default" : "pointer"}}>
            Access upload
          </Link>
          </li>
          <li className={cx({active: activeTab === "rs"})}>
          <Link to={tabUrls.rs} style={{cursor: activeTab === "rs" ? "default" : "pointer"}}>
            Remote repository
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