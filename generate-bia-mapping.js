import http from "http";
import mappingToJsonLdRml from "./src/util/mappingToJsonLdRml";

const archetypes = {
  concepts: [],
  locations: [],
  collectives: [],
  persons: []
};

const mappings = {
  collections: {
    Persons: {
      archetypeName: "persons",
      mappings: [
        {
          property: "familyName",
          variable: [{ variableName: "family_name" }]
        },
        {
          property: "givenName",
          variable: [{ variableName: "given_name" }]
        },
        {
          property: "preposition",
          variable: [ { variableName: "preposition" }]
        },
        {
          property: "intraposition",
          variable: [ { variableName: "intraposition" }]
        },
        {
          property: "postposition",
          variable: [ { variableName: "postposition" }]
        },
        {
          property: "gender",
          variable: [ { variableName: "gender" }]
        },
        {
          property: "birthDate",
          variable: [ { variableName: "birth_date" }]
        },
        {
          property: "deathDate",
          variable: [ { variableName: "death_date" }]
        },
        {
          property: "religion",
          variable: [ { variableName: "religion" }]
        },
        {
          property: "originDb",
          variable: [ { variableName: "origin_db" }]
        },
        {
          property: "important",
          variable: [ { variableName: "important" }]
        }
      ]
    },
    Institutes: {
      archetypeName: "collectives",
      mappings: [
        {
          property: "name",
          variable: [{
            variableName: "name"
          }]
        }, {
          property: "locatedAt",
          variable: [{
            variableName: "place_persistant_id",
            targetCollection: "Places",
            targetVariableName: "persistent_id"
          }]
        }
      ]
    },
    Places: {
      archetypeName: "locations",
      mappings: [
        {
          property: "name",
          variable: [{ variableName: "name" }]
        },
        {
          property: "country",
          variable: [{ variableName: "country" }]
        },
        {
          property: "latitude",
          variable: [{ variableName: "latitude" }]
        },
        {
          property: "longitude",
          variable: [{ variableName: "longitude" }]
        },
        {
          property: "remarks",
          variable: [{ variableName: "remarks" }]
        },
      ]
    }
  }
};
const vre = process.env.VRE_ID;
const auth = process.env.AUTH_HEADER;
const host = process.env.HOST;
const port = process.env.PORT;


const jsonLd = JSON.stringify(mappingToJsonLdRml(mappings, vre, archetypes));

console.log(JSON.stringify(JSON.parse(jsonLd), null, '  '));


const httpOpts = {
  host: host,
  port: port,
  path: `/v2.1/bulk-upload/${vre}/rml/execute`,
  method: "POST",
  headers: {
    'Authorization': auth,
    'Content-type': "application/ld+json",
    'Content-length': Buffer.byteLength(jsonLd)
  }
};

const req = http.request(httpOpts, (response) => {
  let str = '';
  response.on('data', (chunk) => str += chunk);
  response.on('end', () => console.log(str));
});

req.write(jsonLd);
req.end();

