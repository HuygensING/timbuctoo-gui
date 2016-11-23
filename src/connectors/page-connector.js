export default (state, routed) => {
  const { location: { pathname }} = routed;

  return {
    username: state.userdata.userId,
    vres: state.datasets.publicVres.filter((vre) => vre.name !== "Admin" && vre.name !== "Base"),
    searchGuiUrl: state.datasets.searchGuiUrl,
    showDatasets: pathname === "/" /* || pathname === urls.collectionsOverview(),*/
  }
}