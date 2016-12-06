import React from "react";
import SelectField from "./fields/select-field";
import Message from "./message";
import { urls } from "../router";
import { Link } from "react-router";
import CollectionTable from "./collection-table";

class ConnectToArchetype extends React.Component {


  componentWillReceiveProps(nextProps) {
    const { onFetchBulkUploadedMetadata } = this.props;
    // Triggers fetch data from server based on vreId from route.
    if (this.props.params.vreId !== nextProps.params.vreId) {
      onFetchBulkUploadedMetadata(nextProps.params.vreId);
    }
  }

  componentDidMount() {
    const { onFetchBulkUploadedMetadata, collections, vre, vreId } = this.props;
    if (!collections || vre !== vreId) {
      onFetchBulkUploadedMetadata(vreId);
    }
  }


  render() {
    const {
      vreId, // from params
      vre, // from server response
      archetype,
      collections,
      mappings,
    } = this.props;

    // actions
    const { onCloseMessage, onMapCollectionArchetype, onSelectCollection, onLoadMoreClick } = this.props;
    // messages
    const { showFileIsUploadedMessage, uploadedFileName } = this.props;
    // table view properties
    const { rows, headers, nextUrl, activeCollection } = this.props;

    if (!collections || vre !== vreId) { return null; }

    const collectionsAreMapped = Object.keys(mappings.collections).length > 0 &&
      Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName).filter(val => val !== null).length > 0;

    const fileIsUploadedMessage = showFileIsUploadedMessage && uploadedFileName ? (
      <Message alertLevel="info" dismissible={true} onCloseMessage={() => onCloseMessage("showFileIsUploadedMessage")}>
        <em>{uploadedFileName}</em> is uploaded.
      </Message>
    ) : null;


    return (
      <div>
        <div className="container basic-margin">
          <h2 className="small-margin">Upload and connect your dataset</h2>
          {fileIsUploadedMessage}
          <p>We found {collections.length} collections in the file. Connect the tabs to the Timbuctoo Archetypes.</p>
        </div>

        <div className="container basic-margin">
          {collections.map((sheet) => (
            <div className="row" key={sheet.name}>
              <div className="col-md-2">
                <a className="from-excel" style={{cursor: "pointer"}}
                   onClick={() => sheet.name === activeCollection ? false : onSelectCollection(sheet.name)}>
                  <img src="images/icon-excel.svg" alt=""/> {sheet.name} {sheet.name === activeCollection ? "*" : ""}
                </a>
              </div>
              <div className="col-md-8">
                <SelectField
                  onChange={(value) => onMapCollectionArchetype(sheet.name, value)}
                  onClear={() => onMapCollectionArchetype(sheet.name, null) }
                  value={mappings.collections[sheet.name].archetypeName}>
                    <span type="placeholder">
                      Connect <em>{sheet.name}</em> to a Timbuctoo archetype.
                    </span>
                  {Object.keys(archetype).filter((domain) => domain !== "relations").sort().map((option) => (
                    <span key={option} value={option}>{option}
                      <br /><span style={{color: "#666", fontSize: "0.6em"}}>
                        Properties: {archetype[option]
                          .filter((prop) => prop.type !== "relation")
                          .map((prop) => `${prop.name} (${prop.type})`).join(", ")}
                      </span>
                    </span>
                  ))}
                </SelectField>
              </div>
              { mappings.collections[sheet.name].archetypeName ? (
                <div className="col-sm-1 hi-success" key={sheet.name}>
                  <span className="glyphicon glyphicon-ok pull-right"/>
                </div>
              ) : null
              }
            </div>
          ))}

        </div>
        <div className="container basic-margin">
          { collectionsAreMapped ?
            <Link to={urls.mapData(vre, mappings.collections)} className="btn btn-success">
              Connect
            </Link>
            :
            <button disabled={true} className="btn btn-success">
              Connect
            </button>
          }
        </div>
        <div className="container big-margin">
          <p className="from-excel">
            <img src="images/icon-excel.svg" alt=""/>{" "}
            <em>{activeCollection}</em> {uploadedFileName ? `from ${uploadedFileName}` : ""}
          </p>

          <CollectionTable
            rows={rows}
            headers={headers}
            nextUrl={nextUrl}
            onLoadMoreClick={(url) => onLoadMoreClick(url, activeCollection)} />
        </div>
      </div>
    )
  }
}

export default ConnectToArchetype;