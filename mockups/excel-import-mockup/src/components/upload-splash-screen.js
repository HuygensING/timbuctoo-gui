import React from "react";

class UploadSplashScreen extends React.Component {


	render() {
		const { onUpload } = this.props;

		return (
			<div id="splash">
				<h1>TIMBUCTOO</h1>
				<p>Get your data stored and connected to the world.<br />
				Start uploading your data.</p>
				<button className="btn btn-lg btn-default" onClick={onUpload}>
					<span className="glyphicon glyphicon-cloud-upload pull-left"></span>
					&nbsp; Upload
				</button>

				<p>Need to get started? Here's an example <a>speadsheet.xlsx</a></p>
			</div>
		);
	}
}

UploadSplashScreen.propTypes = {
	onUpload: React.PropTypes.func
};

export default UploadSplashScreen;