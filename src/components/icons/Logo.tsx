import React, { SFC } from 'react';
import theme from '../../theme/index';

interface Props {
    color?: string;
    width?: string;
    height?: string;
}

const Logo: SFC<Props> = props => (
    <svg width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>logo</title>
        <g fillRule="nonzero" fill={props.color ? props.color : theme.colors.white}>
            <path d="M12.582 19.766c2.855-1.674 4.873-6.41 4.804-10.827-.016-1.362-.244-2.713-.678-4 0 0-3.088-1.123-6.865-1.064-.582.01-1.16.058-1.737.137L11.38 15.54c1.006-.276 1.943-.822 2.796-1.07-.344.92-1.16 2.314-2.22 3.093l.626 2.203zm-.784-8.496c.35-.47 1.186-1.155 1.933-.96.748.197 1.188 1.214 1.278 1.802-.985-.54-2.087-.83-3.21-.842zM5.3.018C2.453 1.688.446 6.4.514 10.798c.016 1.355.244 2.696.673 3.983 0 0 3.072 1.118 6.838 1.06.578-.01 1.155-.058 1.727-.138L6.496 4.224c-1.002.275-1.94.816-2.787 1.07.338-.916 1.154-2.304 2.214-3.083L5.3.02zm.777 8.46c-.35.47-1.18 1.143-1.928.953C3.4 9.24 2.967 8.23 2.877 7.64c.985.535 2.082.82 3.2.837z" />
        </g>
    </svg>
);

export default Logo;
