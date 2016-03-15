import React from "react";
import Select from "hire-forms-select";


class DatableField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			operation: null
		};
	}

	onSelectOperation(value) {
		this.setState({operation: value});
	}

	render() {
		const operationSelect = this.state.operation ?
			null : (<Select onChange={this.onSelectOperation.bind(this)}
			options={["equals", "before", "after", "between", "outside"]}
			placeholder="- select operation -" />);

		const inputs = this.state.operation ?
			<span>inputs</span> : null;

		const button = this.state.operation ?
			<button>Ok</button> : null;


		return (
			<div>
				<label>{this.props.name} {this.state.operation}</label>
				{operationSelect}
				{inputs}
				{button}
			</div>
		);
	}
}

DatableField.propTypes = {
	name: React.PropTypes.string
};

export default DatableField;