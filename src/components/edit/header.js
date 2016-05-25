import cx from "classnames";

import React from "react";
import Login from "./login";


const dropDownIsActive = (currentVre, vre) => currentVre === vre.vreId || null;


class Header extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			openMenuVreId: "none"
		};

		this.documentClickListener = this.handleDocumentClick.bind(this);
	}

	componentDidMount() {
		document.addEventListener("click", this.documentClickListener, false);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.documentClickListener, false);
	}

	handleDocumentClick(ev) {
		const { openMenuVreId } = this.state;
		if (this.state.openMenuVreId !== "none" && !document.querySelector(`.dropdown.${openMenuVreId}`).contains(ev.target)) {
			this.setState({
				openMenuVreId: "none"
			});
		}
	}

	onVreMenuClick(currentVre) {
		this.setState({openMenuVreId: currentVre});
		this.props.onSelectVre(currentVre);
	}

	onDomainSelect(domain) {
		this.setState({openMenuVreId: "none"});
		this.props.onNew(domain);
	}

	render() {
		const { vre } = this.props;
		const domains = Object.keys(vre.collections || {});
		const { openMenuVreId } = this.state;
		const addNewButton = this.props.vre.vreId && this.props.entity.domain ?
			<button onClick={() => this.props.onNew(this.props.entity.domain)}>Add new</button>
			: null;

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
						<Login {...this.props} />
						<ul className="nav navbar-nav navbar-left">
							{vre.list.map((currentVre) => (
								<li className={cx("dropdown", currentVre, {
									active: dropDownIsActive(currentVre, vre),
									open: currentVre === openMenuVreId
								})} key={currentVre}>

									<a className="dropdown-toggle" onClick={this.onVreMenuClick.bind(this, currentVre)}>
										{currentVre}
										<span className="caret"></span>
									</a>
									<ul className="dropdown-menu">
										{domains.map((domain, i) => (<li key={i}>
											<a onClick={() => this.onDomainSelect(domain)}>{domain}</a>
										</li>))}
									</ul>
								</li>
							))}
							<li>{addNewButton}</li>
						</ul>

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