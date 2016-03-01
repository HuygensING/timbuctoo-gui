import clone from "clone-deep";

const _getIn = (path, data) =>
	path.length === 0 ? data : _getIn(path, data[path.shift()]);

const getIn = (path, data) =>
	_getIn(clone(path), data);


export default getIn;