import * as React from 'react';
import { connect } from 'react-redux';

import styled from '../../styled-components';
import translate from '../../services/translate';

import { MenuItemProp } from '../../typings';
import { MENU_ITEMS } from '../../constants/global';
import { calcColWidth, Col, Grid } from '../layout/Grid';
import { Link } from '../layout/StyledCopy';
import { srOnly, Content } from '../layout/StyledCopy';
import { addressData } from '../../constants/address';
import { SFC } from 'react';
import { LogOutUser, SwitchLanguage } from '../../reducers/user';

interface Props {
    isLoggedIn: boolean;
    onLogOut: () => void;
    switchLanguage: (language: string) => void;
}

const FooterContainer = styled(Grid)`
    flex-shrink: 0;
    padding: ${calcColWidth(1)} ${calcColWidth(3)};
    background-color: ${(props) => props.theme.colors.black};
`;

const MenuLink = styled(Link)`
    color: ${props => props.theme.colors.white};
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

    const renderMenu = () => {
        return (
            <ul>
                {
                    MENU_ITEMS.map((item: MenuItemProp, idx: number) => (
                        <li key={idx}>
                            <MenuLink to={item.path}>{item.name}</MenuLink>
                        </li>
                    ))
                }
            </ul>
        );
    };

    return (
        <FooterContainer tag={'footer'}>
            <H1>Footer</H1>
            {
                isLoggedIn &&
                <WhiteCol sm={8}>
                    {renderMenu()}
                    <button onClick={() => switchLanguage('nl')}>NL</button> | <button onClick={() => switchLanguage('en')}>EN</button>
                </WhiteCol>
            }
            <WhiteCol sm={8} smOffset={isLoggedIn ? 26 : 34}>
                <Content color={'#fff'}>{translate('footer.powered_by')}:</Content>
                <Dl>
                    <Dt>{translate('footer.company_name')}</Dt>
                    <Dd>{addressData.company}</Dd>

                    <Dt>{translate('footer.street')}</Dt>
                    <Dd>{addressData.street}</Dd>

                    <Dt>{translate('footer.address')}</Dt>
                    <Dd>{addressData.zip} {addressData.city}</Dd>

                    <Dt>{translate('footer.phone')}</Dt>
                    <Dd>{addressData.phone}</Dd>

                    <Dt>{translate('footer.opening_hours')}</Dt>
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