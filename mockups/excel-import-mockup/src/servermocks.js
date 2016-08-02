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
        			variables: ["ID", "Voornaam", "tussenvoegsel", "Achternaam", "GeschrevenDocument", "Genoemd in", "Is getrouwd met"]
        		},
        		{
        			name: "mockdocuments",
        			variables: ["titel", "datum", "referentie", "url"]
        		}
        	]
        }));
    })
    .mock(function (req, resp) {
      console.error("unmocked request", req.url(), req, resp);
    })
}
