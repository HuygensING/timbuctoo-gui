let persistDisabled = false;

const persist = (state) => {
	if ( persistDisabled ) { return; }
	for (let key in state) {
		localStorage.setItem(key, JSON.stringify(state[key]));
	}
};

const getItem = (key) => {
	if (localStorage.getItem(key)) {
		return JSON.parse(localStorage.getItem(key));
	}
	return null;
};

const disablePersist = () => {
	localStorage.clear();
	persistDisabled = true;
};
window.disablePersist = disablePersist;

export { persist, getItem, disablePersist };
