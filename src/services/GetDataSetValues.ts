// TODO: Rename this file!

import { DataSetMetadata } from '../typings/schema';

export function safeGet<T, U extends keyof T>(arr: T | undefined | null, index: U): T[U] | null {
    if (arr) {
        return arr[index];
    } else {
        return null;
    }
}

// Casting dataSets as any, for the fields inside are not known to us
const getCollectionValues = (
    data: { dataSets?: any } | undefined,
    metadata: { dataSetMetadata?: DataSetMetadata }
): null => {
    if (!data || !data.dataSets || !metadata.dataSetMetadata) {
        return null;
    }

    const { dataSetId, collection } = metadata.dataSetMetadata;
    return safeGet(safeGet(data.dataSets, dataSetId), collection!.collectionListId);
};

export { getCollectionValues };
