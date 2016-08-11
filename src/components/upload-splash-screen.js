import React from "react";
import UploadButton from "./upload-button";
import classnames from "classnames";

class UploadSplashScreen extends React.Component {

	render() {
		const { onUploadFileSelect, userdata: {userId}, onLogin, importData: {isUploading}} = this.props;

		let uploadButton;
		if (userId) {
			uploadButton = (
				<div>
					<div className="login-sub-component lead">
						<UploadButton
							classNames={["btn", "btn-lg", "btn-default", "underMargin"]}
							glyphicon="glyphicon glyphicon-cloud-upload"
							isUploading={isUploading}
							label="Browse"
							onUploadFileSelect={onUploadFileSelect} />
						<small>
						Don't have a dataset handy? Here’s an <a href="/static/example.xlsx"><em>example excel sheet</em></a>
						</small>
					</div>
				</div>
			);
		} else {
			uploadButton = (
				<div>
					<form className="login-sub-component" action="https://secure.huygens.knaw.nl/saml2/login" method="POST">
					 	<input name="hsurl"  type="hidden" value={window.location.href} />
					 	<button type="submit" className="btn btn-lg btn-default underMargin">
					 		<span className="glyphicon glyphicon-log-in"></span> Log in to upload
					 	</button>
					</form>
					<small>Most university accounts will work. You can also log in using google, twitter or facebook.</small>
				</div>
			);
		}

		return (
			<div className="site-wrapper-inner  fullsize_background">
				<div className="cover-container white">
					<div className="inner cover">
						<h1 className="cover-heading underMargin">
							<img alt="timbuctoo" className="logo" src="images/logo_timbuctoo.svg"/><br />
							TIMBUCTOO
						</h1>
						<p className="lead underMargin">
							Connect your data to the world&hellip;
						</p>
						{uploadButton}
					</div>
				</div>
				<div style={{position:"absolute", bottom: 0, textAlign: "right", width: "100%", paddingRight: "1em", paddingBottom: "1em"}} className="white">
				<p className="lead" style={{margin: 0}}>
					&hellip;or <a href="#">browse</a> the world's data
				</p>
				</div>
			</div>
		);
	}
}

UploadSplashScreen.propTypes = {
	onUpload: React.PropTypes.func,
	userdata: React.PropTypes.shape({
		userId: React.PropTypes.string
  }),
	importData: React.PropTypes.shape({
		isUploading: React.PropTypes.boolean
	})
};

export default UploadSplashScreen;
