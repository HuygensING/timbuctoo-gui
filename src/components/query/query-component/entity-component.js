import React from "react";
import deepEqual from "deep-equal";

import icons from "./icons";
import RelationComponent from "./relation-component";
import PropertyComponent from "./property-component";
import DeleteButton from "./delete-button";

const baseHeight = 60;
const basePropertyComponentHeight = 28;


class EntityComponent extends React.Component {

	// Renders a property filter
	renderPropFilter(propertyFilter, i, topPosition, path) {
		return {
			filterComponent: (
				<PropertyComponent
					baseHeight={basePropertyComponentHeight}
					key={i}
					name={propertyFilter.name}
					path={path}
					topPosition={topPosition}
					value={propertyFilter.value}
				/>
			),
			height: basePropertyComponentHeight
		};
	}

	// Renders a relation filter and its sub entity components
	renderRelation(relation, i, topPosition, path, props, subComponents) {
		return {
			filterComponent: (
				<RelationComponent
					{...props}
					baseHeight={baseHeight}
					key={i}
					path={path}
					relation={relation}
					subComponent={subComponents[i].component}
					topPosition={topPosition}
				/>
			),
			height: subComponents[i].height
		};
	}

	// Loads filters into direct child components, keeping track of their respective total height
	renderFilters(filters, renderFunc, getPath, componentHeights = [], ...args) {
		const filterComponents = filters.map((filter, i) => {
			const {filterComponent, height} = renderFunc(filter, i, componentHeights.reduce((a, b) => a + b, 0), getPath(i), ...args);
			componentHeights.push(height);
			return filterComponent;
		});

		return [filterComponents, componentHeights];
	}

	// Recursively renders the current query and returns its height
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
				// ... NOTE: recursion occurs here ...
				const { component, height } = this.renderQueryEntity(subProps, path.concat(["data", "@relations", i, "entity"]));
				return { component: component, height: height };
			});

		// Loads all the property filters into direct child components, keeping track of their respective total height
		let [propertyComponents, propertyComponentHeights] = this.renderFilters(propertyFilters, this.renderPropFilter.bind(this),
				(i) => path.concat(["data", "@properties", i]));

		// Loads all the relation filters into direct child components, keeping track of their respective total height
		let [relationComponents, relationComponentHeights] = this.renderFilters(relationFilters, this.renderRelation.bind(this),
				(i) => path.concat(["data", "@relations", i]),
				[], props, childEntityComponents);

		// If the current entity is selected show a delete button
		const deleteButton = selected ? (<DeleteButton onSelect={() => props.onDeleteQuery(props.componentIndex) } />) : null;

		// Some fuzzy stuff to calculate the length of the vertical tree line ... for property filters
		const propertyLineHeight = propertyFilters.length ?
			propertyComponentHeights.reduce((a, b) => a + b, 0) - (basePropertyComponentHeight / 2) : 0;

		// ... for relation filters
		const relationLineHeight = relationFilters.length ?
			relationComponentHeights.reduce((a, b) => a + b, 0) -
				relationComponentHeights[relationComponentHeights.length - 1] + (propertyFilters.length ? 40 : 25)
			: 0;

		// Render the entity into component
		const component = (
			<g>
				<g {...props}
					className={`${selected ? "selected " : ""}query`}
					onClick={() => this.props.onSetQueryPath(path)}
					transform="translate(-20 -20)">
					{icons[queryEntity.domain]({className: "handle"})}
				</g>
				{deleteButton}

				<g transform="translate(-20 20)">
					<line stroke="black" x1="0" x2="0" y1="0" y2={propertyLineHeight + relationLineHeight} />
				</g>

				<g transform="translate(-20 40)">
					{propertyComponents}
					<g transform={`translate(0 ${propertyComponentHeights.reduce((a, b) => a + b, 0)})`}>
						{relationComponents}
					</g>
				</g>
			</g>
		);

		// Return the total height of this entity component and the component itself
		return {
			height: baseHeight + relationComponentHeights.reduce((a, b) => a + b, 0) + propertyComponentHeights.reduce((a, b) => a + b, 0),
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