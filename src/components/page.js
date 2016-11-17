import React from 'react';
import Footer from "./footer";

function Page(props) {
  const footers = React.Children.toArray(props.children).filter((child) => child.props.type === "footer-body");

  return (
    <div className="page">
      <div className="basic-margin hi-Green container-fluid">
        <nav className="navbar ">
          <div className="container">
            <div className="navbar-header"> <a className="navbar-brand" href="#"><img src="images/logo-timbuctoo.svg" className="logo" alt="timbuctoo"/></a> </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                {props.username ? <li><a href={props.userlocation || '#'}><span className="glyphicon glyphicon-user"/> {props.username}</a></li> : null}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Footer>
        {footers}
      </Footer>
    </div>
  );
}

export default Page;
