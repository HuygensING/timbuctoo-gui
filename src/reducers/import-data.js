const initialState = {
  isUploading: false,
};



export default function(state=initialState, action) {
  switch (action.type) {
    case "START_UPLOAD":
      return {...initialState, uploadStatus: "transfering file"};
    case "UPLOAD_STATUS_UPDATE":
      if (action.data) {
        var failures = state.failures || 0;
        var currentSheet = state.currentSheet || "";
        var rows = state.rows || 0;
        var prevRows = state.prevRows || 0;
        if (action.data.substr(0, "failure: ".length) === "failure: ") {
          failures += 1;
        } else if (action.data.substr(0, "sheet: ".length) === "sheet: ") {
          currentSheet = action.data.substr("sheet: ".length);
          prevRows = rows;
        } else {
          rows = action.data*1 - prevRows;
        }
        var uploadStatus = "processing " + currentSheet + " (row " + rows + (failures > 0 ? ", " + failures + " failures" : "") + ")";
        return {...state,
          failures,
          rows,
          currentSheet,
          uploadStatus: uploadStatus
        };
      }
      return state;
    case "FINISH_UPLOAD":
      return {...state,
        uploadStatus: undefined,
        failures: 0,
        currentSheet: "",
        rows: undefined,
        publishErrors: false,
        uploadedFileName: action.uploadedFileName,
        vre: action.data.vre,
        executeMappingUrl: action.data.executeMapping,
        collections: action.data.collections.map((col) => ({
          ...col,
          dataUrl: col.data,
          dataUrlWithErrors: col.dataWithErrors
        }))
      };

  }

  return state;
}
