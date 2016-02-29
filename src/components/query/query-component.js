import React from "react";
import deepEqual from "deep-equal";
import { draggable } from "infinity-grid";
import icons from "./icons";


class QueryComponent extends React.Component {

/*
	...original spec...
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
	renderQueryEntity(props, path = []) {
		const queryEntity = props.query && props.query.entity ? props.query.entity : {domain: props.domain};
		const queryEntityData = props.query && props.query.entity ? props.query.entity.data : {};
		const pathToQuerySelection = props.query ? props.query.pathToQuerySelection : [];

		const selected = deepEqual(path, pathToQuerySelection);

		const baseHeight = 50;
		const basePropertyComponentHeight = 28;

		const propertyFilters = (queryEntityData["@properties"] || []);


		const propertyFilterHeight = propertyFilters.length * basePropertyComponentHeight;

		const propertyComponents = propertyFilters.map((pf, i) => (
			<g key={i} transform={`translate(0, ${i * basePropertyComponentHeight})`}>
				<line stroke="black" x1="0" x2="0" y1={-basePropertyComponentHeight - 5} y2="-5" />
				<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
				<g transform="translate(12 0)">
					<text>{`${pf.name}: ${pf.value}`}</text>
				</g>
			</g>
		));

		const subComponents = (queryEntityData["@relations"] || [])
			.map((relation, i) => {
				const { component, height } = this.renderQueryEntity({
					...props,
					query: {
						...relation,
						pathToQuerySelection: pathToQuerySelection
					}
				}, path.concat(["entity", "data", "@relations", i]));

				return { component: component, height: height };
			});


		let relationComponentHeight = 0;
		const relationComponents = (queryEntityData["@relations"] || [])
			.map((relation, i) => {
				const component = (
					<g key={i} transform={`translate(0, ${propertyFilterHeight + relationComponentHeight + 10})`}>
						<line stroke="black" x1="0" x2="0" y1={-baseHeight - relationComponentHeight} y2="-5" />
						<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
						<g transform={`translate(${45 - (relation.name.length * 2)} 0)`}>
							<text>{relation.name}</text>
						</g>

						<line stroke="black" strokeWidth="1" x1="150" x2="180" y1="-5" y2="-5" />
						<g transform="translate(200 0)">
							{subComponents[i].component}
						</g>
						<rect {...props}
							className="relation handle" 
							height="30" 
							onClick={() => console.log("TODO: make relation selectable")}
							rx="5" ry="5" width="140" x="10" y="-20" />

					</g>
				);
				relationComponentHeight += subComponents[i].height;
				return component;
			});

		const deleteButton = selected ? (
			<g onClick={() => props.onDeleteQuery(props.componentIndex) } transform="translate(-20 -20)" >
				<circle r="8" />
				<line stroke="white" strokeWidth="1" x1="-3" x2="3" y1="-3" y2="3" />
				<line stroke="white" strokeWidth="1" x1="-3" x2="3" y1="3" y2="-3" />
			</g>) : null;

		const component = (
			<g>
				<g {...props}
					className={`${selected ? "selected " : ""}query`}
					onClick={() => this.props.onSetQueryPath(path)}
					transform="translate(-20 -20)"
				>
					{icons[queryEntity.domain]({className: "handle"})}
				</g>
				{deleteButton}
				<g transform="translate(-20 40)">
					{propertyComponents}
					{relationComponents}
				</g>
			</g>
		);

		return {
			height: baseHeight + propertyFilterHeight + relationComponentHeight,
			component: component
		};
	}

	render() {
		const { component } = this.renderQueryEntity(this.props);
		return this.props.selected ? (
			<g transform="scale(0.75)">
				{component}
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
	onSetQueryPath: React.PropTypes.func,
	query: React.PropTypes.object,
	selected: React.PropTypes.bool
};

export default draggable(
	(props) => (<svg height="40" width="40">{icons[props.domain]()}</svg>),
	QueryComponent
);