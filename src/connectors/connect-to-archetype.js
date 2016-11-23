export default (appState, routed) => {

  return {
    vreId: routed.params.vreId,
    collections: appState.importData.collections,
    vre: appState.importData.vre
  };
}