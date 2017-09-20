import React from 'react';

export const VALUE_STRING = 'ValueString';
export const DATA_KEY_VALUE = 'DataKeyValue';
export const DATA_TABLE = 'DataTable';

const ComponentLoader = (props) => {

    const renderComponent = (component) => {
        switch(component.__typename) {
            case VALUE_STRING:
                console.log('rendering ValueString component');
                return (
                    <div style={{borderBottom:'4px solid red'}}>
                        Component: {component.__typename}
                        <pre>{JSON.stringify(component, null, 4)}</pre>
                    </div>
                );
                
            case DATA_KEY_VALUE:
                console.log('rendering Data Key Value component');
                return (
                    <div style={{borderBottom:'4px solid red'}}>
                        Component: {component.__typename}
                        <pre>{JSON.stringify(component, null, 4)}</pre>
                    </div>
                );
                
            case DATA_TABLE:
                console.log('rendering Data Table component');
                return (
                    <div style={{borderBottom:'4px solid red'}}>
                        Component: {component.__typename}
                        <pre>{JSON.stringify(component, null, 4)}</pre>
                    </div>
                );

            default:
                break;
        }
        return null;
    }

    const { component } = props;
    return renderComponent(component);
}

export default ComponentLoader;