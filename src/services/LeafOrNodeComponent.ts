import { LEAF_COMPONENTS, NODE_COMPONENTS } from '../constants/global';

export const isLeafOrNode = (type: string): 'leaf' | 'node' | null => {
    for (const componentType of Object.keys(LEAF_COMPONENTS)) {
        if (type === LEAF_COMPONENTS[componentType]) {
            return 'leaf';
        }
    }

    for (const componentType of Object.keys(NODE_COMPONENTS)) {
        if (type === NODE_COMPONENTS[componentType]) {
            return 'node';
        }
    }

    return null;
};