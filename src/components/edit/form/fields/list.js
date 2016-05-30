import React from "react";
import ListInput from "./multiform/list-input";
import MultiForm from "hire-forms-multi-form";

class List extends React.Component {
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
					component={ListInput}
					model={{}}
					onChange={this.onChange.bind(this)}
					onDelete={this.onDelete.bind(this)}
					values={this.props.entity.data[this.props.name]} />
			</div>
		);
	}
}

List.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func
};

export default List;