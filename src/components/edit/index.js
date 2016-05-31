import React from "react";

import Form from "./form";
import Header from "./header";
import Messages from "./messages";
import EntityList from "./entity-list";

class App extends React.Component {

	render() {
		console.log(this.props.vre, this.props.entity);

		let businessPart = this.props.vre.vreId && this.props.entity.domain ? (
			<div className="container-fluid">
				<Form {...this.props} />
				<EntityList {...this.props} />
			</div>) : null;

		return (
			<div>
				<header>
					<Header {...this.props} />
				</header>
				<main>
					<Messages {...this.props} types={["ERROR_MESSAGE", "SUCCESS_MESSAGE"]} />
					{businessPart}
				</main>
			</div>
		);
	}
}

App.propTypes = {
	entity: React.PropTypes.object,
	messages: React.PropTypes.object,
	onLoginChange: React.PropTypes.func,
	onNew: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onSelectVre: React.PropTypes.func,
	vre: React.PropTypes.object
};

export default App;