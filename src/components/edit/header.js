import React from "react";
import Login from "./login";
import classnames from "classnames";


class Header extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			openMenuVreId: "none"
		};
  }

	componentDidMount() {
		document.addEventListener("click", this.documentClickListener, false);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.documentClickListener, false);
	}

	onDomainSelect(domain) {
		this.props.onNew(domain);
		this.props.onSelectDomain(domain);
	}

	render() {
		const { vre } = this.props;
		const domains = Object.keys(vre.collections || {});
		console.log(this.props);
		return (
			<nav className="navbar navbar-default">
        <ul className="nav navbar-nav navbar-left">
          {domains
            .filter(d => !(vre.collections[d].unknown || vre.collections[d].relationCollection))
            .map((domain) =>
            <li className={classnames({active: vre.domain === domain})} key={domain}><a onClick={() => this.onDomainSelect(domain)}>{vre.collections[domain].collectionLabel}</a></li>
          )}
        </ul>
			</nav>
		);
	}
}

Header.propTypes = {
	entity: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func,
	onSelectDomain: React.PropTypes.func,
	onSelectVre: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default Header;