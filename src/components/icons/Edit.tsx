import React, { SFC } from 'react';
import theme from '../../theme/index';

interface Props {
    color?: string;
}

const Edit: SFC<Props> = props => {
    return (
        <svg {...props} width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
            <title>Edit</title>
            <path
                d="M2.56 10l.64-.642L1.545 7.7l-.642.643v.755h.903V10h.754zm3.687-6.543c0-.104-.052-.155-.155-.155-.047 0-.087.016-.12.05L2.15 7.17c-.032.034-.05.073-.05.12 0 .104.053.156.156.156.047 0 .087-.017.12-.05l3.822-3.82c.033-.034.05-.074.05-.12zm-.38-1.354l2.932 2.933-5.867 5.867H0V7.968l5.866-5.867zm4.815.677c0 .25-.087.46-.26.635l-1.17 1.17-2.935-2.933L7.487.488C7.658.31 7.87.22 8.123.22c.25 0 .464.09.642.268l1.657 1.65c.175.184.262.398.262.642z"
                fill={props.color ? props.color : theme.colors.shade.dark}
                fillRule="evenodd"
            />
        </svg>
    );
};

export default Edit;
