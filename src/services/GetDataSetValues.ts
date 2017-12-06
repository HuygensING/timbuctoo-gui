// TODO: Rename this file!

export function safeGet<T, U extends keyof T>(arr: T | undefined | null, index: U): T[U] | null {
    if (arr) {
        return arr[index];
    } else {
        return null;
    }
}

const getCollectionValues = (data: any, metadata: any): null => {
    if (!data || !data.dataSets || !metadata.dataSetMetadata) {
        return null;
    }

    const { dataSetId, collection } = metadata.dataSetMetadata;
    return safeGet(safeGet(data.dataSets, dataSetId), collection.collectionListId);
};

export { getCollectionValues };
