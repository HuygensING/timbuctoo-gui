import React from "react";
import Page from "../page";
import camel2label from "./camel2label";
import { Link } from "react-router";
import { urls, serializeSearch } from "../../router";

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
    }
  }

  renderProp(propertyValue) {
    if (typeof propertyValue === "string" || typeof propertyValue === "number") {
      return propertyValue;
    } else if (Array.isArray(propertyValue)) {
      return propertyValue.map((val) => this.renderPropPart(val)).join(", ")
    }
    return "[Object]";
  }

  render() {
    const { entity, params: { dataset }, prevPage, nextPage, metadata } = this.props;

    if (!entity._id) { return <Page />; }

    const archetypeFields = getArchetypeFields(entity["@variationRefs"], metadata);

    const datasets = entity["^datasets"] && entity["^datasets"].length ? entity["^datasets"] : [dataset];

    const birthDeathBlock = entity["birthDate"] || entity["deathDate"]  ? (
      <div className="row small-marigin text-center">
        <div className="col-xs-3 text-right" />
        <div className="col-xs-6">
          <div className="row">
            <div className="col-xs-5 text-right">
              {entity["birthDate"]}<br />
              {entity["@relations"].hasBirthPlace ? entity["@relations"].hasBirthPlace[0].displayName : null }
            </div>
            <div className="col-xs-2 text-center">
              <img id="born-died" src="/dataset-search/images/lived-center.svg" />
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
            <div className="col-xs-12 text-center">
              <span className="img-portrait img-circle" style={{
                display: "inline-block", width: "150px", backgroundColor: "#aaa",
                paddingTop: "40px", fontSize: "3em", color: "#666"
              }}>
                  {entity["@displayName"] ? entity["@displayName"].trim().charAt(0) : "?"}
              </span>
              <h1>{entity["@displayName"]}</h1>
            </div>
          </div>
          {birthDeathBlock}
        </div>
        <div className="container basic-margin">
          <div className="row small-margin">
            <div className="col-xs-6 text-right hi-light-grey" style={{fontWeight: "bold"}}>
              Datasets
            </div>
            <div className="col-xs-6">
              <ul style={{padding: "0", margin: "0", listStyle: "none", maxHeight: "200px", overflowY: "auto"}}>
                {datasets.map((d) => (
                  <li style={{color: d === dataset ? "#000" : "#666"}}>{d.replace(/^[^_]+_+/, "")}</li>
                ))}
              </ul>
            </div>
          </div>
          {Object.keys(entity).filter((prop) => ["^", "_", "@"].indexOf(prop.charAt(0)) < 0)
            .sort((a, b) => archetypeFields.indexOf(a) > archetypeFields.indexOf(b) ? -1 : 1)
            .map((property) => (
            <div key={property} className="row small-margin">
              <div className="col-xs-6 text-right hi-light-grey" style={{fontWeight: archetypeFields.indexOf(property) > -1 ? "bold" : "normal"}}>
                {camel2label(property)}
              </div>
              <div className="col-xs-6">
                {this.renderProp(entity[property])}
              </div>
            </div>
          ))}

          {Object.keys(entity["@relations"] || {})
            .filter((property) => !property.match(/^inverse:/))
            .map((property) => (
            <div key={property} className="row small-margin">
              <div className="col-xs-6 text-right hi-light-grey">
                {camel2label(property)}
              </div>
              <div className="col-xs-6">
                <ul style={{padding: "0", margin: "0", listStyle: "none", maxHeight: "200px", overflowY: "auto"}}>
                  {entity["@relations"][property]
                    .map((rel) => (
                      <li key={rel.path}>
                        <Link  to={urls.entity(dataset, rel.path.replace(/^domain\//, ""))}>
                          {rel.displayName || "<no display name found>"}
                        </Link>
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
              <div className="col-xs-12 text-center">
                <h4>Provenance</h4>
              </div>
              <div className="row small-margin">
                <div className="col-xs-6 text-right hi-light-grey">
                  Modified {ts2date(entity["^modified"].timeStamp)}
                </div>
                <div className="col-xs-6">
                  {entity["^modified"].username || entity["^modified"].userId}
                </div>
              </div>
              <div className="row small-margin">
                <div className="col-xs-6 text-right hi-light-grey">
                  Created {ts2date(entity["^created"].timeStamp)}
                </div>
                <div className="col-xs-6">
                  {entity["^created"].username || entity["^created"].userId}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div type="footer-body">
          <div className="col-sm-4 text-right">
            <Link to={prevPage ? urls.entity(prevPage.dataset_s, prevPage.id) : "#"} className={cx("btn", "btn-default", {"disabled": !prevPage})}>
              <span className="glyphicon glyphicon-chevron-left" />
            </Link>
          </div>
          <div className="col-sm-4 text-center">
            <Link to={`${urls.root()}#?q=${serializeSearch()}`} className="btn btn-default">Back to results</Link>
          </div>
          <div className="col-sm-4 text-left">
            <Link to={nextPage ? urls.entity(nextPage.dataset_s, nextPage.id) : "#"} className={cx("btn", "btn-default", {"disabled": !nextPage})}>
              <span className="glyphicon glyphicon-chevron-right" />
            </Link>
          </div>
        </div>
      </Page>
    )
  }
}

export default Detail;
