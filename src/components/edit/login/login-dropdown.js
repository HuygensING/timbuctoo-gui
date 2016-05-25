import React from "react";

import { Basic } from "hire-login";
import config from "../../../config";

class LoginDropdown extends React.Component {

	render() {
		return (
			<ul className="dropdown-menu">
				<li>
					<Basic url={`${config.apiUrl["v2.1"]}/authenticate`} />
				</li>
			</ul>
		);
	}
}

export default LoginDropdown;