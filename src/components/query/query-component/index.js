import React from "react";
import deepEqual from "deep-equal";
import { draggable } from "infinity-grid";
import icons from "./icons";

import RelationComponent from "./relation-component";
import PropertyComponent from "./property-component";
import DeleteButton from "./delete-button";

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
	renderQueryEntity(props, path = ["entity"]) {
		const queryEntity = props.query && props.query.entity ? props.query.entity : {domain: props.domain};
		const queryEntityData = props.query && props.query.entity ? props.query.entity.data : {};
		const pathToQuerySelection = props.query ? props.query.pathToQuerySelection : [];

		const selected = deepEqual(path, pathToQuerySelection);

		const baseHeight = 50;
		const basePropertyComponentHeight = 28;

		const propertyFilters = (queryEntityData["@properties"] || []);

		const propertyFilterHeight = propertyFilters.length * basePropertyComponentHeight;

		const propertyComponents = propertyFilters.map((pf, i) =>
			<PropertyComponent basePropertyComponentHeight={basePropertyComponentHeight} index={i} key={i} name={pf.name} value={pf.value} />
		);

		const subComponents = (queryEntityData["@relations"] || [])
			.map((relation, i) => {
				const subProps = {...props, query: {...relation, pathToQuerySelection: pathToQuerySelection }};
				const { component, height } = this.renderQueryEntity(subProps, path.concat(["data", "@relations", i, "entity"]));
				return { component: component, height: height };
			});


		let relationComponentHeight = 0;
		const relationComponents = (queryEntityData["@relations"] || [])
			.map((relation, i) => {
				const relationComponent = (
					<RelationComponent
						{...props}
						baseHeight={baseHeight}
						key={i}
						propertyFilterHeight={propertyFilterHeight}
						relation={relation}
						relationComponentHeight={relationComponentHeight}
						subComponent={subComponents[i].component}
					/>
				);
				relationComponentHeight += subComponents[i].height;
				return relationComponent;
			});

		const deleteButton = selected ? (<DeleteButton onSelect={() => props.onDeleteQuery(props.componentIndex) } />) : null;

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