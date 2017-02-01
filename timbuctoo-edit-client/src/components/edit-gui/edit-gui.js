import React from "react";
import Page from "../page.jsx";

import Paginate from "./entity-index/paginate";
import QuickSearch from "./entity-index/quicksearch";
import EntityList from "./entity-index/list";

import SaveFooter from "./entity-form/save-footer";
import EntityForm from "./entity-form/form";

import CollectionTabs from "./collection-tabs";
import Messages from "./messages/list";
import Message from "../message";

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
		const loginMessage = this.props.user ? null : (
			<Message dismissible={false} alertLevel="warning">
				<form action="https://secure.huygens.knaw.nl/saml2/login" method="POST" style={{display: "inline-block", float: "right"}}>
					<input name="hsurl" value={`${location.href}`} type="hidden" />
					<button className="btn btn-warning btn-sm" type="submit">
						<span className="glyphicon glyphicon-log-in" /> Log in
					</button>
				</form>
				<span className="glyphicon glyphicon-exclamation-sign" />{" "}
				You are not logged in, your session has expired, or you are not allowed to edit this dataset
			</Message>
		);

		return (
			<Page username={this.props.user && this.props.user.userData && this.props.user.userData.displayName ? this.props.user.userData.displayName : ""}>
				<div className="container" style={{textAlign: "right"}}>
					This edit interface is machine-generated based on the data-model. <a href="https://github.com/huygensing/timbuctoo/issues/new" target="_blank">Suggestions</a> for improvement are very welcome!
				</div>
				<CollectionTabs collections={vre.collections} onNew={onNew} onSelectDomain={onSelectDomain} onRedirectToFirst={onRedirectToFirst}
					activeDomain={entity.domain} />
				<div className="container">
					{loginMessage}
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
								entity={entity} onNew={onNew} onDelete={onDelete} onChange={onChange} user={this.props.user}
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
								onSelect({domain: entity.domain, id: entity.data._id}) : onNew(entity.domain)} user={this.props.user}/> : null
						}
					</div>
				</div>
			</Page>
		)
	}
}

export default EditGui;
