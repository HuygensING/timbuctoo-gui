// TODO: Rename this file!

const noContent = null;

export function safeGet<T, U extends keyof T>(arr: T | undefined | null, index: U): T[U] | null {
    if (arr) {
        return arr[index];
    } else {
        return null;
    }
}

const getDataSetValues = (dataSets: any, dataSetId: string) => {
    if (!dataSets || !dataSetId) { return noContent; }

    return dataSets[dataSetId];
};

const getCollectionValues = (dataSets: any, dataSetId: string, collectionId: string | null) => {
    const dataSetValues = getDataSetValues(dataSets, dataSetId);

    if (!dataSetValues || !collectionId) { return noContent; }

    return dataSetValues[collectionId];
};

export { getDataSetValues, getCollectionValues };