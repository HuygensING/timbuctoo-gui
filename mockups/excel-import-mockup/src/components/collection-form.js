import React from "react";
import BoolField from "./fields/bool-field";
import SelectField from "./fields/select-field";

class CollectionForm extends React.Component {


	render() {
		const { importData, onUpdateCollection } = this.props;
		const { activeCollection, sheets } = importData;

		if (!activeCollection) { return null; }

		const collectionData = sheets.find((sheet) => sheet.collection === activeCollection);

		const baseCollectionSelect = collectionData.extendsCollection ?
			<SelectField label="This collection extends" onChange={(value) => onUpdateCollection(activeCollection, "extendedCollection", value)}
				options={["documents", "persons", "keywords", "collectives"]} value={collectionData.extendedCollection} />
			: null;

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Collection settings: {activeCollection}
				</div>

				<ul className="list-group">
					<BoolField id="extends-collection" label="Extend collection"
						labelFalse="This creates an entirely new collection" labelTrue="This extends an existing timbuctoo collection"
						onChange={(value) => onUpdateCollection(activeCollection, "extendsCollection", value)} value={collectionData.extendsCollection} />
					{baseCollectionSelect}
				</ul>
			</div>
		);
	}
}

CollectionForm.propTypes = {
	importData: React.PropTypes.object,
	onUpdateCollection: React.PropTypes.func
};

export default CollectionForm;

/*
	label: React.PropTypes.string,
	onChange: React.PropTypes.func,
	options: React.PropTypes.array,
	value: React.PropTypes.string
*/