import React, { PropTypes } from 'react';
import PropValueList from './PropertyValueList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class ProvTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0
            
        };

        this.handleSelected = this.handleSelected.bind(this);
    }

    handleSelected(index, last) {
        this.setState({
            selectedIndex: index
            //...otherStateUpdates
        });
    }

    render() {
        return (
            <div>
                {this.props.isFetching ?
                    <div>
                        <div style={{ zIndex: 3, width: '100%', height: '100%', position: 'absolute', left: '50%', top: '50%' }}><i className="fa fa-spinner fa-spin fa-5x"></i></div>
                        <div style={{ opacity: 0.5, position: 'relative' }}>
                            <Tabs onSelect={this.handleSelected} selectedIndex={this.state.selectedIndex}>
                                <TabList>
                                    {Object.keys(this.props.propValues).map((tabName) =>
                                        tabName === 'Other sources' ? null : <Tab key={tabName}> <h5>{tabName}</h5> </Tab>
                                    )}
                                    <Tab key={'Other sources'}><h5>Other sources</h5></Tab>
                                </TabList>

                                {Object.keys(this.props.propValues).map((tabName, idx) =>
                                    tabName === 'Other sources' ? null :
                                        <TabPanel key={idx}>
                                            <PropValueList
                                                key={idx}
                                                propValues={this.props.propValues[tabName]}
                                                onValueClick={this.props.onValueClick}
                                                expandClick={this.props.expandClick}
                                                extraLinkClick={this.props.extraLinkClick}
                                            />
                                        </TabPanel>
                                )}
                                <TabPanel>
                                    <PropValueList
                                        key={this.props.propValues.length}
                                        propValues={this.props.propValues['Other sources']}
                                        onValueClick={this.props.onValueClick}
                                        expandClick={this.props.expandClick}
                                        extraLinkClick={this.props.extraLinkClick}
                                    />
                                </TabPanel>

                            </Tabs>
                        </div>
                    </div>
                    :

                    <div>
                        {!this.props.errorText ? null :
                            <div style={{ backgroundColor: '#FFCCCC', height: '35px' }} className="container">
                                <div className='text-right' style={{height:'5px'}}><button type="button" className="btn btn-link btn-sm"><i style={{ color: '#808080' }} onClick={this.props.closeErrorDiv} className="glyphicon glyphicon-remove"></i></button> </div>
                                <div className="container" style={{ color: '#808080' }}><h6>Server did not respond.</h6></div>
                            </div>
                        }
                        <Tabs onSelect={this.handleSelected} selectedIndex={this.state.selectedIndex}>
                            <TabList>
                                {Object.keys(this.props.propValues).map((tabName) =>
                                    tabName === 'Other sources' ? null : <Tab key={tabName}> <h5>{tabName}</h5> </Tab>
                                )}
                                <Tab key={'Other sources'}><h5>Other sources</h5></Tab>
                            </TabList>

                            {Object.keys(this.props.propValues).map((tabName, idx) =>
                                tabName === 'Other sources' ? null :
                                    <TabPanel key={idx}>
                                        <PropValueList
                                            key={idx}
                                            propValues={this.props.propValues[tabName]}
                                            onValueClick={this.props.onValueClick}
                                            expandClick={this.props.expandClick}
                                            extraLinkClick={this.props.extraLinkClick}
                                        />
                                    </TabPanel>
                            )}
                            <TabPanel>
                                <PropValueList
                                    key={this.props.propValues.length}
                                    propValues={this.props.propValues['Other sources']}
                                    onValueClick={this.props.onValueClick}
                                    expandClick={this.props.expandClick}
                                    extraLinkClick={this.props.extraLinkClick}
                                />
                            </TabPanel>

                        </Tabs>
                    </div>
                
            }
            </div>)
    }
}

export default ProvTabs