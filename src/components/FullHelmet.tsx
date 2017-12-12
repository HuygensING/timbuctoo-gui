import React from 'react';
import { Helmet } from 'react-helmet';
import translate from '../services/translate';
interface FullHelmetProps {
    pageName: string;
    description?: string;
    canonical?: string;
}

const FullHelmet = ({ pageName, description, canonical }: FullHelmetProps) => (
    <Helmet>
        <title>
            {pageName} ≫ {translate('globals.app_title')}
        </title>
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
);

export default FullHelmet;
