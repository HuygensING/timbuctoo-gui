import React from "react";
import classnames from "classnames";
import {urls} from "../../urls";
import { Link } from "react-router";

class CollectionTabs extends React.Component {

	render() {
		const { collections, activeDomain } = this.props;
		const domains = Object.keys(collections || {});

		return (
			<div className="container basic-margin">
        <ul className="nav nav-tabs">
          {domains
            .filter(d => !(collections[d].unknown || collections[d].relationCollection))
            .map((domain) => (
              <li className={classnames({active: domain === activeDomain})} key={domain}>
                <Link to={urls.firstEntity(domain)}>
                  {collections[domain].collectionLabel}
                </Link>
              </li>
            ))}
        </ul>
			</div>
		);
	}
}

CollectionTabs.propTypes = {
	onNew: React.PropTypes.func,
	onSelectDomain: React.PropTypes.func,
	collections: React.PropTypes.object,
	activeDomain: React.PropTypes.string
};

export default CollectionTabs;
