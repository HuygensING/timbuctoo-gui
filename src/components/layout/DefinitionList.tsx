import React, { SFC } from 'react';

interface Props {
    inverted?: boolean;
}

const DefinitionList: SFC<Props> = ({ inverted = false }) => {
    return <dl/>;
};

export default DefinitionList;