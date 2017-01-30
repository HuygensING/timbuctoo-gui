import React from "react";

class ResourceSyncForm extends React.Component {

  render() {
    const {
      resourceSync: { discovery, setDetails, pending },
      onRsDiscoveryChange,
      onRsDiscoverySubmit,
      onRsDatasetSelect,
      finalVreName,
      vreId,
      uploadButtonStatus
    } = this.props;

    const vreName = vreId ? null : finalVreName;

    const disabled = finalVreName === null && !vreId;

    return uploadButtonStatus ? (
      <div>
        Importing dataset: {uploadButtonStatus}
      </div>
    ) : (
      <div>
        <p>
          Import dataset via resource sync discovery
        </p>
        <div className="input-group small-margin">
          <input type="text" placeholder="Enter discovery url"
                 onKeyPress={(ev) => ev.key === 'Enter' ? onRsDiscoverySubmit() : false}
                 onChange={(ev) => onRsDiscoveryChange(ev.target.value)} className="form-control" value={discovery} />
          <span className="input-group-btn">
            <button className="btn btn-default" onClick={onRsDiscoverySubmit}>
              <span className="glyphicon glyphicon-search" />
            </button>
          </span>
        </div>
        <div>
          {pending ? <i>Discovering...</i> : null}
          { !pending && setDetails.length === 0 ?  <i>No datasets discovered.</i> : null }
          { setDetails.length > 0 ? <h5>Please select a dataset to import</h5>: null}
          <ul style={{listStyle: "none", padding: "0"}}>
            {setDetails.map((detail, i) => (
              <li key={i} style={{marginBottom: "4px"}}>
                <button className="btn btn-default"
                        disabled={disabled}
                        onClick={() => onRsDatasetSelect(detail.name, vreId || vreName) }>
                  Import {disabled ? "(please enter a dataset name first)" : null}
                </button>{" "}
                {detail.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ResourceSyncForm;
