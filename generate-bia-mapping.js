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
          variable: [{
            variableName: "family_name"
          }]
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
          property: "hasLocation",
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
      mappings: [{
        property: "name",
        variable: [{
          variableName: "name"
        }]
      }]
    }
  }
};
const vre = process.env.VRE_ID;
const auth = process.env.AUTH_HEADER;
const jsonLd = JSON.stringify(mappingToJsonLdRml(mappings, vre, archetypes));

console.log(JSON.stringify(JSON.parse(jsonLd), null, '  '));

const httpOpts = {
  host: "localhost",
  port: "8080",
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

