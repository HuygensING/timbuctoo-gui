import React from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";
import Select from "hire-forms-select";

class NameForm extends React.Component {

	render() {
		let components = this.props.formData.components;
		let inputs = components.map((component, i) => (
				<li key={i}>
					<div>
						<button className="hire-remove-form" onClick={this.props.handleChange.bind(this, ["components", i, "REMOVE"])}>✕</button>
						{component.type}
					</div>
					<Input
						onChange={this.props.handleChange.bind(this, ["components", i, component.type])}
						placeholder={component.type}
						value={component.value} />
				</li>
			));

		if(components.length) {
			inputs.push((<li key={components.length}>
				<div>
					ADD COMPONENT
					<Select onChange={this.props.handleChange.bind(this, ["components", components.length])} options={this.props.options} />
				</div>
			</li>));
		}

		return (<ul>{inputs}</ul>);
	}
}

NameForm.propTypes = {
	formData: React.PropTypes.object,
	handleChange: React.PropTypes.func,
	options: React.PropTypes.array,
	value: React.PropTypes.object
};

export default form(NameForm, "names-form");