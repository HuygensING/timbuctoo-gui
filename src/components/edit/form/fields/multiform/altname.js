import React from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";

class AltName extends React.Component {
	render() {
		return (
			<ul>
				<li>
					<Input
						onChange={this.props.handleChange.bind(this, "nametype")}
						placeholder="Name type"
						value={this.props.formData.nametype} />
				</li>
				<li>
					<Input
						onChange={this.props.handleChange.bind(this, "displayName")}
						placeholder="Display name"
						value={this.props.formData.displayName} />
				</li>
			</ul>
		);
	}
}

AltName.propTypes = {
	formData: React.PropTypes.object,
	handleChange: React.PropTypes.func,
	onInvalid: React.PropTypes.func,
	value: React.PropTypes.object
};

export default form(AltName, "hire-forms-link-form");