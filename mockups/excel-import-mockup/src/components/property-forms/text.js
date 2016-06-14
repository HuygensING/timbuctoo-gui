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
		const { name, collectionData } = this.props;
		const { isOpen } = this.state;

		return isOpen ? (
			<ul className="list-group">
				<li className="list-group-item">
					<h4>
					<a onClick={() => this.setState({isOpen: false})}><span className="glyphicon glyphicon-triangle-top"></span></a>
					&nbsp;
					Describe property <strong>{name}</strong>
					</h4>
				</li>

				<SelectField label={`Select column for ${name}`} onChange={(value) => console.log(value)}
					options={Object.keys(collectionData.variables)} value={""} />
			</ul>
		) : (
			<ul className="list-group">
				<li className="list-group-item">
					<a onClick={() => this.setState({isOpen: true})}>
						{name} <span className="caret"></span>
					</a>
				</li>
			</ul>
		);
	}
}

TextPropertyForm.propTypes = {
	collectionData: React.PropTypes.object,
	name: React.PropTypes.string,
	onUpdateVariable: React.PropTypes.func
};

export default TextPropertyForm;