import ReactDOM from "react-dom"
import router from "./router";

console.log(`${process.env.server}/v2.1/metadata/Admin?withCollectionInfo=true`);
document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(router, document.getElementById("app"));
});