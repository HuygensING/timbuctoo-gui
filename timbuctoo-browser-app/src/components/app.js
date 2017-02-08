import React from "react";
import PropValueList from './PropertyValueList';
import PropValue from './PropValue';
import ProvTabs from './Tabs';
import ConnectData from './connectData';


class App extends React.Component {
	// componentDidUpdate () {
	// 	window.scrollTo(0, 0)
	// }
	

	
	render() {
		if (typeof this.props.data == "undefined" && typeof this.props.isFetching =="undefined") {
			return (
				
				<div className="small-margin container">
					<div className="form-group row">
						<label>Resource URL: <input className="form-control col-md-5" type="text" id="input_url" defaultValue="http://viaf.org/viaf/32005141"></input></label>
					</div>

					<div className="form-group row">
						<button onClick={this.props.onSampleClick} className="btn btn-default col-md-1"> Search </button>
					</div>
				</div>
				)
		}else if(typeof this.props.data == "undefined" &&  this.props.isFetching ==true){
			return (
				<div>
					<div style={{ width: '100%', height: '100%', position: 'absolute', overflow: 'visible',left: '50%',  top: '50%'}}><i className="fa fa-spinner fa-spin fa-5x"></i></div>
					<div style={{ opacity: 0.5, position: 'relative' }} className="small-margin container">
						<div className="form-group row">
							<label>Resource URL: <input className="form-control col-md-5" type="text" id="input_url" defaultValue="http://viaf.org/viaf/32005141"></input></label>
						</div>

						<div className="form-group row">
							<button onClick={this.props.onSampleClick} className="btn btn-default col-md-1"> Search </button>
						</div>
					</div>
				</div>
				)
		} else if (typeof this.props.uploadDatajs == "object" && this.props.uploadDatajs.length > 0) {
			return (
				<div className="small-margin container basic-margin">
					<h2 className="small-margin">Upload and connect your new dataset</h2>
					<ConnectData jsonldUpload={this.props.uploadDatajs} propertyList={this.props.propertyList} />
					<div className=" small-margin container text-right">
						<button className="btn btn-default"> Upload </button>
					</div>
				</div>
			);
		} else if (typeof this.props.data == "object") {
			return (
				<div className="small-margin container form-group">
					<div className="form-group text-right">
						<button type="submit" onClick={this.props.uploadData} className="btn btn-default"> Continue </button>
					</div>
					<ProvTabs propValues={this.props.data} onValueClick={this.props.onValueClick} expandClick={this.props.expandClick} extraLinkClick={this.props.onLinkClick} errorText={this.props.errorText} isFetching = {this.props.isFetching} closeErrorDiv = {this.props.closeErrorDiv}/>
				</div>
			);
		} else {
			return (
				<div className="container">
					<p style={{ color: "red" }}> {this.props.data}</p>
					<div className="form-group row">
						<label>Resource URL: <input className="form-control col-md-5" type="text" id="input_url" defaultValue="http://viaf.org/viaf/32005141"></input></label>
					</div>
					<div className="form-group row">
						<button onClick={this.props.onSampleClick} className="btn btn-default col-md-1"> Search </button>
					</div>
				</div>
			);
		}
	}
}

// App.propTypes = {
// 	myTableRows: React.PropTypes.array,
// 	onSampleClick: React.PropTypes.func
// };onClick={this.props.uploadData} 

export default App;
