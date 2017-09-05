import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';

const CustomTags = {
    navlink: 'NavLink',
    link: 'Link'
};

const CreateElementWithTag = (props: any, defaultTag: string = 'div') => {

    console.log( props );

    let elementProps = props.elementProps || {};
    elementProps.className = props.className;
    elementProps.ref = props.innerRef;

    const tag = props.tag || defaultTag;
    switch (tag) {
        case CustomTags.navlink:
            return <RouterNavLink to={props.to} exact={props.exact} {...elementProps}>{props.children}</RouterNavLink>;

        case CustomTags.link:
            return <RouterLink to={props.to} {...elementProps}>{props.children}</RouterLink>;

        default:
            return React.createElement(props.tag || defaultTag, elementProps || null, props.children);
    }
};

export default CreateElementWithTag;