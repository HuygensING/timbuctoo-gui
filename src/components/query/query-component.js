import React from "react";
import { draggable } from "infinity-grid";
import icons from "./icons";

/* TODO:
	foreach entity at topPosition (from :bottomPosition)
		- render props
		- render relations
		- return :renderedComponent, :bottomPosition

	foreach related entity
		- handle delete: remove subtree
		- handle select:
			- set field path to active entity
			- set class for active entity
*/

class QueryComponent extends React.Component {

	render() {
		console.log(this.props.query);
		const queryEntityData = this.props.query && this.props.query.entity ? this.props.query.entity.data : {};
		return this.props.selected ? (

			<g className="selected query">

				<g transform="translate(-20 -20)" {...this.props}>
					{icons[this.props.domain]({className: "handle"})}
				</g>
				<g onClick={() => this.props.onDeleteQuery(this.props.componentIndex) } transform="translate(-20 -20)" >
					<circle r="8" />
					<line stroke="white" strokeWidth="1" x1="-3" x2="3" y1="-3" y2="3" />
					<line stroke="white" strokeWidth="1" x1="-3" x2="3" y1="3" y2="-3" />
				</g>

				<g transform="translate(-20 40)">
					{Object.keys(queryEntityData).filter((key) => key !== "@relations" && queryEntityData[key].length).map((key, i) => (
						<g key={key} transform={`translate(0, ${i * 25})`}>
							<line stroke="black" x1="0" x2="0" y1="-30" y2="-5" />
							<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
							<g transform="translate(12 0)">
								<text>{`${key}: ${queryEntityData[key]}`}</text>
							</g>
						</g>
					))}
					{(queryEntityData["@relations"] || []).map((relation, i) => (
						<g key={i} transform={`translate(0, ${Object.keys(queryEntityData).filter((key) => key !== "@relations" && queryEntityData[key].length).length * 25 + (i * 25)})`}>
							<line stroke="black" x1="0" x2="0" y1="-30" y2="-5" />
							<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
							<g transform="translate(12 0)">
								<text>{relation.name}</text>
							</g>
						</g>
					))}
				</g>
			</g>

		) : (
			<g className="query" transform="translate(-20 -20)" {...this.props}>
				{icons[this.props.domain]({className: "handle"})}
			</g>
		);
	}
}

QueryComponent.propTypes = {
	componentIndex: React.PropTypes.number,
	domain: React.PropTypes.string,
	onDeleteQuery: React.PropTypes.func,
	query: React.PropTypes.object,
	selected: React.PropTypes.bool
};

export default draggable(
	(props) => (<svg height="40" width="40">{icons[props.domain]()}</svg>),
	QueryComponent
);