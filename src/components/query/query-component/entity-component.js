import React from "react";
import deepEqual from "deep-equal";

import icons from "./icons";
import RelationComponent from "./relation-component";
import PropertyComponent from "./property-component";
import DeleteButton from "./delete-button";

const baseHeight = 50;
const basePropertyComponentHeight = 28;


class EntityComponent extends React.Component {

	renderPropFilter(propertyFilter, i, topPosition) {
		return {
			filterComponent: (
				<PropertyComponent
					baseHeight={basePropertyComponentHeight}
					key={i}
					name={propertyFilter.name}
					topPosition={topPosition}
					value={propertyFilter.value}
				/>
			),
			height: basePropertyComponentHeight
		};
	}

	renderRelation(relation, i, topPosition, props, subComponents) {

		return {
			filterComponent: (
				<RelationComponent
					{...props}
					baseHeight={baseHeight}
					key={i}
					relation={relation}
					subComponent={subComponents[i].component}
					topPosition={topPosition}
				/>
			),
			height: subComponents[i].height
		};
	}

	renderFilters(filters, renderFunc, topPosition = 0, ...args) {
		let filterComponentHeight = topPosition;

		const filterComponents = filters.map((filter, i) => {
			const {filterComponent, height} = renderFunc(filter, i, filterComponentHeight, ...args);
			filterComponentHeight += height;
			return filterComponent;
		});

		return [filterComponents, filterComponentHeight];
	}

	renderQueryEntity(props, path = ["entity"]) {
		// The current entity within the query tree
		const queryEntity = props.query && props.query.entity ? props.query.entity : {domain: props.domain};
		// The current entity data
		const queryEntityData = props.query && props.query.entity ? props.query.entity.data : {};
		// The current query's selection path
		const pathToQuerySelection = props.query ? props.query.pathToQuerySelection : [];

		// Query filters on properties of this entity
		const propertyFilters = (queryEntityData["@properties"] || []);
		// Query filters on related entities
		const relationFilters = (queryEntityData["@relations"] || []);

		// Test whether this entity is selected using the current query's seletion path
		const selected = deepEqual(path, pathToQuerySelection);

		// Renders all the child entity trees connected to this entity via its @relations
		const childEntityComponents = relationFilters
			.map((relation, i) => {
				const subProps = {...props, query: {...relation, pathToQuerySelection: pathToQuerySelection }};
				const { component, height } = this.renderQueryEntity(subProps, path.concat(["data", "@relations", i, "entity"]));
				return { component: component, height: height };
			});

		// Loads all the filters into direct child components, keeping track of their respective total height
		let [propertyComponents, propertyComponentHeight] = this.renderFilters(propertyFilters, this.renderPropFilter.bind(this));
		let [relationComponents, childComponentHeight] = this.renderFilters(relationFilters, this.renderRelation.bind(this), propertyComponentHeight, props, childEntityComponents);

		// If the current entity is selected show a delete button
		const deleteButton = selected ? (<DeleteButton onSelect={() => props.onDeleteQuery(props.componentIndex) } />) : null;


		// Render the entity into component
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

		// Return the total height of this entity component and the component itself
		return {
			height: baseHeight + childComponentHeight,
			component: component
		};
	}

	render() {
		const { component } = this.renderQueryEntity(this.props);
		return component;
	}
}


EntityComponent.propTypes = {
	onSetQueryPath: React.PropTypes.func
};

export default EntityComponent;