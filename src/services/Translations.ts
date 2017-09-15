import Languages from '../lang';

class Translations {

    private language: string = 'en';

    setLanguage( lang: string ) {
        this.language = lang;
    }

    translate( translationKey: string, keySplit: string = '.' ) {
        const keys = translationKey.split(keySplit);
        const Language = Languages[this.language];
        let translation = Language;
        keys.map(key => translation = translation[key] || `${Language.errors.invalid_key.replace('{var}', key)}`);
        return translation;
    }
}

const translations = new Translations();

export default translations;