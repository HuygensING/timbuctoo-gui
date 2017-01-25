const initialState = {
  isUploading: false,
  publishing: false,
  publishEnabled: true,
  publishStatus: undefined,
  publishErrorCount: 0,
  tripleCount: 0
};



export default function(state=initialState, action) {
  switch (action.type) {
    case "START_UPLOAD":
      return {...initialState, uploadStatus: "transfering file", uploadedFileName: action.uploadedFileName};
    case "UPLOAD_STATUS_UPDATE":
      if (action.data) {
        return {...state,
          uploadStatus: action.data
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
        saveMappingUrl:  action.data.saveMapping,
        executeMappingUrl: action.data.executeMapping,
        collections: action.data.collections.map((col) => ({
          ...col,
          dataUrl: col.data,
          dataUrlWithErrors: col.dataWithErrors
        }))
      };

    case "PUBLISH_START":
      return {
        ...state,
        publishing: true
      };

    case "PUBLISH_STATUS_UPDATE":
      return {
        ...state,
        publishStatus: action.data
      };
    case "PUBLISH_HAD_ERROR":
      // clear the sheets to force reload
      return {
        ...state,
        publishErrors: true,
        collections: state.collections.map((col) => ({
          ...col,
          dataUrl: col.data,
          dataUrlWithErrors: col.dataWithErrors
        }))
      };
    case "PUBLISH_SUCCEEDED":
      // clear the sheets to force reload
      return {
        ...state,
        publishStatus: undefined,
        publishEnabled: true,
        publishErrors: false,
        collections: state.collections.map((col) => ({
          ...col,
          dataUrl: col.data,
          dataUrlWithErrors: col.dataWithErrors
        }))
      };
    case "PUBLISH_FINISHED":
      // clear the sheets to force reload
      return {
        ...state,
        publishStatus: undefined,
        publishEnabled: true,
        publishErrorCount: 0,
        tripleCount: 0,
        publishing: false
      };
  }

  return state;
}
