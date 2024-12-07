import i18n, { reloadResources } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
// import translation files
import enTrans from './assets/locale/en/en_translation.json';
import arTrans from './assets/locale/ar/ar_translation.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: enTrans
    },
    ar: {
        translation: arTrans
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
        resources,
        // lng: "ar", // if you're using a language detector, do not define the lng option
        fallbackLng: "ar", //Default language
        detection: {
            // order and from where user language should be detected
            order: ['cookie', 'localStorage', 'htmlTag', 'sessionStorage', 'navigator', 'path', 'subdomain'],
            caches: ['cookie'],
        }
    });

// Add an event listener for language change
i18n.on('languageChanged', () => {
    window.location.reload(); // Reload the page on language change
});

export default i18n;