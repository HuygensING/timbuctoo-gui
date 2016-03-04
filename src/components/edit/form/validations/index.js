export function validateDate(value) {
	// Handle validation.
	let re = /^(\d{2}-)?(\d{2}-)?\d{1,4}(~|\?)?$/;
	let isValid = re.test(value);

	// Return a validator object.
	return {
		isValid: isValid,
		message: isValid ? "" : "A date should be formatted as: DD-MM-YYYY. \nOptionally a '~' (approximate) or '?' (uncertain) can be added."
	};
}

export function validateURL(value) {
	let re = /\s+|\.\.|"/;
	let oneDot = value.indexOf(".") > 0;
	let noEndDot = value.charAt(value.length - 1) !== ".";
	let isValid = !re.test(value) && oneDot && noEndDot;

	return {
		isValid: value != null && value !== "" && isValid,
		message: isValid ? "" : "Please enter a valid URL."
	};
}