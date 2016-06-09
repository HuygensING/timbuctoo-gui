import React from "react";


class BoolField extends React.Component {


	render() {
		const { id, label, labelFalse, labelTrue, onChange, value } = this.props;

		return (
			<li className="list-group-item">
				<label>{label}</label>
				<input checked={value} id={`${id}-yes`} name={`${id}-bool`} onChange={() => onChange(true)} type="radio" />
				<label htmlFor={`${id}-yes`}>{labelTrue}</label>
				<input checked={!value} id={`${id}-no`} name={`${id}-bool`} onChange={() => onChange(false)} type="radio" />
				<label htmlFor={`${id}-no`}>{labelFalse}</label>
			</li>
		);
	}

}

BoolField.propTypes = {
	id: React.PropTypes.string,
	label: React.PropTypes.string,
	labelFalse: React.PropTypes.string,
	labelTrue: React.PropTypes.string,
	onChange: React.PropTypes.func,
	value: React.PropTypes.bool
};

export default BoolField;