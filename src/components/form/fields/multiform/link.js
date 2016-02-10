import React from "react";
import form from "hire-forms-form";
import Input from "hire-forms-input";

let notEmpty = function(value) {
	return value != null && value !== "";
};

/*
 * URLs are hard to validate, see: http://stackoverflow.com/a/1411800/997941
 * That's why we check simply for:
 * * whitespace
 * * two consecutive dots (..)
 * * double quotes (")
 * * at least one dot (.)
 * * not starting or ending with a dot
 *
 * @param {String} value
 * @returns {Object} A validator object with `isValid` and `message` properties.
 */
let validateURL = function(value) {
	let re = /\s+|\.\.|"/;
	let oneDot = value.indexOf(".") > 0;
	let noEndDot = value.charAt(value.length - 1) !== ".";
	let isValid = !re.test(value) && oneDot && noEndDot;

	return {
		isValid: notEmpty(value) && isValid,
		message: isValid ? "" : "Please enter a valid email address."
	};
};

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