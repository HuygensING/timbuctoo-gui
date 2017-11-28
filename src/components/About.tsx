import React, { PureComponent } from 'react';
import styled from '../styled-components';
import { Col, Grid } from './layout/Grid';
import { Content, Title } from './layout/StyledCopy';
import { Button } from './layout/Button';

interface Props {
    title: string | null;
    body: string | null;
}

interface State {
    isOpen: boolean;
}

const StyledCol = styled(Col)`
    background: ${props => props.theme.colors.shade.light};
`;

const Toggle = Button.extend`
    margin-top: 2rem;
`;

class About extends PureComponent<Props, State> {
    constructor() {
        super();

        this.state = {
            isOpen: false
        };

        this.toggleState = this.toggleState.bind(this);
    }

    toggleState() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { body, title } = this.props;

        if (!body || !title) {
            return null;
        }

        const toggleActive = body.length > 300;
        const bodyText = toggleActive && !this.state.isOpen ? body.substr(0, 300) : body;

        return (
            <Grid sm={48}>
                <StyledCol sm={48} smPadding={3}>
                    <Title>{title}</Title>
                    <Content>{bodyText}</Content>
                    {toggleActive && (
                        <Toggle onClick={this.toggleState}>{this.state.isOpen ? 'Show less' : 'Show more'}</Toggle>
                    )}
                </StyledCol>
            </Grid>
        );
    }
}

export default About;
