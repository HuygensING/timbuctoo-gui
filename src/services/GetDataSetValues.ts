// TODO: Rename this file!

const noContent = null;

const getDataSetValues = (dataSets: any, dataSetId: string) => {
    if (!dataSets || !dataSetId) { return noContent; }

    return dataSets[dataSetId];
};

const getCollectionValues = (dataSets: any, dataSetId: string,  collectionId: string | null) =>  {
    const dataSetValues = getDataSetValues(dataSets, dataSetId);

    if (!dataSetValues || !collectionId) { return noContent; }

    return dataSetValues[collectionId];
};

export { getDataSetValues, getCollectionValues };