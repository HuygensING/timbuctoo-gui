import React from "react";
import ReactDOM from "react-dom";


class TextBox extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			textLeft: 0
		};
	}

	componentDidMount() {
		this.centerTextNode();
	}

	componentDidUpdate() {
		this.centerTextNode();
	}


	centerTextNode() {
		const textBBox = ReactDOM.findDOMNode(this).querySelector("text").getBBox();
		const rectBBox = ReactDOM.findDOMNode(this).querySelector("rect").getBBox();
		const textLeft = rectBBox.x + ((rectBBox.width - textBBox.width) / 2);
		if(this.state.textLeft !== textLeft) {
			this.setState({ textLeft: textLeft });
		}
	}


	render() {
		const { text, onSelect } = this.props;
		return (
			<g>
				<text className={this.props.className} transform={`translate(${this.state.textLeft} 0)`}>{text}</text>
				<rect {...this.props} onClick={onSelect} />
			</g>
		);
	}
}

TextBox.propTypes = {
	className: React.PropTypes.string,
	onSelect: React.PropTypes.func,
	text: React.PropTypes.string
};

 export default TextBox;