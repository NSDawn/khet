import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import localeEnIN from "./locales/en-IN.json";
import localeEnUS from "./locales/en-US.json";
import localeHi from "./locales/hi.json";
import localeFr from "./locales/fr.json";
import localeEs from "./locales/es.json";
import { t, getFixedT } from 'i18next';

const locales: string[] = [
  "en-IN", "en-US", "es", "hi", "fr"
];


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-IN': { translation: localeEnIN },
      'en-US': { translation: localeEnUS },
      'es': { translation: localeEs },
      'hi': { translation: localeHi },
      'fr': { translation: localeFr },
    },
    fallbackLng: 'en-US',
    detection: {
      order: ['navigator', 'localStorage', 'cookie'], // Browser language
      caches: ['localStorage', 'cookie'], // Cache selection
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

const localesT: string[] = locales.map((s) =>  getFixedT(s)('debug.locale'));

export function getLocales(): string[] {
  return locales;
}

export function getLocalesT(): string[] {
  return localesT;
}