import React from 'react';
import { Helmet } from 'react-helmet';

interface IFullHelmetProps {
    pageName: string,
    description?: string,
    canonical?: string
}

export default ({pageName, description, canonical}: IFullHelmetProps) => (
    <Helmet>
        <title>Timbuctoo || {pageName}</title>
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
);