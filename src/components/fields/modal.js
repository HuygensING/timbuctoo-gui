import React from "react";
import ReactDOM from "react-dom";


class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.documentClickListener = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.documentClickListener, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.documentClickListener, false);
  }

  handleDocumentClick(ev) {
    if (!ReactDOM.findDOMNode(this).firstChild.contains(ev.target)) {
      this.props.onClose();
    }
  }

  render() {
    const { onClose, header } = this.props;

    const headerBody = header
      ? <h5 className="modal-title">{header}</h5>
      : null;

    return (
      <div className="modal" style={{display: "block", backgroundColor: "rgba(0,0,0,0.4)"}}>
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button className="close" onClick={onClose}>&times;</button>
              {headerBody}
            </div>
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}
export default Modal;