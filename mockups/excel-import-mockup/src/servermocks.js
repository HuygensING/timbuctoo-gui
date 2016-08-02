export default function setupMocks(xhrmock, orig) {
  xhrmock
    .get("http://acc.repository.huygens.knaw.nl/v2.1/metadata/Admin", function (req, resp) {
      return resp
        .status(200)
        .body(`{
          "persons": [
            {
              "name": "name",
              "type": "text"
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
    .post("http://acc.repository.huygens.knaw.nl/v2.1/bulk-upload", function (req, resp) {
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
        	"name": "someCollection",
        	"variables": ["tim_id", "var1", "var2"],
        	"items": [{
        		"tim_id": "1",
            "ID": "ID",
            "Voornaam": "Voornaam",
            "tussenvoegsel": "tussenvoegsel",
            "Achternaam": "Achternaam",
            "GeschrevenDocument": "GeschrevenDocument",
            "Genoemd in": "Genoemd in",
            "Is getrouwd met": "Is getrouwd met",
        	}, {
            "tim_id": "2",
            "ID": "ID",
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
