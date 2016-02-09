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