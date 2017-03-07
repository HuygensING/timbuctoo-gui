import React from 'react';
import DatasetCards from "./dataset-cards";
import Footer from "./footer";

const FOOTER_HEIGHT = 81;

function Page(props) {
  return (
    <div className="page" style={{paddingBottom:'50px'}}>
      <div className="basic-margin hi-Green container-fluid">
        <nav className="navbar ">
          <div className="container">
            <div className="navbar-header"> <a className="navbar-brand" href={`${process.env.TIMBUCTOO_GUI_URL}`}><img src="images/logo-timbuctoo.svg" className="logo" alt="timbuctoo"/></a> </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                {props.username ? <li><a href={props.userlocation || '#'}><span className="glyphicon glyphicon-user"/> {props.username}</a></li> : null}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div  style={{marginBottom: `${FOOTER_HEIGHT}px`}}>
        {props.children}
        {props.vres && props.showDatasets ? (
          <div className="container">
            <DatasetCards caption="Explore all datasets" vres={props.vres} searchGuiUrl={props.searchGuiUrl} onDeleteVreClick={props.onDeleteVreClick} height="120px" />
          </div>) : null}
      </div>
      <Footer>
        <div>
          This is an initial release of Timbuctoo. <a href="https://github.com/huygensing/timbuctoo/issues/new" target="_blank">Suggestions</a> for improvement are very welcome!
          </div>
      </Footer>
    </div>
  );
}

export default Page;
