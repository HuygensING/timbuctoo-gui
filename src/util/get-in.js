import clone from "./clone-deep";

const _getIn = (path, data) =>
	path.length === 0 ? data : _getIn(path, data[path.shift()]);

const _getType = (path, type = null) => {
	if(path.length === 0) {
		return type;
	} else {
		const newType = path.shift();
		return _getType(path, typeof newType === "string" ? newType : type);
	}
};


const getIn = (path, data, opts = {typed: false}) => opts.typed ?
	{type: _getType(clone(path)), data: _getIn(clone(path), data) } :
	_getIn(clone(path), data);


export default getIn;