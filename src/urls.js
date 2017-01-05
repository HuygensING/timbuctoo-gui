const urls = {
	root() {
		return "/";
	},
	newEntity(collection) {
		return collection
			? `/${collection}/new`
			: "/:collection/new";
	},
	firstEntity(collection) {
		return collection
			? `/${collection}/first`
			: "/:collection/first";
	},
	entity(collection, id) {
		return collection && id
			? `/${collection}/${id}`
			: "/:collection/:id";
	}
};

export { urls }