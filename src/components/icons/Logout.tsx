import React, { SFC } from 'react';

interface Props {
    color: string;
}

const Logout: SFC<Props> = ({color}) => {
    return (
        <svg width="14" height="11" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
            <path fill={color} d="M5.5 10.175c0 .023.003.08.01.172.004.092.006.167.003.228-.003.06-.012.127-.026.202-.014.074-.043.13-.086.167-.042.037-.1.056-.175.056h-2.75c-.682 0-1.265-.242-1.75-.726C.243 9.79 0 9.207 0 8.524v-6.05C0 1.795.242 1.21.726.727S1.793 0 2.476 0h2.75c.073 0 .138.027.192.082.055.054.082.12.082.193 0 .023.003.08.01.172.004.092.006.167.003.228-.003.06-.012.127-.026.202-.014.074-.043.13-.086.167-.042.037-.1.056-.175.056h-2.75c-.378 0-.702.135-.97.404-.27.27-.405.593-.405.97v6.05c0 .38.135.703.404.972.27.27.593.404.97.404h2.682c.017 0 .05.003.1.01.048.004.08.013.098.024l.07.048c.027.02.047.045.06.077.01.03.016.07.016.115zM13.475 5.5c0 .15-.054.278-.163.387l-4.675 4.675c-.11.11-.238.163-.387.163-.15 0-.278-.054-.387-.163-.11-.11-.163-.238-.163-.387V7.7H3.85c-.15 0-.278-.054-.387-.163-.11-.11-.163-.238-.163-.387v-3.3c0-.15.054-.278.163-.387.11-.11.238-.163.387-.163H7.7V.825c0-.15.054-.278.163-.387.11-.11.238-.163.387-.163.15 0 .278.054.387.163l4.675 4.675c.11.11.163.238.163.387z" fillRule="evenodd"/>
        </svg>
    );
};

export default Logout;
