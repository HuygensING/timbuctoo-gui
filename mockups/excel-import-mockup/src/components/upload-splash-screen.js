import React from "react";
import classnames from 'classnames';
class UploadSplashScreen extends React.Component {

	render() {
		const { onUploadFileSelect, userdata: {userId}, onLogin, importData: {isUploading}} = this.props;

		let uploadButton;
		if (userId) {
			uploadButton = (
				<div>
					<div className="login-sub-component lead">
						<label className={classnames("btn", "btn-lg", "btn-default", "underMargin", {disabled: isUploading})}>
							<span className="glyphicon glyphicon-cloud-upload"></span>
							{isUploading ? "Uploading..." : "Browse"}
							<input
								disabled={isUploading}
								type="file"
								style={{display: "none"}}
								onChange={e => onUploadFileSelect(e.target.files)}/>
						</label>
					</div>
					<p className="lead">
						Don't have a dataset handy? Here’s an <a href="/static/example.xlsx"><em>example excel sheet</em></a>
					</p>
				</div>
			);
		} else {
			uploadButton = (
				<div>
					<p className="lead">
						<form className="login-sub-component" action="https://secure.huygens.knaw.nl/saml2/login" method="POST">
						 	<input name="hsurl"  type="hidden" value={window.location.href} />
						 	<button type="submit" className="btn btn-lg btn-default underMargin">
						 		<span className="glyphicon glyphicon-log-in"></span> Log in
						 	</button>
						</form>
					</p>
					<p className="lead">
						Most university accounts will work. You can also log in using google, twitter or facebook.
					</p>
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
							Get your data stored and connected to the world.<br />
							Start uploading your data.
						</p>
						{uploadButton}
					</div>
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
