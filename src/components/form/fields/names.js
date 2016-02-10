import React from "react";
import MultiForm from "hire-forms-multi-form";
import NameForm from "./multiform/name.js";

class Names extends React.Component {

	addName() {
		this.props.onChange([this.props.name], this.props.entity.data[this.props.name].concat([{components: [{type: "FORENAME", value: ""}]}]));
	}

	addNameComponent(key, value) {
		this.props.onChange(key, {type: value, value: ""});
	}

	removeNameComponent(key) {
		this.props.onChange(
			key.slice(0, 3),
			this.props.entity.data[this.props.name][key[1]].components.filter((v, i) => i !== key[3])
		);
	}

	setNameComponentValue(key, value) {
		this.props.onChange(key.slice(0, 4), {type: key[4], value: value});
	}


	onChange(key, value) {
		if(key === this.props.name) { return this.addName(); }
		if(key.length === 4) { return this.addNameComponent(key, value); }
		if(key[4] === "REMOVE") { return this.removeNameComponent(key); }
		return this.setNameComponentValue(key, value);
	}


	onDelete(path) {
		let values = this.props.entity.data[this.props.name];
		values.splice(path[1], 1);
		this.props.onChange([path[0]], values);
	}

	render() {
		return (
			<div>
				<label>{this.props.name}</label>
				<MultiForm
					attr={this.props.name}
					component={NameForm}
					model={{
						FORENAME: "",
						SURNAME: "",
						components: []
					}}
					onChange={this.onChange.bind(this)}
					onDelete={this.onDelete.bind(this)}
					options={this.props.options}
					values={this.props.entity.data[this.props.name]} />
			</div>
		);
	}
}

Names.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array
};

export default Names;