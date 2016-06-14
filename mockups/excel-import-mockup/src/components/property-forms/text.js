import React from "react";

import SelectField from "../fields/select-field";


class TextPropertyForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};
	}


	render() {
		const { name, collectionData, onAddFieldMapping, mappings } = this.props;
		const { isOpen } = this.state;

		console.log(mappings);
		return isOpen ? (
			<ul className="list-group">
				<li className="list-group-item dropup" onClick={() => this.setState({isOpen: false})}>
					<span className="caret"></span>
					&nbsp;
					{name}
				</li>

				<SelectField label={`Select column for ${name}`} onChange={(value) => onAddFieldMapping(collectionData.collection, name, value)}
					options={collectionData.variables} value={""} />
			</ul>
		) : (
			<ul className="list-group">
				<li className="list-group-item" onClick={() => this.setState({isOpen: true})}>
					<span className="caret"></span>
					&nbsp;
					{name}
				</li>
			</ul>
		);
	}
}

TextPropertyForm.propTypes = {
	collectionData: React.PropTypes.object,
	mappings: React.PropTypes.object,
	name: React.PropTypes.string,
	onAddFieldMapping: React.PropTypes.func
};

export default TextPropertyForm;