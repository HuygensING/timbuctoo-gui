import React, { PureComponent } from 'react';
import styled from '../styled-components';
import { Col, Grid } from './layout/Grid';
import { Content, Title } from './layout/StyledCopy';
// import { Button } from './layout/Button';
import Remarkable from 'remarkable';
import theme from '../theme';

const parser = new Remarkable({
    html: false,
    linkify: true,
    typographer: false
});

interface Props {
    title: string | null;
    body: string | null;
    isMarkDown: boolean;
}

interface State {
    isOpen: boolean;
}

const StyledCol = styled(Col)`
    background: ${props => props.theme.colors.shade.light};
`;

const Toggle = styled.a`
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    padding: 5px;
    background: ${theme.colors.shade.light};
`;

const collapsedHeight = 150;
const fadeOutHeight = 50;

const OverflowContent = Content.extend`
    position: relative;
    max-height: ${(props: any) => (props.isOpen ? 'none' : collapsedHeight + 'px')};
    overflow: hidden;
` as any;

const Overflow = styled.span`
    position: absolute;
    top: ${collapsedHeight - fadeOutHeight}px;
    left: 0;
    height: ${fadeOutHeight}px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), ${theme.colors.shade.light});
`;

class About extends PureComponent<Props, State> {
    state = {
        isOpen: false
    };

    toggleState = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const { body, title } = this.props;

        if (!body || !title) {
            return null;
        }

        return (
            <Grid sm={48}>
                <StyledCol sm={48} smPadding={3}>
                    <Title>{title}</Title>
                    <OverflowContent
                        isOpen={this.state.isOpen}
                        className={this.props.isMarkDown ? 'markdown-body' : null}
                    >
                        {this.props.isMarkDown ? (
                            <span dangerouslySetInnerHTML={{ __html: parser.render(body) }} />
                        ) : (
                            body
                        )}
                        {this.state.isOpen ? null : (
                            <Overflow>
                                <Toggle onClick={this.toggleState}>Show more...</Toggle>
                            </Overflow>
                        )}
                    </OverflowContent>
                </StyledCol>
            </Grid>
        );
    }
}

export default About;
