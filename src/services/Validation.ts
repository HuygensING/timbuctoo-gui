import { NormalizedComponentConfig } from '../typings/index';
import { COMPONENTS } from '../constants/global';

export const componentErrors = (childNode: NormalizedComponentConfig): string | null => {
    // has a selectpath, but is not completed
    if (childNode.referencePath && childNode.referencePath[childNode.referencePath.length - 1][0] !== 'VALUE') {
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
