import languageType from './languageType';
import getEnvVar from '../services/getEnvVar';

const translation: languageType = {
    'globals.empty': '<Leeg>',
    'globals.filters': 'Filters',
    'globals.results': 'Resultaten',
    'globals.yesterday': 'gisteren',
    'globals.today': 'vandaag',
    'globals.tomorrow': 'morgen',
    'globals.app_title': getEnvVar('REACT_APP_TEXT_NL_APP_TITLE'),
    'home.hero.title': getEnvVar('REACT_APP_TEXT_NL_TITLE'),
    'home.hero.content': getEnvVar('REACT_APP_TEXT_NL_LEADER_TEXT'),
    'home.hero.button': 'Zoek binnen datasets',
    'home.featured.title': 'Uitgelichte datasets',
    'home.recently_modified.title': 'Laatst aangepast',
    'home.most_popular.title': 'Populaire datasets',
    'home.own_datasets.title': 'Eigen Datasets',
    'dataset_overview.title': 'Jouw datasets',
    'details.collection.property': 'Property',
    'details.collection.density': 'Density',
    'details.collection.unknown': 'Onbekend',
    'search.placeholder': 'Type om te zoeken...',
    'search.reset': 'Reset',
    'search.search': 'Zoek',
    'search.view_dataset': 'Bekijk dataset',
    'search.view_entry': 'View entry',
    'search.more': 'Laat meer zien',
    'search.less': 'Laat minder zien',
    'search.from': 'vanaf',
    'search.to': 't/m',
    'footer.powered_by': 'Timbuctoo wordt gesponsord door',
    'footer.company_name': 'Bedrijfs naam',
    'footer.street': 'Straat',
    'footer.address': 'Adres',
    'footer.phone': 'Telefoon nummer',
    'footer.opening_hours': 'Openingstijden',
    error: 'Er is iets misgegaan.',
    'error.404': 'Pagina kon niet gevonden worden, sorry!',
    'error.500': 'Er is een interne fout opgetreden, probeer het later opnieuw.',
    network_error:
        'Er is een netwerk fout opgetreden, controleer of je verbinding hebt met het internet, of probeer het later opnieuw.'
};

export default translation;
