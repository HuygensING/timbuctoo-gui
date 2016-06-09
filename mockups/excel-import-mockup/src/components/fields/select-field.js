import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

class SelectField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
		this.documentClickListener = this.handleDocumentClick.bind(this);
	}

	componentDidMount() {
		document.addEventListener("click", this.documentClickListener, false);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.documentClickListener, false);
	}

	toggleSelect(ev) {
		if(this.state.isOpen) {
			this.setState({isOpen: false});
		} else {
			this.setState({isOpen: true});
		}
	}

	handleDocumentClick(ev) {
		const { isOpen } = this.state;
		if (isOpen && !ReactDOM.findDOMNode(this).querySelector(".dropdown").contains(ev.target)) {
			this.setState({
				isOpen: false
			});
		}
	}

	render() {
		const { label, options, onChange, value } = this.props;

		return (
			<li className="list-group-item">
				<label>{label}</label>
				<span className={cx("dropdown", {open: this.state.isOpen})}>
					<button className="btn btn-default btn-sx dropdown-toggle" onClick={this.toggleSelect.bind(this)}>
						{value} <span className="caret"></span>
					</button>

					<ul className="dropdown-menu">
						{options.map((option, i) => (
							<li key={i}>
								<a onClick={() => { onChange(option); this.toggleSelect(); }}>{option}</a>
							</li>
						))}
					</ul>
				</span>
			</li>
		);
	}

}

SelectField.propTypes = {
	label: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array,
	value: React.PropTypes.string
};

export default SelectField;