import React from "react";
import Page from "../page.jsx";
import camel2label from "./camel2label";
import { Link } from "react-router";
import { urls } from "../../router";
import cx from "classnames";

const ts2date = (ts) => {
  const date = new Date(ts);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const getArchetypeFields = (variants, metadata) => Object.keys(metadata).map((collectionName) => ({
  archetypeName: metadata[collectionName].archetypeName || collectionName.replace(/s$/, ""),
  properties: metadata[collectionName].properties.filter((prop) => prop.type !== "relation").map((prop) => prop.name)
})).find((md) => variants.map((v) => v.type).indexOf(md.archetypeName) > -1).properties;

class Detail extends React.Component {

  componentDidMount() {
    const {entity, onFetchEntity, params: { id, collectionName }} = this.props;

    // If the requested id from the route does not match the data, or if there is no data
    if ((!entity._id && id) || (id && entity._id !== id) ) {
      // Fetch the correct author based on the id.
      onFetchEntity(collectionName, id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchEntity } = this.props;

    // Triggers fetch data from server based on id from route.
    if (this.props.params.id !== nextProps.params.id) {
      onFetchEntity(nextProps.params.collectionName, nextProps.params.id);
    }
  }

  renderPropPart(value) {
    if (typeof value === "string") {
      return value;
    } else if (value.components) {
      return value.components.map((com) => com.value).join(" ");
    } else if (value.url) {
      return <a href={value.url}>{value.label}</a>
    }
  }

  renderProp(propertyValue) {
    if (typeof propertyValue === "string" || typeof propertyValue === "number") {
      return propertyValue;
    } else if (Array.isArray(propertyValue) && propertyValue.length > 0) {
      return (<ul style={{listStyle: "none", padding: 0, margin: 0}}>
        {propertyValue.map((val, i) => <li key={i}>{this.renderPropPart(val)}</li>)}
      </ul>)
    }
    return null;
  } 
  
  render() {
    const { entity, collectionMetadata, vreId, nextId, prevId, metadata} = this.props;
    
    if (!entity._id) { return <Page />; }

    const archetypeFields = getArchetypeFields(entity["@variationRefs"], metadata);
    const birthDeathBlock = collectionMetadata.archetypeName === "person" ? (
      <div className="row small-marigin text-center">
        <div className="col-xs-3 text-right" />
        <div className="col-xs-6">
          <div className="row">
            <div className="col-xs-5 text-right">
              {entity["birthDate"]}<br />
              {entity["@relations"].hasBirthPlace ? entity["@relations"].hasBirthPlace[0].displayName : null }
            </div>
            <div className="col-xs-2 text-center">
              <img id="born-died" src="./images/lived-center.svg" />
            </div>
            <div className="col-xs-5 text-left">
              {entity["deathDate"]}<br />
              {entity["@relations"].hasDeathPlace ? entity["@relations"].hasDeathPlace[0].displayName : null }
            </div>
          </div>
        </div>
      </div>
    ) : null;
    
    return (
      <Page>
        <div className="container basic-margin">
          <div className="row">
            <div className="col-xs-10 text-center">
              <span className="img-portrait img-circle" style={{
                  display: "inline-block", width: "150px", backgroundColor: "#aaa",
                  paddingTop: "40px", fontSize: "3em", color: "#666"
                }}>
                  {entity["@displayName"] ? entity["@displayName"].charAt(0) : "?"}
              </span>
              <h1>{entity["@displayName"]}</h1>
            </div>
            <div className="col-xs-2 text-right">
              <a href={`${process.env.TIMBUCTOO_BROWSER_URL}#/?url=`+encodeURIComponent(entity["^rdfUri"])} className="btn btn-default">LOD browser</a>
            </div>
          </div>
          {birthDeathBlock}
        </div>
        <div className="container basic-margin">
          {Object.keys(entity).filter((prop) => ["^", "_", "@"].indexOf(prop.charAt(0)) < 0)
            .sort((a, b) => archetypeFields.indexOf(a) > archetypeFields.indexOf(b) ? -1 : 1)
            .map((property) => (
              <div key={property} className="row small-margin">
                <div className="col-xs-5 text-right hi-light-grey" style={{fontWeight: archetypeFields.indexOf(property) > -1 ? "bold" : "normal"}}>
                  {camel2label(property)}
                </div>
                <div className="col-xs-5">
                  
                  {this.renderProp(entity[property])}
                </div>
              </div>
            ))}

          {Object.keys(entity["@relations"] || {})
            .filter((property) => !property.match(/^inverse:/))
            .map((property) => (
              <div key={property} className="row small-margin">
                <div className="col-xs-5 text-right hi-light-grey">
                  {camel2label(property)}
                </div>
                <div className="col-xs-5">
                  <ul style={{padding: "0", margin: "0", listStyle: "none", maxHeight: "200px", overflowY: "auto"}}>
                    {entity["@relations"][property]
                      .map((rel) => (
                        <li key={rel.path}>
                            {<a href={`${process.env.TIMBUCTOO_SEARCH_GUI_URL}`+rel.path.replace("domain","?vreId="+vreId+"#")}>{rel.displayName} </a>|| "<no display name found>"}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            ))}
        </div>
        <div className="hi-light-grey-bg">
          <div className="container big-margin">
            <div className="row small-margin">
              <div className="row small-margin">
                <div className="col-xs-10 text-center hi-light-grey">
                  Modified on {ts2date(entity["^modified"].timeStamp)} by user {entity["^modified"].username || entity["^modified"].userId}
                </div>
              </div>
              <div className="col-xs-10 text-center"><small><em>Timbuctoo documents full data provenance.</em></small></div>
              <div className="col-xs-10 text-center"><small><em>Future releases will include a more detailed view of this provenance information.</em></small></div>     
              </div>
          </div>
        </div>
        <div type="footer-body">
          <div className="col-sm-4 text-right">
            <Link to={urls.entity(collectionMetadata.collectionName, prevId, vreId)} className={cx("btn", "btn-default", {"disabled": !prevId})}>
              <span className="glyphicon glyphicon-chevron-left" />
            </Link>
          </div>
          <div className="col-sm-4 text-center">
            <Link to={urls.root(vreId)} className="btn btn-default">Back to results</Link>
          </div>
          <div className="col-sm-4 text-left">
            <Link to={urls.entity(collectionMetadata.collectionName, nextId, vreId)} className={cx("btn", "btn-default", {"disabled": !nextId})}>
              <span className="glyphicon glyphicon-chevron-right" />
            </Link>
          </div>
        </div>
      </Page>
    )
  }
}

export default Detail;
