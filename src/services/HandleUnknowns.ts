import { CollectionMetadata } from '../typings/schema';
import { UNKNOWN_VOCABULARY } from '../constants/global';

const isKnown = (col) => col.collectionId.indexOf(UNKNOWN_VOCABULARY) === -1;

const reorderUnknownsInList = (collections: CollectionMetadata[]) => {
    const collectionsCopy: CollectionMetadata[] = collections.slice();
    const invalidCollections: any[] = [];
    let col;
    for (let i = 0, limit = collectionsCopy.length; i < limit; i++) {
        col = collectionsCopy[i];
        if (col && !isKnown(col)) {
            invalidCollections.push(collectionsCopy.splice(i, 1)[0]);
        }
    }
    return collectionsCopy.concat(invalidCollections);
};

export { isKnown, reorderUnknownsInList };