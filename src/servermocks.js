export default function setupMocks(xhrmock, orig) {
  xhrmock
    .get(process.env.server + "/v2.1/metadata/Admin", function (req, resp) {
      return resp
        .status(200)
        .body(`{
          "persons": [
            {
              "name": "names",
              "type": "names"
            },
            {
              "name": "birthDate",
              "type": "datable"
            },
            {
              "name": "floruit",
              "type": "text"
            },
            {
              "name": "hasWritten",
              "type": "relation",
              "quicksearch": "/v2.1/domain/documents/autocomplete",
              "relation": {
                "direction": "OUT",
                "outName": "hasWritten",
                "inName": "wasWrittenBy",
                "targetCollection": "documents",
                "relationCollection": "relations",
                "relationTypeId": "bba10d37-86cc-4f1f-ba2d-016af2b21aa4"
              }
            },
            {
              "name": "isRelatedTo",
              "type": "relation",
              "quicksearch": "/v2.1/domain/persons/autocomplete",
              "relation": {
                "direction": "OUT",
                "outName": "isRelatedTo",
                "inName": "isRelatedTo",
                "targetCollection": "persons",
                "relationCollection": "relations",
                "relationTypeId": "cba10d37-86cc-4f1f-ba2d-016af2b21aa5"
              }
            }
          ],
          "documents": [
            {
              "name": "title",
              "type": "text"
            }
          ]
        }`);
    })
    .get(process.env.server + "/v2.1/system/users/me/vres", function(req, resp) {
      console.log("fetch-my-vres");
      return resp
        .status(200)
        .body(`{
          "mine": {
            "migrant_steekproef_masterdb (6).xlsx": {
              "name": "migrant_steekproef_masterdb (6).xlsx",
              "published": true
            },
            "thevrename": {
              "name": "thevrename",
              "published": false,
              "rmlUri": "<<The get raw data url that the server provides>>"
            }
          },
          "public": {
            "WomenWriters": {
              "name": "WomenWriters"
            }
          }
        }`);
    })
    .post(process.env.server + "/v2.1/bulk-upload", function (req, resp) {
      console.log("bulk-upload");
      return resp
        .status(200)
        .header("Location", process.env.server + "/v2.1/bulk-upload/thevrename");
    })
    .post("<<The execute mapping url that the server provides>>", function (req, resp) {
      console.log("execute mapping with failures", req.body());
      return resp
        .status(200)
        .body(JSON.stringify({
          success: false
        }));
    })
    .post("<<The save mapping url that the server provides>>", function (req, resp) {
      console.log("save mapping", req.body());
      localStorage.setItem("saved-mapping", req.body());
      return resp
        .status(200)
        .body(JSON.stringify({
          success: true
        }));
    })
    .get(process.env.server + "/v2.1/bulk-upload/thevrename", function (req, resp) {
      console.log("Get VRE information, saved mapping: ", localStorage.getItem("saved-mapping"));
      return resp
        .status(200)
        .body(JSON.stringify({
          vre: "thevrename",
          saveMapping: "<<The save mapping url that the server provides>>",
          executeMapping: "<<The execute mapping url that the server provides>>",
          savedMappingState: JSON.parse(localStorage.getItem("saved-mapping") || "null"),
          collections: [
            {
              name: "mockpersons",
              variables: ["ID", "Voornaam", "tussenvoegsel", "Achternaam", "GeschrevenDocument", "Genoemd in", "Is getrouwd met"],
              data: "<<url for person data>>",
              dataWithErrors: "<<url for person data with errors>>"
            },
            {
              name: "mockdocuments",
              variables: ["titel", "datum", "referentie", "url"],
              data: "<<url for document data>>",
              dataWithErrors: "<<url for document data with errors>>"
            }
          ]
        }));
    })
    .delete(process.env.server + "/v2.1/bulk-upload/thevrename", function (req, resp) {
      console.log("delete vre");
      return resp
        .status(403);
    })
    .get("<<url for person data>>", function (req, resp) {
      console.log("get person items data");
      return resp
        .status(200)
        .body(JSON.stringify({
          "_next": "<<more data>>",
            "name": "mockpersons",
            "items": [
              {
                values: {
                  "ID": "1",
                  "Voornaam": "Voornaam",
                  "tussenvoegsel": "tussenvoegsel",
                  "Achternaam": "Achternaam",
                  "GeschrevenDocument": "GeschrevenDocument",
                  "Genoemd in": "Genoemd in",
                  "Is getrouwd met": "Is getrouwd met",
                },
                errors: {}
              },
              {
                values: {
                  "ID": "2",
                  "Voornaam": "Voornaam",
                  "tussenvoegsel": "tussenvoegsel",
                  "Achternaam": "Achternaam",
                  "GeschrevenDocument": "GeschrevenDocument",
                  "Genoemd in": "Genoemd in",
                  "Is getrouwd met": "Is getrouwd met",
                },
                errors: {}
              }
            ]
        }));
    })
    .get("<<url for person data>>?onlyErrors=true", function (req, resp) {
      console.log("get person items data with errors");
      return resp
        .status(200)
        .body(JSON.stringify({
          "_next": "<<more data>>",
          "name": "mockpersons",
          "items": [{
            values: {
              "ID": "1",
              "Voornaam": "Voornaam",
              "tussenvoegsel": "tussenvoegsel",
              "Achternaam": "Achternaam",
              "GeschrevenDocument": "GeschrevenDocument",
              "Genoemd in": "Genoemd in",
              "Is getrouwd met": "Is getrouwd met",
            },
            errors: {
              "Voornaam": "will not do",
              "Achternaam": "also failed"
            }
          }]
        }));
    })
    .get("<<more data>>", function (req, resp) {
      console.log("get person items data");
      return resp
        .status(200)
        .body(JSON.stringify({
          "name": "mockpersons",
          "items": [
            {
              values: {
                "ID": "3",
                "Voornaam": "Voornaam",
                "tussenvoegsel": "tussenvoegsel",
                "Achternaam": "Achternaam",
                "GeschrevenDocument": "GeschrevenDocument",
                "Genoemd in": "Genoemd in",
                "Is getrouwd met": "Is getrouwd met",
              },
              errors: {}
            },
            {
              values: {
                "ID": "4",
                "Voornaam": "Voornaam",
                "tussenvoegsel": "tussenvoegsel",
                "Achternaam": "Achternaam",
                "GeschrevenDocument": "GeschrevenDocument",
                "Genoemd in": "Genoemd in",
                "Is getrouwd met": "Is getrouwd met",
              },
              errors: {}
            }
          ]
        }));
    })
    .get("<<url for document data>>", function (req, resp) {
      console.log("get document items data");
      return resp
        .status(200)
        .body(JSON.stringify({
            "name": "mockdocuments",
            "items": [
              {
                values: {
                  "tim_id": "1",
                  "titel": "titel",
                  "datum": "datum",
                  "referentie": "referentie",
                  "url": "url",
                },
                errors: {}
              },
              {
                values: {
                  "tim_id": "2",
                  "titel": "titel",
                  "datum": "datum",
                  "referentie": "referentie",
                  "url": "url",
                },
                errors: {}
              }
            ]
        }));
    })
    .get("<<url for document data>>?onlyErrors=true", function (req, resp) {
      console.log("get document items data with errors");
      return resp
        .status(200)
        .body(JSON.stringify({
          "name": "mockdocuments",
          "items": []
        }));
    })
    .get(process.env.server + "/v2.1/javascript-globals", function(req, res) {
      console.log("get javascript globals");
      return res
        .status(200)
        .body('{"env":{"TIMBUCTOO_SEARCH_URL":"http://example.com/"}}')
    })
    .get(process.env.server + "/v2.1/system/vres", function(req, res) {
      console.log("get public datasets");
      return res
        .status(200)
        .body('[{"name":"CharterPortaal","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/CharterPortaal"},{"name":"EuropeseMigratie","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/EuropeseMigratie"}]')
    })
    .mock(function (req, resp) {
      if (req.url().match("browser-sync")) {
        console.warn("browser-sync disabled in mock mode");
      } else {
        console.error("unmocked request", req.url(), req, resp);
      }
    });
}
