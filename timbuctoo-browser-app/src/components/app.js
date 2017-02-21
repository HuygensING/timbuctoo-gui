import React from "react";
import PropValueList from './PropertyValueList';
import PropValue from './PropValue';
import ProvTabs from './Tabs';
import ConnectData from './connectData';
import UrlForm from './initialForm';


class App extends React.Component {
	// componentDidUpdate () {
	// 	window.scrollTo(0, 0)
	// }
	render() {
		
		return (
			
				
				this.props.uploadDatajs ? 
					<div>
						<div className="basic-margin hi-Green container-fluid">
							<nav className="navbar ">
							<div className="container">
								<div className="navbar-header"> <a className="navbar-brand" href={`${process.env.TIMBUCTOO_GUI_URL}`}><img src="images/logo-timbuctoo.svg" className="logo" alt=""/></a> </div>
								<div id="navbar" className="navbar-collapse collapse">
								<ul className="nav navbar-nav navbar-right">
									<li><a href="#"><span className="glyphicon glyphicon-user"></span> </a></li>
								</ul>
								</div>
							</div>
							</nav>
						</div>
						<div className="small-margin container basic-margin">
							<h2 className="small-margin">Upload and connect your new dataset</h2>
							<ConnectData jsonldUpload={this.props.uploadDatajs} propertyList={this.props.propertyList} />
							<div className=" small-margin container text-right">
								<button className="btn btn-default"> Upload </button>
							</div>
						</div>
					</div>
					:
				this.props.data ?
					<div>
						<div className="basic-margin hi-Green container-fluid">
							<nav className="navbar ">
							<div className="container">
								<div className="navbar-header"> <a className="navbar-brand" href={`${process.env.TIMBUCTOO_GUI_URL}`}><img src="images/logo-timbuctoo.svg" className="logo" alt=""/></a> </div>
								<div id="navbar" className="navbar-collapse collapse">
								<ul className="nav navbar-nav navbar-right">
									<li><a href="#"><span className="glyphicon glyphicon-user"></span> </a></li>
								</ul>
								</div>
							</div>
							</nav>
						</div>
						<div className="small-margin container form-group">
							<div className="form-group text-right">
								<button type="submit" onClick={this.props.uploadData} className="btn btn-default"> Continue </button>
							</div>
							<ProvTabs propValues={this.props.data} onValueClick={this.props.onValueClick} expandClick={this.props.expandClick} extraLinkClick={this.props.onLinkClick} errorText={this.props.errorText} isFetching={this.props.isFetching} closeErrorDiv={this.props.closeErrorDiv} />
						</div>
					</div>
					:
					this.props.location.query.url ?
						<div className="small-margin container">
							<UrlForm value={this.props.location.query.url} onSampleClick={this.props.onSampleClick} skip={true} isFetching={this.props.isFetching} errorText={this.props.errorText} closeErrorDiv={this.props.closeErrorDiv}></UrlForm>
						</div>
						:
						<div>
							<div className="basic-margin hi-Green container-fluid">
								<nav className="navbar ">
								<div className="container">
									<div className="navbar-header"> <a className="navbar-brand" href={`${process.env.TIMBUCTOO_GUI_URL}`}><img src="images/logo-timbuctoo.svg" className="logo" alt=""/></a> </div>
									<div id="navbar" className="navbar-collapse collapse">
									<ul className="nav navbar-nav navbar-right">
										<li><a href="#"><span className="glyphicon glyphicon-user"></span> </a></li>
									</ul>
									</div>
								</div>
								</nav>
							</div>
							<div className="small-margin container">
								<UrlForm value={"http://viaf.org/viaf/32005141"} onSampleClick={this.props.onSampleClick} skip={false} isFetching={this.props.isFetching} errorText={this.props.errorText} closeErrorDiv={this.props.closeErrorDiv}></UrlForm>
							</div>
						</div>
			
		)
	}
}


// App.propTypes = {
// 	myTableRows: React.PropTypes.array,
// 	onSampleClick: React.PropTypes.func
// };onClick={this.props.uploadData} 

export default App;
