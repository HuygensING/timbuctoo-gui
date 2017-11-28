import { gql } from 'react-apollo';

function generateComponentsNest(depth: number, maxDepth?: number) {
    if (maxDepth === undefined) {
        maxDepth = depth;
    }
    let prefix = '';
    for (let i = depth; i < maxDepth; i++) {
        prefix += '  ';
    }
    if (depth > 1) {
        return `
  ${prefix}type
  ${prefix}value
  ${prefix}formatter { type name }
  ${prefix}subComponents {${generateComponentsNest(depth - 1, maxDepth)}  ${prefix}}
`;
    } else {
        return `
  ${prefix}type
  ${prefix}value
  ${prefix}formatter { type name }
`;
    }
}

export type ComponentsFragment = Array<{
    type: string;
    value?: string;
    subComponents?: ComponentsFragment;
    formatter: Array<{
        type: string;
        name: string;
    }>;
}>;

export const maximumComponentNesting = 10;
export const componentsFragment = gql`fragment ComponentsFragment on Component {${generateComponentsNest(
    maximumComponentNesting
)}}`;
