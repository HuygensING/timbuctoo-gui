import React from "react";
import SelectList from "hire-forms-select-list";


class MultiSelect extends React.Component {

	onChange(values) {
		const currentProps = this.props.entity.data;

		const current = currentProps
			.filter((d) => d.type === "property" && d.name === this.props.name )
			.map((p) => p.value);

		const toAdd = values
			.filter((v) => current.indexOf(v) < 0);

		if(toAdd.length) {
			this.props.onChange([], currentProps.concat(
				toAdd.map((v) => { return { type: "property", name: this.props.name, value: v }; })
			));
		} else {
			this.props.onChange([], currentProps.filter((p) => {
				return this.props.name !== p.name || (this.props.name === p.name && values.indexOf(p.value) > -1);
			}));

		}

	}

	render() {

		return (
			<div>
				<label>{this.props.name}</label>
				<SelectList
					onChange={this.onChange.bind(this)}
					options={this.props.options}
					values={this.props.entity.data.filter((d) => d.type === "property" && d.name === this.props.name).map((p) => p.value)}
				/>
			</div>
		);
	}
}

MultiSelect.propTypes = {
	entity: React.PropTypes.object,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array
};

export default MultiSelect;