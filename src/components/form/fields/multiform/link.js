import React from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";
import {validateURL} from "../../validations";

class LinkForm extends React.Component {
	render() {
		return (
			<ul>
				<li>
					<Input
						onChange={this.props.handleChange.bind(this, "label")}
						placeholder="Label"
						value={this.props.formData.label} />
				</li>
				<li>
					<Input
						onChange={this.props.handleChange.bind(this, "url")}
						onInvalid={this.props.onInvalid}
						placeholder="http://"
						validate={validateURL}
						value={this.props.formData.url} />
				</li>
			</ul>
		);
	}
}

LinkForm.propTypes = {
	formData: React.PropTypes.object,
	handleChange: React.PropTypes.func,
	onInvalid: React.PropTypes.func,
	value: React.PropTypes.object
};

export default form(LinkForm, "hire-forms-link-form");