import { NormalizedComponentConfig, ReferencePath } from '../typings/index';
import { COMPONENTS, VALUE } from '../constants/global';

const referenceIncomplete = (path: string[][] | undefined) => path && path[path.length - 1][1] !== VALUE;

export const componentErrors = (childNode: NormalizedComponentConfig): string | null => {
    // has a selectpath, but is not completed
    if (referenceIncomplete(childNode.referencePath)) {
        return `You forgot to finish the path for ${childNode.name}: ${childNode.value}`;
    }

    // needs a value, but is empty
    if (
        (!childNode.value || !childNode.value.length) &&
        (childNode.type === COMPONENTS.literal || childNode.type === COMPONENTS.keyValue)
    ) {
        return `${childNode.name} has no value`;
    }

    return null;
};

export const facetErrors = (referencePath: ReferencePath, config): string | null => {
    if (referenceIncomplete(referencePath)) {
        return `You forgot to finish the path ${config.name}: ${referencePath}`;
    }

    return null;
};
