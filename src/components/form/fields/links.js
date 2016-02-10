import React from "react";
import MultiForm from "hire-forms-multi-form";
import LinkForm from "./multiform/link.js";

class Links extends React.Component {

	onChange(inPath, data) {
		let path = typeof inPath === "string" ? [inPath] : inPath;
		this.props.onChange(path, data);
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
					component = {LinkForm}
					model={{label: "", url: ""}}
					onChange={this.onChange.bind(this)}
					onDelete={this.onDelete.bind(this)}
					values={this.props.entity.data[this.props.name]} />
			</div>
		);
	}
}

Links.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default Links;