import React from "react";
import Page from "../page.jsx";

import Paginate from "./entity-index/paginate";
import QuickSearch from "./entity-index/quicksearch";
import EntityList from "./entity-index/list";

import SaveFooter from "./entity-form/save-footer";
import EntityForm from "./entity-form/form";

import CollectionTabs from "./collection-tabs";
import Messages from "./messages/list";


class EditGui extends React.Component {

	componentWillReceiveProps(nextProps) {
		const { onSelect, onNew, onSelectDomain } = this.props;

		// Triggers fetch data from server based on id from route.
		if (this.props.params.id !== nextProps.params.id) {
			onSelect({domain: nextProps.params.collection, id: nextProps.params.id});
		}
	}

	componentDidMount() {

		if (this.props.params.id) {
			this.props.onSelect({domain: this.props.params.collection, id: this.props.params.id});
		} else if (!this.props.params.collection && !this.props.location.pathname.match(/new$/) && this.props.entity.domain) {
			this.props.onRedirectToFirst(this.props.entity.domain)
		} else if (this.props.location.pathname.match(/new$/)) {
			this.props.onNew(this.props.entity.domain);
		}
	}

	render() {
		const { onSelect, onNew, onSave, onDelete, onSelectDomain, onDismissMessage, onChange, onAddSelectedFields, onRedirectToFirst } = this.props;
		const { onQuickSearchQueryChange, onQuickSearch, onPaginateLeft, onPaginateRight } = this.props;
		const { getAutocompleteValues } = this.props;
		const { quickSearch, entity, vre, messages } = this.props;
		const currentMode = entity.domain && entity.data._id ? "edit" : "new";

		if (entity.domain === null || !vre.collections[entity.domain]) { return null; }
		return (
			<Page>
				<CollectionTabs collections={vre.collections} onNew={onNew} onSelectDomain={onSelectDomain} onRedirectToFirst={onRedirectToFirst}
					activeDomain={entity.domain} />
				<div className="container">
					<Messages
						types={["SUCCESS_MESSAGE", "ERROR_MESSAGE"]}
						messages={messages}
						onDismissMessage={onDismissMessage} />
					<div className="row">
						<div className="col-sm-6 col-md-4">
							<QuickSearch
								onQuickSearchQueryChange={onQuickSearchQueryChange}
								onQuickSearch={onQuickSearch}
								query={quickSearch.query} />
							<EntityList
								start={quickSearch.start}
								list={quickSearch.list}
								onSelect={onSelect}
								domain={entity.domain}
								selectedId={entity.data._id}
								entityPending={entity.pending}
							/>
						</div>
						{entity.pending ? (
							<div className="basic-margin">Loading, please wait...</div>
						) : entity.domain ? (
							<EntityForm currentMode={currentMode} getAutocompleteValues={getAutocompleteValues}
								onAddSelectedFields={onAddSelectedFields}
								entity={entity} onNew={onNew} onDelete={onDelete} onChange={onChange}
								properties={vre.collections[entity.domain].properties} 
								entityLabel={vre.collections[entity.domain].collectionLabel.replace(/s$/, "") } />
						) : null }
					</div>
				</div>

				<div type="footer-body" className="row">
					<div className="col-sm-6 col-md-4" style={{textAlign: "left", padding: '0'}}>
						<Paginate
							start={quickSearch.start}
							listLength={quickSearch.list.length}
							rows={50}
							onPaginateLeft={onPaginateLeft}
							onPaginateRight={onPaginateRight} />
					</div>
					<div className="col-sm-6 col-md-8" style={{textAlign: "left", padding: '0'}}>
						{!entity.pending ?
							<SaveFooter onSave={onSave} onCancel={() => currentMode === "edit" ?
								onSelect({domain: entity.domain, id: entity.data._id}) : onNew(entity.domain)}/> : null
						}
					</div>
				</div>
			</Page>
		)
	}
}

export default EditGui;
