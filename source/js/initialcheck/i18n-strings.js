var BabelFish = require('babelfish');
var i18n = new BabelFish(CONST.CURRENT_LANGUAGE);

for(var lang in CONST.LANG_STRINGS){
    if(!CONST.LANG_STRINGS.hasOwnProperty(lang)){
        continue;
    }

    for(var stringId in CONST.LANG_STRINGS[lang]){
        if(!CONST.LANG_STRINGS[lang].hasOwnProperty(stringId)){
            continue;
        }

        i18n.addPhrase(lang, stringId, CONST.LANG_STRINGS[lang][stringId]);
    }
}

i18n._ = function(phrase, params, locale){
    locale = locale || i18n._defaultLocale;
    return this.translate(locale, phrase, params);
}

i18n.setDefaultLocale = function(defaultLocale){
    i18n._defaultLocale = defaultLocale;
}

module.exports = i18n;