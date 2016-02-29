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
			propertyComponent: (
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
			relationComponent: (
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


	renderQueryEntity(props, path = ["entity"]) {
		const queryEntity = props.query && props.query.entity ? props.query.entity : {domain: props.domain};
		const queryEntityData = props.query && props.query.entity ? props.query.entity.data : {};
		const pathToQuerySelection = props.query ? props.query.pathToQuerySelection : [];

		const selected = deepEqual(path, pathToQuerySelection);


		const propertyFilters = (queryEntityData["@properties"] || []);
		const relationFilters = (queryEntityData["@relations"] || []);
		const subComponents = relationFilters
			.map((relation, i) => {
				const subProps = {...props, query: {...relation, pathToQuerySelection: pathToQuerySelection }};
				const { component, height } = this.renderQueryEntity(subProps, path.concat(["data", "@relations", i, "entity"]));
				return { component: component, height: height };
			});

		let filterComponentHeight = 0;



		const propertyComponents = propertyFilters.map((filter, i) => {
			const {propertyComponent, height} = this.renderPropFilter(filter, i, filterComponentHeight);
			filterComponentHeight += height;
			return propertyComponent;
		});


		const relationComponents = relationFilters.map((filter, i) => {
			const {relationComponent, height} = this.renderRelation(filter, i, filterComponentHeight, props, subComponents);
			filterComponentHeight += height;
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
			height: baseHeight + filterComponentHeight,
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