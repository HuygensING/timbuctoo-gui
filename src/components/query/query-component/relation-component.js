import React from "react";

class RelationComponent extends React.Component {
	render() {
		const {
			baseHeight,
			propertyFilterHeight,
			relationComponentHeight,
			relation,
			subComponent
		} = this.props;

		return (
			<g transform={`translate(0, ${propertyFilterHeight + relationComponentHeight + 10})`}>
				<line stroke="black" x1="0" x2="0" y1={-baseHeight - relationComponentHeight} y2="-5" />
				<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
				<g transform={`translate(${45 - (relation.name.length * 2)} 0)`}>
					<text>{relation.name}</text>
				</g>

				<line stroke="black" strokeWidth="1" x1="150" x2="180" y1="-5" y2="-5" />
				<g transform="translate(200 0)">
					{subComponent}
				</g>
				<rect {...this.props}
					className="relation handle"
					height="30"
					onClick={() => console.log("TODO: make relation selectable")}
					rx="5" ry="5" width="140" x="10" y="-20" />
			</g>
		);
	}
}

RelationComponent.propTypes = {
	baseHeight: React.PropTypes.number,
	propertyFilterHeight: React.PropTypes.number,
	relation: React.PropTypes.object,
	relationComponentHeight: React.PropTypes.number,
	subComponent: React.PropTypes.func
};

export default RelationComponent;