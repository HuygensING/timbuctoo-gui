import React from "react";
import ReactDOM from "react-dom";


class TextBox extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			textLeft: 0,
			croppedText: null,
			hovering: false
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
		let croppedText = null;

		if(!this.state.croppedText && textBBox.width > rectBBox.width) {
			const { text } = this.props;
			croppedText = text.substr(0, Math.floor(rectBBox.width / textBBox.width * text.length) - 1);
			return this.setState({ croppedText: croppedText });
		}

		const textLeft = rectBBox.x + ((rectBBox.width - textBBox.width) / 2);
		if(this.state.textLeft !== textLeft) {
			return this.setState({ textLeft: textLeft });
		}
	}


	render() {
		const { text } = this.props;

		const rect = this.props.onSelect ?
			<rect {...this.props} onClick={this.props.onSelect} title={text} /> :
			<rect {...this.props} title={text} />;
		return (
			<g>
				<text className={`${this.state.croppedText ? "cropped-text" : ""} ${this.props.className}`}
					fontSize="10"
					transform={`translate(${this.state.textLeft} -2)`}>
					{this.state.croppedText || text}
				</text>
				{rect}
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