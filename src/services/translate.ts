import languages from '../lang';
import { store } from '../index';
import validKeys from '../lang/languageType';

export default function translate(translationKey: keyof validKeys): string {
    const languageKey = store.getState().user.language;
    const language = languages[languageKey];

    if (process.env.NODE_ENV === 'development') {
        for (const lang in languages) {
            if (!languages[lang as 'en' | 'nl'][translationKey]) {
                throw new Error(`Key '${translationKey}' is missing in ${lang}`); // should never happen because of type checker
            }
        }
        return `{{TRANSLATED ${translationKey}}}`; // make sure that hardcoded string stand out
    }
    if (!language || !language[translationKey]) {
        return '';
    } else {
        return language[translationKey];
    }
}
