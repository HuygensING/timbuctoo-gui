import { urls } from "../../router";

export default (appState, ownProps) => {
  const { location: { pathname } } = ownProps;
  return {
    username: appState.userdata.userId,
    vres: appState.userdata.vres,
    showDatasets: pathname === "/" || pathname === urls.collectionsOverview(),
    searchGuiUrl: appState.userdata.searchGuiUrl
  };
}
