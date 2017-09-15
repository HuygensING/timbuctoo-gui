import * as React from 'react';
import { connect } from 'react-redux';

import styled from '../../styled-components';
import Translations from '../../services/Translations';

import { calcColWidth, Col, Grid } from '../layout/Grid';
import { srOnly, Content } from '../layout/StyledCopy';
import { addressData } from '../../constants/address';
import { SFC } from 'react';
import AccountMenu from '../header/AccountMenu';
import { LogOutUser, SwitchLanguage } from '../../reducers/user';

interface Props {
    isLoggedIn: boolean;
    onLogOut: () => void;
    switchLanguage: (language: string) => void;
}

const FooterContainer = styled(Grid)`
    padding: ${calcColWidth(1)} ${calcColWidth(3)};
    background-color: ${(props) => props.theme.colors.black};
`;

const WhiteCol = styled(Col)`
    color: #fff;
`;

const H1 = styled.h1`
    ${srOnly}
`;

const Dt = styled.dt`
    ${srOnly}
`;

const Dd = styled.dd`
    color: ${props => props.theme.colors.white};
    margin: 0;
    padding: 0;
`;

const Dl = styled.dl`
    margin: 0;
    padding: 0;
    color: #fff;
    font: ${p => p.theme.fonts.body}    
`;

const Footer: SFC<Props> = ({ isLoggedIn, onLogOut, switchLanguage }) => {

    return (
        <FooterContainer tag={'footer'}>
            <H1>Footer</H1>
            {
                isLoggedIn &&
                <WhiteCol sm={8}>
                    <AccountMenu isFooter={true} onLogOut={() => onLogOut()}/>
                    <button onClick={() => switchLanguage('nl')}>NL</button> | <button onClick={() => switchLanguage('en')}>EN</button>
                </WhiteCol>
            }
            <WhiteCol sm={8} smOffset={isLoggedIn ? 26 : 34}>
                <Content color={'#fff'}>{Translations.translate('footer.powered_by')}:</Content>
                <Dl>
                    <Dt>{Translations.translate('footer.company_name')}</Dt>
                    <Dd>{addressData.company}</Dd>

                    <Dt>{Translations.translate('footer.street')}</Dt>
                    <Dd>{addressData.street}</Dd>

                    <Dt>{Translations.translate('footer.address')}</Dt>
                    <Dd>{addressData.zip} {addressData.city}</Dd>

                    <Dt>{Translations.translate('footer.phone')}</Dt>
                    <Dd>{addressData.phone}</Dd>

                    <Dt>{Translations.translate('footer.opening_hours')}</Dt>
                    <Dd>{addressData.openingHours}</Dd>
                </Dl>
            </WhiteCol>
        </FooterContainer>
    );
};

const mapStateToProps = state => ({
    isLoggedIn: state.user.loggedIn
});

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch(LogOutUser()),
    switchLanguage: (language) => dispatch(SwitchLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);