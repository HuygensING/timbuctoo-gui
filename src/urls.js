const urls = {
	root() {
		return "/";
	},
	newEntity(collection) {
		return collection
			? `/${collection}`
			: "/:collection";
	},
	entity(collection, id) {
		return collection && id
			? `/${collection}/${id}`
			: "/:collection/:id";
	}
};

export { urls }