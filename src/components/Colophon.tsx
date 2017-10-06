import React, { SFC } from 'react';
import { ContactInfo } from '../typings/timbuctoo/schema';
import { getValue } from '../services/getValue';
import styled from 'styled-components';
import { calcColWidth } from './layout/Grid';
import { srOnly, Subtitle, Title } from './layout/StyledCopy';

interface Props {
    owner: ContactInfo | null;
    contact: ContactInfo | null;
}

const StyledSection = styled.section`
  margin-left: ${calcColWidth(3)};
`;

const HiddenDt = styled.dt`
  ${srOnly}
`;

const Colophon: SFC<Props> = ({owner, contact}) => {

    const renderItem = (title: string, item: ContactInfo | null) => {
        if (!item) {
            return null;
        }

        const name = getValue(item.name);
        const email = getValue(item.email);

        if (!title || !name || !email) {
            return null;
        }

        return (
            <li>
                <Subtitle>{title}</Subtitle>
                <dl>
                    <HiddenDt>Name</HiddenDt>
                    <dd>{name}</dd>
                    <HiddenDt>Emailaddress</HiddenDt>
                    <dd><a href={`mailto:${email}`}>{email}</a></dd>
                </dl>
            </li>
        );
    };

    return (
        <StyledSection>
            <Title>{'Colophon'}</Title>
            <ul>
                {renderItem('Owner', owner)}
                {renderItem('Contact', contact)}
            </ul>
        </StyledSection>
    );
};

export default Colophon;