import { NormalizedComponentConfig, NormalizedFacetConfig } from '../typings/index';
import { COMPONENTS, VALUE, URI } from '../constants/global';
import { ReferencePath } from './propertyPath';

const referenceIncomplete = (path: ReferencePath | undefined) =>
    path && (path[path.length - 1][1] !== VALUE && path[path.length - 1][1] !== URI);
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

export const facetErrors = (referencePath: ReferencePath, config: NormalizedFacetConfig): string | null => {
    if (referenceIncomplete(referencePath)) {
        return `You forgot to finish the path ${config.caption}: ${referencePath}`;
    }

    return null;
};
