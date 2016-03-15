import React from "react";
import Select from "hire-forms-select";
import Input from "hire-forms-input";
import clone from "../../../../util/clone-deep";

const operations = ["eq", "neq", "lt", "gt", "between", "outside"];
const inputAmounts = {
	eq: 1,
	neq: 1,
	lt: 1,
	gt: 1,
	between: 2,
	outside: 2
};

class DatableField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			operation: null,
			values: ["", ""]
		};
	}

	onSelectOperation(value) {
		this.setState({operation: value});
	}

	onCancel() {
		this.setState({operation: null, values: ["", ""]});
	}

	onChange(idx, value) {
		let values = clone(this.state.values);
		values[idx] = value;
		this.setState({values: values});
	}

	onCommit() {
		this.props.onChange(this.state);
		this.onCancel();
	}

	render() {
		const operationSelect = this.state.operation ?
			null : (<Select onChange={this.onSelectOperation.bind(this)}
			options={operations}
			placeholder="- select operation -" />);

		let inputs = null;
		if(this.state.operation !== null) {
			inputs = [];
			for(let i = 0; i < inputAmounts[this.state.operation]; i++) {
				inputs.push(<Input
					key={i}
					onChange={(value) => this.onChange(i, value)}
					placeholder="year"
					value={this.state.values[i]} />
				);
			}
		}

		const buttons = this.state.operation ? (
			<div>
				<button onClick={this.onCommit.bind(this)} >Ok</button>
				<button onClick={this.onCancel.bind(this)}>Cancel</button>
			</div>
		) : null;


		return (
			<div>
				<label>{this.props.name} {this.state.operation}</label>
				{operationSelect}
				{inputs}
				{buttons}
			</div>
		);
	}
}

DatableField.propTypes = {
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default DatableField;