import cx from "classnames";

import React from "react";

import Select from "hire-forms-select";

import Login from "./login";


class Header extends React.Component {

	render() {
		const domains = Object.keys(this.props.vre.collections || {});
		const domainSelect = domains.length ? (
			<Select
				onChange={(domain) => this.props.onNew(domain)}
				options={domains}
				placeholder="- select a domain - "
				value={this.props.entity.domain || ""}
			/>
		) : null;

		const addNewButton = this.props.vre.vreId && this.props.entity.domain ?
			<button onClick={() => this.props.onNew(this.props.entity.domain)}>Add new</button>
			: null;

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav navbar-left">
							{this.props.vre.list.map((vreId) => (
								<li className={cx({active: vreId === this.props.vre.vreId || null})} key={vreId}>
									<a onClick={() => this.props.onSelectVre(vreId)}>{vreId}</a>
								</li>
							))}
							<li>{domainSelect}</li>
							<li>{addNewButton}</li>
						</ul>

						<Login {...this.props} />
					</div>
				</div>
			</nav>
		);
	}
}

Header.propTypes = {
	entity: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func,
	onSelectVre: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default Header;