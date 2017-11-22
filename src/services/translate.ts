import Languages from '../lang';
import { store } from '../index';

const DEFAULT_LANGUAGE_KEY = 'en';

export default (translationKey: string): string => {
    const languageKey = store.getState().user.language;
    const language = Languages[languageKey];
    const defaultLanguage = Languages[DEFAULT_LANGUAGE_KEY];
    
    if (language && !(translationKey in language) && process.env.NODE_ENV === 'development') {
        console.error(`Translation key '${translationKey}' does not exist in language '${languageKey}'!`);
    }

    return (language && language[translationKey]) || defaultLanguage[translationKey] || null;
};