import { createIndexes } from "./actions/solr";

export default function actionsMaker(navigateTo, dispatch) {
	const actions = {
		onCreateIndexes: () => {
			dispatch(createIndexes())
		}
	};
	return actions;
};