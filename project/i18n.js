import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  en: {
    translation: {
      "search": "Search...",
      "name": "Name:",
      "architect": "Architect:",
      "address": "Address:",
      "func": "Function:",
      "realization": "Realization:",
      "about": "About:",
      "language": "Choose app language",
      "favlist": "Favourites list",
      "typeHere": "Type here..."
    }
  },
  sk: {
    translation: {
      "search": "Vyhľadávanie...",
      "name": "Názov:",
      "architect": "Architekt:",
      "address": "Adresa:",
      "func": "Funkcia:",
      "realization": "Realizácia:",
      "about": "O budove:",
      "language": "Vybrať jazyk aplikácie",
      "favlist": "Zoznam obľúbených",
      "typeHere": "Píš tu..."
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;