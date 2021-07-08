import React from "react";
import * as RNLocalize from "react-native-localize";
 // Use for caching/memoize for better performance

import {
  I18nManager,
} from "react-native";
import i18n from "i18n-js";
import { memoize } from "lodash";

class Trans {
   translationGetters = {
    // lazy requires (metro bundler does not support symlinks
    en: () => require("./en.json"),
    ar: () => require("./ar.json")
  };
  
  translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
 );
  
 setI18nConfig = (langCode) => {
    // fallback if no available language fits
    const fallback = { languageTag: langCode, isRTL: false };
  
    // const { languageTag, isRTL } =
    //   RNLocalize.findBestAvailableLanguage(Object.keys(this.translationGetters)) ||
    //   fallback;

    const { languageTag, isRTL } = fallback;
  
    // clear translation cache
    this.translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    
    i18n.translations = { [languageTag]: this.translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };
};
const t = new Trans();
export default t;
