import { onUploadFileSelect } from "./actions/upload"
import { fetchBulkUploadedMetadata } from "./actions/fetch-bulkuploaded-metadata";

export default function actionsMaker(navigateTo, dispatch) {
  return {
    onUploadFileSelect: onUploadFileSelect(navigateTo, dispatch),
    onFetchBulkUploadedMetadata: (vreId) => dispatch(fetchBulkUploadedMetadata(vreId))
  };
}
