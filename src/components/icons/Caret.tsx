import React, { SFC } from 'react';

interface Props {
    color?: string;
    rotate?: boolean;
}

const Caret: SFC<Props> = ({ color, rotate }) => {
    return (
        <svg width="9" height="13" viewBox="0 0 9 13" style={{ transform: rotate ? 'rotateY(180deg)' : 'none' }}>
            <path
                d="M1.68006346 1.4008126l5.57050848 4.80975104M1.68006346 11.2105634l5.57050848-4.809751"
                stroke={color}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    );
};

Caret.defaultProps = {
    color: 'currentColor'
};

export default Caret;
