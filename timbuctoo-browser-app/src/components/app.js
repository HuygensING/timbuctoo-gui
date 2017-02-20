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
				<div className="small-margin container basic-margin">
					<h2 className="small-margin">Upload and connect your new dataset</h2>
					<ConnectData jsonldUpload={this.props.uploadDatajs} propertyList={this.props.propertyList} />
					<div className=" small-margin container text-right">
						<button className="btn btn-default"> Upload </button>
					</div>
				</div>
				:
			this.props.data ?
				<div className="small-margin container form-group">
					<div className="form-group text-right">
						<button type="submit" onClick={this.props.uploadData} className="btn btn-default"> Continue </button>
					</div>
					<ProvTabs propValues={this.props.data} onValueClick={this.props.onValueClick} expandClick={this.props.expandClick} extraLinkClick={this.props.onLinkClick} errorText={this.props.errorText} isFetching={this.props.isFetching} closeErrorDiv={this.props.closeErrorDiv} />
				</div>
				:
				this.props.location.query.url ?
					<div className="small-margin container">
						<UrlForm value={this.props.location.query.url} onSampleClick={this.props.onSampleClick} skip={true} isFetching={this.props.isFetching} errorText={this.props.errorText} closeErrorDiv={this.props.closeErrorDiv}></UrlForm>
					</div>
					:
					<div className="small-margin container">
						<UrlForm value={"http://viaf.org/viaf/32005141"} onSampleClick={this.props.onSampleClick} skip={false} isFetching={this.props.isFetching} errorText={this.props.errorText} closeErrorDiv={this.props.closeErrorDiv}></UrlForm>
					</div>
		)
	}
}


// App.propTypes = {
// 	myTableRows: React.PropTypes.array,
// 	onSampleClick: React.PropTypes.func
// };onClick={this.props.uploadData} 

export default App;
