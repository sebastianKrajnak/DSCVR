import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
      "typeHere": "Type here...",
      "newEntry": "New entry succesfully created.",
      "admin": "Awaiting admin approval..."
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
      "typeHere": "Píšte sem...",
      "newEntry": "Nový záznam úspešne vytvorený.",
      "admin": "Čaká na schválenie adminsitrátorom..."
    }
  }
};

export const changeLang = async lang => {
  i18n.changeLanguage(lang);
  AsyncStorage.setItem('language', lang);
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;