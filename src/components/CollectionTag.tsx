import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { CollectionMetadata, Property } from '../typings/timbuctoo/schema';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { encode } from '../services/UrlStringCreator';
import Button from './layout/Button';
import { BUTTON_TYPES } from '../constants/global';

import ProgressBar from './ProgressBar';

interface Props {
    datasetId: string;
    currentCollectionListId: string | undefined;
    collection: CollectionMetadata;
}

interface State {
    isActive: boolean;
}

const ListItem = styled.li`
    position: relative;
    display: inline-block;
    margin-right: 1rem;
`;

const PropertiesPanel = styled.div`
    position: absolute;
    pointer-events: none;
    top: 4rem;
    left: 0;

    padding: 1rem;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: ${props => props.theme.colors.shade.light};
    
    // transform: translateX(-50%);
    
    z-index: 10;
    
    &:before {
        position: absolute;
        top: 0;
        left: 1rem;
        
        width: 1rem;
        height: 1rem;
        
        background: ${props => props.theme.colors.shade.light};

        transform: translateY(-50%) rotate(45deg);
        content: '';
    }
`;

class CollectionTag extends PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        this.setState({
            isActive: true
        });
    }

    onMouseLeave() {
        this.setState({
            isActive: false
        });
    }

    renderPropertiesPanel() {
        if (!this.state.isActive) { return null; }
        const { properties } = this.props.collection;
        return (
            <PropertiesPanel>
                {properties.items.map(this.renderPropertyDensity)}
            </PropertiesPanel>
        );
    }

    renderPropertyDensity(property: Property, idx: number) {
        return <ProgressBar key={idx} label={property.name} width={'100px'} progress={property.density} />;
    }

    render() {
        const { collection, currentCollectionListId, datasetId } = this.props;
        const { title, collectionListId } = collection;

        const type = currentCollectionListId && currentCollectionListId === collectionListId
            ? BUTTON_TYPES.dark
            : BUTTON_TYPES.inverted;
        return (
            <ListItem
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <Button type={type} to={`${ROUTE_PATHS.details}/${datasetId}/${encode(collectionListId)}`}>{title}</Button>
                {this.renderPropertiesPanel()}
            </ListItem>
        );
    }
}

export default CollectionTag;