import React from "react";
import deepEqual from "deep-equal";

import RelationComponent from "./relation-component";
import PropertyComponent from "./property-component";

import DeleteButton from "./util/delete-button";

const baseHeight = 60;
const baseWidth = 170;
const basePropertyComponentHeight = 36;
const baseRelationComponentWidth = 20;
const baseComponentWidthWithOnlyPropertyFilters = 80;

class EntityComponent extends React.Component {

	// Some fuzzy stuff to calculate the length of the vertical tree line ... for property filters
	getVerticalLineHeight(propertyFilters, relationFilters, propertyComponentHeights, relationComponentHeights) {
		const propertyLineHeight = propertyFilters.length ?
			propertyComponentHeights.reduce((a, b) => a + b, 0) - (basePropertyComponentHeight / 2) : 0;

		// ... for when there are no relation filters
		const finalPropertyLineHeight = (relationFilters.length === 0 &&
					propertyFilters.length > 0 &&
					propertyFilters[propertyFilters.length - 1].value.or.length > 1
			) ? propertyLineHeight - ((propertyFilters[propertyFilters.length - 1].value.or.length - 1) * basePropertyComponentHeight)
			: propertyLineHeight; // do not do stuff

		// ... for relation filters
		const relationLineHeight = relationFilters.length ?
			relationComponentHeights.reduce((a, b) => a + b, 0) -
				relationComponentHeights[relationComponentHeights.length - 1] + (propertyFilters.length ? 43 : 25)
			: 0;

		return finalPropertyLineHeight + relationLineHeight;
	}

	// Renders a property filter
	renderPropFilter(propertyFilter, i, topPosition, path, props) {
		return {
			filterComponent: (
				<PropertyComponent
					{...props}
					baseHeight={basePropertyComponentHeight}
					key={i}
					name={propertyFilter.name}
					orValues={propertyFilter.or}
					path={path}
					topPosition={topPosition}
				/>
			),
			height: basePropertyComponentHeight * propertyFilter.or.length
		};
	}

	// Renders a relation filter and its sub entity components
	renderRelation(relation, i, topPosition, path, props, subComponents) {
		return {
			filterComponent: (
				<RelationComponent
					{...props}
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
			const { index, value } = filter;
			const { filterComponent, height } = renderFunc(value, i, componentHeights.reduce((a, b) => a + b, 0), getPath(index), ...args);
			componentHeights.push(height);
			return filterComponent;
		});

		return [filterComponents, componentHeights];
	}

	// Recursively renders the current query and returns its height
	renderQueryEntity(props, path = ["or", 0]) {
		// The index of the current query entity
		const queryEntityIndex = path[path.length - 1];
		// The current entity within the query tree
		const queryEntity = props.query && props.query.or[queryEntityIndex] ?
			props.query.or[queryEntityIndex] : {domain: props.domain};

		// The current entity data
		const queryEntityData = props.query && props.query.or[queryEntityIndex] ?
			props.query.or[queryEntityIndex].and : [];

		// The current query's selection path
		const pathToQuerySelection = props.query ? props.query.pathToQuerySelection : [];

		// Query filters on properties of this entity
		const propertyFilters = queryEntityData
			.map((d, i) => { return {index: i, value: d}; })
			.filter((f) => f.value.type === "property");

		// Query filters on related entities
		const relationFilters = queryEntityData
			.map((d, i) => { return {index: i, value: d}; })
			.filter((f) => f.value.type === "relation");

		// Test whether this entity is selected using the current query's seletion path
		const selected = deepEqual(path, pathToQuerySelection);

		// Renders all the child entity trees connected to this entity via its @relations
		const childEntityComponents = relationFilters
			.map((relation) => {
				const {index, value} = relation;
				const subProps = {...props, query: {...value, pathToQuerySelection: pathToQuerySelection }};
				// ... NOTE: recursion occurs here ...
				return this.renderQueryEntities(subProps, path.concat(["and", index, "or"]), value.or);
			});

		// Loads all the property filters into direct child components, keeping track of their respective total height
		const [propertyComponents, propertyComponentHeights] = this.renderFilters(propertyFilters, this.renderPropFilter.bind(this),
				(index) => path.concat(["and", index]),
				[], props);

		// Loads all the relation filters into direct child components, keeping track of their respective total height
		const [relationComponents, relationComponentHeights] = this.renderFilters(relationFilters, this.renderRelation.bind(this),
				(index) => path.concat(["and", index]),
				[], props, childEntityComponents);

		// If the current entity is selected show a delete button
		const deleteButton = selected ?
			(props.query.or.length === 1 && path.length === 2) ? null :
			(<DeleteButton onSelect={() => props.onDeleteQueryFilter(props.componentIndex) } />) : null;

		// Render the entity into component
		const component = (
			<g>
				<g {...props}
					className={`${selected ? "selected " : ""}query`}
					onClick={() => this.props.onSetQueryPath(path)}
					transform="translate(-20 -20)">
					<text x="13" y="25">{queryEntity.domain}</text>
					<rect className="handle" fill="rgba(0,0,0,0)" height="40" width="150" x="0" y="0"/>
				</g>
				{deleteButton}

				<line stroke="black"transform="translate(-20 20)" x1="0" x2="0" y1="0"
					y2={this.getVerticalLineHeight(propertyFilters, relationFilters, propertyComponentHeights, relationComponentHeights)} />

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
			width: baseWidth +
				(childEntityComponents.length ? baseRelationComponentWidth : propertyFilters.length ? baseComponentWidthWithOnlyPropertyFilters : 0) +
				childEntityComponents.map((c) => c.width).reduce((a, b) => a > b ? a : b, 0),
			height: baseHeight + relationComponentHeights.reduce((a, b) => a + b, 0) + propertyComponentHeights.reduce((a, b) => a + b, 0),
			component: component
		};
	}

	// Render list of query entities
	renderQueryEntities(props, path, queries) {

		let heights = [];
		let widths = [];
		const components = queries.map((q, i) => {
			const { component, height, width } = this.renderQueryEntity(props, path.concat([i]));
			const output = (<g key={i} transform={`translate(0, ${heights.reduce((a, b) => a + b, 0)})`}>
				{component}
			</g>);
			heights.push(height);
			widths.push(width);
			return output;
		});

		const width = widths.reduce((a, b) => a > b ? a : b, 0);
		const height = heights.reduce((a, b) => a + b, 0);
		const selected = this.props.query && this.props.query.pathToQuerySelection && deepEqual(path, this.props.query.pathToQuerySelection);

		const rect = heights.length > 1 || path.length === 1 ?
			(<rect {...this.props} className={`or-box handle ${selected ? "selected" : ""}`}
				height={height} onClick={() => this.props.onSetQueryPath(path)}
				rx="10" ry="10" width={width} x="-30" y="-30" />)
			: null;

		const deleteButton = path.length === 1 ?
			<DeleteButton onSelect={() => props.onDeleteQuery(props.componentIndex)} translate="-35 -35" />
			: null;

		return {
			component: (<g>
				{rect}
				{components}
				{deleteButton}
			</g>),
			height: height,
			width: width
		};
	}

	render() {
		const queryEntities = this.props.query ? this.props.query.or : [];
		const { component } = this.renderQueryEntities(this.props, ["or"], queryEntities);
		return component;
	}
}


EntityComponent.propTypes = {
	onSetQueryPath: React.PropTypes.func,
	query: React.PropTypes.object
};

export default EntityComponent;