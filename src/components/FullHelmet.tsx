import React from 'react';
import { Helmet } from 'react-helmet';

interface FullHelmetProps {
    pageName: string;
    description?: string;
    canonical?: string;
}

const FullHelmet = ({ pageName, description, canonical }: FullHelmetProps) => (
    <Helmet>
        <title>Timbuctoo || {pageName}</title>
        {description && <meta name="description" content={description} />}
        {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
);

export default FullHelmet;