import Cookies from 'js-cookie';
import { HSID } from '../constants/global';

type Query = string | null;

const getQueryStringValue = (query: string, key: string): Query => {
    if (query.length <= 0) { return null; }

    let queryStringValue: Query = null;

    const keyValues = query.split('&');

    keyValues.forEach((value) => {
        if (value.indexOf(key) > -1) {
            queryStringValue = value.split('=')[1];
        }
    });

    return queryStringValue;
};

const retrieveId = (): string => {
    const query = window.location.search;
    const queryParamValue: Query = getQueryStringValue(query, HSID);

    if (queryParamValue) {
        Cookies.set(HSID, queryParamValue);
        return queryParamValue;
    }

    const cookieValue: string | undefined = Cookies.get(HSID);

    if (cookieValue) {
        return cookieValue;
    }

    return '';
};

export default retrieveId;