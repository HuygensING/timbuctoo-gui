import Languages from '../lang';

class Translations {

    private defaultLanguage: string = 'en';
    private language: string = this.defaultLanguage;

    setLanguage( lang: string ) {
        this.language = lang;
    }

    translate( translationKey: string, keySplit: string = '.' ) {
        const keys = translationKey.split(keySplit);
        const Language = Languages[this.language];
        return this.getTranslation(keys, Language);
    }

    private getTranslation( keys: string[], language: string ): string {
        let translation = language;
        let defaultTranslation = Languages[this.defaultLanguage];
        keys.map(key => {
            if (translation) {
                translation = translation[key] || null;
            }
            if (defaultTranslation) {
                defaultTranslation = defaultTranslation [key] || null;
            }
        });
        return translation || defaultTranslation;
    }
}

const translations = new Translations();

export default translations;