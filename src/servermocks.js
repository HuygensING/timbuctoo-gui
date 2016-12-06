export default function setupMocks(xhrmock, orig) {
  xhrmock
    .get("http://test.repository.huygens.knaw.nl/v2.1/metadata/Admin", function (req, resp) {
      return resp
        .status(200)
        .body(`{
          "persons": [
            {
              "name": "name",
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
              "name": "name",
              "type": "text"
            }
          ]
        }`);
    })
    .get("http://test.repository.huygens.knaw.nl/v2.1/system/users/me/vres", function(req, resp) {
      console.log("fetch-my-vres");
      return resp
        .status(200)
        .body(`{
          "mine": {
            "migrant_steekproef_masterdb (6).xlsx": {
              "name": "migrant_steekproef_masterdb (6).xlsx",
              "published": true
            },
            "testerdetest": {
              "name": "testerdetest",
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
    .post("http://test.repository.huygens.knaw.nl/v2.1/bulk-upload", function (req, resp) {
      console.log("bulk-upload");
      return resp
        .status(200)
        .header("Location", "<<The get raw data url that the server provides>>");
    })
    .post("<<The save mapping url that the server provides>>", function (req, resp) {
      console.log("save mapping", req.body());
      return resp
        .status(204);
    })
    .post("<<The execute mapping url that the server provides>>", function (req, resp) {
      console.log("execute mapping with failures", req.body());
      return resp
        .status(200)
        .body(JSON.stringify({
          success: false
        }));
    })
    .get("<<The get raw data url that the server provides>>", function (req, resp) {
      console.log("get raw data");
      return resp
        .status(200)
        .body(JSON.stringify({
          vre: "thevrename",
          saveMapping: "<<The save mapping url that the server provides>>",
          executeMapping: "<<The execute mapping url that the server provides>>",
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
    .get("<<url for person data>>", function (req, resp) {
      console.log("get person items data");
      return resp
        .status(200)
        .body(JSON.stringify({
          "_next": "<<more data>>",
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
    .get("<<url for person data with errors>>", function (req, resp) {
      console.log("get person items data with errors");
      return resp
        .status(200)
        .body(JSON.stringify({
          "_next": "<<more data>>",
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
            "name": "someCollection",
            "variables": ["tim_id", "var1", "var2"],
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
    .get("<<url for document data with errors>>", function (req, resp) {
      console.log("get document items data with errors");
      return resp
        .status(200)
        .body(JSON.stringify({
          "name": "someCollection",
          "variables": ["tim_id", "var1", "var2"],
          "items": []
        }));
    })
    .get("http://test.repository.huygens.knaw.nl/v2.1/javascript-globals", function(req, res) {
      console.log("get javascript globals");
      return res
        .status(200)
        .body('{"env":{"TIMBUCTOO_SEARCH_URL":"http://example.com/"}}')
    })
    .get("http://test.repository.huygens.knaw.nl/v2.1/system/vres", function(req, res) {
      console.log("get public datasets");
      return res
        .status(200)
        .body('[{"name":"CharterPortaal","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/CharterPortaal"},{"name":"EuropeseMigratie","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/EuropeseMigratie"},{"name":"ckcc","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/ckcc"},{"name":"DutchCaribbean","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/DutchCaribbean"},{"name":"cwrs","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/cwrs"},{"name":"cwno","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/cwno"},{"name":"cnw","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/cnw"},{"name":"Base","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/Base"},{"name":"Admin","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/Admin"},{"name":"WomenWriters","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/WomenWriters"},{"name":"bdd0805ab976990595c6a475b6dd0d9d68562ccf_BIA","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/bdd0805ab976990595c6a475b6dd0d9d68562ccf_BIA"},{"name":"33707283d426f900d4d55b410a78996dc730b2f7_demo-upload","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/33707283d426f900d4d55b410a78996dc730b2f7_demo-upload"},{"name":"33707283d426f900d4d55b410a78996dc730b2f7_Esuli","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/33707283d426f900d4d55b410a78996dc730b2f7_Esuli"},{"name":"33707283d426f900d4d55b410a78996dc730b2f7_cofk_union_person_short","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/33707283d426f900d4d55b410a78996dc730b2f7_cofk_union_person_short"},{"name":"33707283d426f900d4d55b410a78996dc730b2f7_migrant_steekproef_masterdb____","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/33707283d426f900d4d55b410a78996dc730b2f7_migrant_steekproef_masterdb____"},{"name":"33707283d426f900d4d55b410a78996dc730b2f7_Emigratiedienst_Australie","metadata":"http://test.repository.huygens.knaw.nl/v2.1/metadata/33707283d426f900d4d55b410a78996dc730b2f7_Emigratiedienst_Australie"}]')
    })
    .mock(function (req, resp) {
      console.error("unmocked request", req.url(), req, resp);
    });
}
