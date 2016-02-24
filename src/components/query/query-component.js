import React from "react";
import { draggable } from "infinity-grid";
import icons from "./icons";

class QueryComponent extends React.Component {

	render() {
		const queryEntity = this.props.query && this.props.query.entity ? this.props.query.entity.data : {};
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
					<line stroke="black" x1="0" x2="0" y1="-20" y2={(Object.keys(queryEntity).length-1) * 25 - 5} />
					{Object.keys(queryEntity).map((key, i) => (
						<g key={key} transform={`translate(0, ${i * 25})`}>
							<line stroke="black" strokeWidth="1" x1="0" x2="10" y1="-5" y2="-5" />
							<g transform="translate(12 0)">
								<text>{`${key}: ${queryEntity[key]}`}</text>
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