import React from "react";

import cx from "classnames";
import { Login } from "hire-login";

import LoginDropdown from "./login-dropdown";
import config from "../../../config";


class LoginMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loginDropdownOpen: false
		};

		this.documentClickListener = this.handleDocumentClick.bind(this);
	}

	componentDidMount() {
		document.addEventListener("click", this.documentClickListener, false);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.documentClickListener, false);
	}

	onToggleLogin() {
		if (this.state.loginDropdownOpen) {
			this.setState({loginDropdownOpen: false});
		} else {
			this.setState({loginDropdownOpen: true});
		}
	}

	handleDocumentClick(ev) {
		if (this.state.loginDropdownOpen && !document.querySelector(".login-dropdown-list-item").contains(ev.target)) {
			this.setState({
				loginDropdownOpen: false
			});
		}
	}

	render() {
		const { user } = this.props;

		return (
			<div>

				<div className="navbar-form navbar-right" style={{display: user && user.token ? "inline-block" : "none"}}>
					<div className="form-group">
						<Login
							appId={this.props.vre.vreId}
							headers={{VRE_ID: "WomenWriters"}}
							onChange={this.props.onLoginChange}
							userUrl={`${config.apiUrl["v2.1"]}/system/users/me`} />
					</div>
				</div>

				<ul className="nav navbar-nav navbar-right" style={{display: user && user.token ? "none" : "inline-block"}}>
					<li className={cx("login-dropdown-list-item", "dropdown", {open: this.state.loginDropdownOpen})}>
						<a className="dropdown-toggle" onClick={this.onToggleLogin.bind(this)} role="button">
							Login <span className="caret"></span>
						</a>
						<LoginDropdown {...this.props} />
					</li>
				</ul>
			</div>
		);
	}
}

LoginMenu.propTypes = {
	onLoginChange: React.PropTypes.func,
	user: React.PropTypes.object,
	vre: React.PropTypes.object
};

export default LoginMenu;