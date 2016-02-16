const setEither = (data, deref, key, val) => {
	(deref || data)[key] = val;
	return data;
};

const setIn = (path, value, data, deref = null) =>
	path.length > 1 ?
		setIn(path, value, data, deref ? deref[path.shift()] : data[path.shift()]) :
		setEither(data, deref, path[0], value);

export default setIn;