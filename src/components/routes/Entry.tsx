import React, { Component } from 'react';
import FullHelmet from '../FullHelmet';
import { Dummy } from '../Dummy';
import { Col } from '../layout/Grid';
import { RouteComponentProps } from 'react-router';
import GridSection from '../layout/GridSection';

interface Props {
}

interface State {
}

class Entry extends Component<Props & RouteComponentProps<any>, State> {
    render () {
        const { dataSet, entry } = this.props.match.params;

        if (!dataSet || !entry) { return null; }

        return (
            <section>
                <FullHelmet pageName={`Entry - ${entry}`}/>
                <Col sm={28} smOffset={10} smPaddingTop={2}>
                    <Dummy text={`Image`} height={10} mvp={true} marginY={.5}/>
                    <Dummy text={`entry ${entry}`} mvp={true} height={2} marginY={.5}/>
                    <Dummy text={`dataset ${dataSet}`} mvp={true} height={2} marginY={.5}/>

                    <GridSection title={''} gridSize={28} gridOffset={0} colSizeOffset={.5} cols={2} gridSpacing={1}>
                        <Dummy text={'Key'} mvp={true} height={1} marginY={.5}/>
                        <Dummy text={'value'} mvp={true} height={1} marginY={.5}/>
                        <Dummy text={'Key'} mvp={true} height={1} marginY={2.5}/>
                        <Dummy text={'value'} mvp={true} height={1} marginY={2.5}/>
                    </GridSection>
                </Col>
            </section>
        );
    }
}

export default Entry;