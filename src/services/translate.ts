import Languages from '../lang';
import { store } from '../index';

const DEFAULT_LANGUAGE_KEY = 'en';

export default (translationKey: string) => {
    const languageKey = store.getState().user.language;
    const language = Languages[languageKey];
    const defaultLanguage = Languages[DEFAULT_LANGUAGE_KEY];

    return language[languageKey] || defaultLanguage[languageKey] || languageKey;
};