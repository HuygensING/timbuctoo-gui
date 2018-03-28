import languageType from './languageType';
import getEnvVar from '../services/getEnvVar';

const translation: languageType = {
    'globals.empty': '<Empty>',
    'globals.filters': 'Filters',
    'globals.results': 'Results',
    'globals.yesterday': 'yesterday',
    'globals.today': 'today',
    'globals.tomorrow': 'tomorrow',
    'globals.app_title': getEnvVar('REACT_APP_TEXT_EN_APP_TITLE'),
    'home.hero.title': getEnvVar('REACT_APP_TEXT_EN_TITLE'),
    'home.hero.content': getEnvVar('REACT_APP_TEXT_EN_LEADER_TEXT'),
    'home.hero.button': 'Search datasets',
    'home.featured.title': 'Featured datasets',
    'home.recently_modified.title': 'Recently modified',
    'home.most_popular.title': 'Most Popular',
    'home.own_datasets.title': 'Own Datasets',
    'details.collection.property': 'Property',
    'details.collection.density': 'Density',
    'details.collection.unknown': 'Unknown',
    'dataset_overview.title': 'Your datasets',
    'search.placeholder': 'Type to search...',
    'search.reset': 'Reset',
    'search.search': 'Search',
    'search.view_dataset': 'View dataset',
    'search.view_entry': 'View entry',
    'search.more': 'Show more',
    'search.less': 'Show less',
    'search.from': 'from',
    'search.to': 'to',
    'footer.powered_by': 'Timbuctoo is powered by',
    'footer.company_name': 'Company name',
    'footer.street': 'Street',
    'footer.address': 'Address',
    'footer.phone': 'Phone Number',
    'footer.opening_hours': 'Opening hours',
    'upload.heading': 'Drag and drop files here to upload raw data',
    'upload.body': 'Supported formats:',
    'upload.rejected': 'Invalid file format',
    error: 'Something went wrong.',
    'error.404': "Couldn't find your page, sorry!",
    'error.500': 'A internal server error has occurred, try again later.',
    network_error:
        'A network error occurred. Your network connection might not be available, or the server is offline. Try again later.'
};

export default translation;
