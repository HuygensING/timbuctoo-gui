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
        }`)
    })
    .post("http://test.repository.huygens.knaw.nl/v2.1/bulk-upload", function (req, resp) {
      console.log("bulk-upload")
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
      console.log("execute mapping", req.body());
      return resp
        .status(204);
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
              data: "<<url for person data>>"
        		},
        		{
        			name: "mockdocuments",
        			variables: ["titel", "datum", "referentie", "url"],
              data: "<<url for document data>>"
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
        	"items": [{
        		"tim_id": "1",
            "ID": "1",
            "Voornaam": "Voornaam",
            "tussenvoegsel": "tussenvoegsel",
            "Achternaam": "Achternaam",
            "GeschrevenDocument": "GeschrevenDocument",
            "Genoemd in": "Genoemd in",
            "Is getrouwd met": "Is getrouwd met",
        	}, {
            "tim_id": "2",
            "ID": "2",
            "Voornaam": "Voornaam",
            "tussenvoegsel": "tussenvoegsel",
            "Achternaam": "Achternaam",
            "GeschrevenDocument": "GeschrevenDocument",
            "Genoemd in": "Genoemd in",
            "Is getrouwd met": "Is getrouwd met",
        	}]
        }));
    })
    .get("<<more data>>", function (req, resp) {
      console.log("get person items data");
      return resp
        .status(200)
        .body(JSON.stringify({
        	"items": [{
            "ID": "3",
            "Voornaam": "Voornaam",
            "tussenvoegsel": "tussenvoegsel",
            "Achternaam": "Achternaam",
            "GeschrevenDocument": "GeschrevenDocument",
            "Genoemd in": "Genoemd in",
            "Is getrouwd met": "Is getrouwd met",
        	}, {
            "ID": "4",
            "Voornaam": "Voornaam",
            "tussenvoegsel": "tussenvoegsel",
            "Achternaam": "Achternaam",
            "GeschrevenDocument": "GeschrevenDocument",
            "Genoemd in": "Genoemd in",
            "Is getrouwd met": "Is getrouwd met",
        	}]
        }));
    })
    .get("<<url for document data>>", function (req, resp) {
      console.log("get person items data");
      return resp
        .status(200)
        .body(JSON.stringify({
        	"name": "someCollection",
        	"variables": ["tim_id", "var1", "var2"],
        	"items": [{
        		"tim_id": "1",
            "titel": "titel",
            "datum": "datum",
            "referentie": "referentie",
            "url": "url",
        	}, {
            "tim_id": "2",
            "titel": "titel",
            "datum": "datum",
            "referentie": "referentie",
            "url": "url",
        	}]
        }));
    })
    .mock(function (req, resp) {
      console.error("unmocked request", req.url(), req, resp);
    })
}
