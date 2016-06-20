import React from "react";

class UploadSplashScreen extends React.Component {


	render() {
		const { onUpload } = this.props;


		return (
			<div className="site-wrapper-inner  fullsize_background">
				<div className="cover-container white">
					<div className="inner cover">
						<h1 className="cover-heading underMargin">
							<img alt="timbuctoo" className="logo" src="images/logo_timbuctoo.svg"/><br />
							TIMBUCTOO
						</h1>
						<p className="lead underMargin">
							Get your data stored and connected to the world.<br />
							Start uploading your data.
						</p>
						<p className="lead">
							<a className="btn btn-lg btn-default underMargin" onClick={onUpload}>
								<span className="glyphicon glyphicon-cloud-upload"></span> Upload
							</a>
						</p>
						<p className="lead">
							Need to get started? Here’s an example <a href="#"><em>spreadsheet.xlsx</em></a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

UploadSplashScreen.propTypes = {
	onUpload: React.PropTypes.func
};

export default UploadSplashScreen;