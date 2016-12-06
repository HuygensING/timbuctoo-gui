import React from "react";


class DeleteVreConfirmationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      confirmValue: ""
    };
  }

  onConfirmInputChange(ev) {
    this.setState({confirmValue: ev.target.value});
  }

  onKeyPress(ev) {
    const { vreId, onComfirmDeleteVre } = this.props;
    const { confirmValue } = this.state;


    if (ev.key === "Enter" && vreId === confirmValue) {
      onComfirmDeleteVre(vreId, confirmValue);
    }
  }

  render() {
    const { vreId, onComfirmDeleteVre } = this.props;
    const { confirmValue } = this.state;


    const deleteButton = confirmValue === vreId ?
      <button className="btn btn-default" onClick={() => onComfirmDeleteVre(vreId, confirmValue)}>Delete</button> : null;

    return (
      <div>

            <div className="modal-body">
              <p>Are you sure you wish to delete the <strong>{vreId.replace(/^[^_]+_+/, "")}</strong> dataset?</p>
              <p>To confirm, please retype the fully qualified dataset ID in the input below.</p>
              <p style={{width: "100%", backgroundColor: "#ddd", overflowX: "auto", whiteSpace: "nowrap"}}>{vreId}</p>
              <p>
                <input type="text" value={confirmValue} onChange={this.onConfirmInputChange.bind(this)}
                       onKeyPress={this.onKeyPress.bind(this)}
                       placeholder="Enter dataset ID here" />
              </p>
              {deleteButton}
            </div>
        </div>
    );
  }
}
export default DeleteVreConfirmationForm;