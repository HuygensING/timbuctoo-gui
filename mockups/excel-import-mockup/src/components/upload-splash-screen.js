import React from "react";

class UploadSplashScreen extends React.Component {


	render() {
		const { onUpload } = this.props;

		return (<div>
			<button className="btn btn-lg btn-success" onClick={onUpload}>
				<span className="glyphicon glyphicon-cloud-upload pull-left"></span>
				&nbsp; Upload
			</button>
		</div>);
	}
}

UploadSplashScreen.propTypes = {
	onUpload: React.PropTypes.func
};

export default UploadSplashScreen;