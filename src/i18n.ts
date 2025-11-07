import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './locales/pl/common.json';

const resources = {
  pl: {
    translation: pl,
  },
};

await i18n.use(initReactI18next).init({
  resources,
  lng: 'pl', // default language
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
