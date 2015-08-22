
window.CONST = {
    ENV: 'local',
    IS_CORDOVA_APP: false,

    CURRENT_PLATFORM: 'site',
    PLATFORM_WINDOWS8: 'win8',
    PLATFORM_ANDROID: 'android',
    PLATFORM_IOS: 'ios',
    PLATFORM_SITE: 'site',

    BASE_URL: 'http://words.game',
    API_URL: 'http://api.words.game',
    STATIC_IMAGE_URL: '/build/img/',
    STATIC_CSS_URL: '/build/css/',
    STATIC_JS_URL: '/build/js/',
    CSS_APP_BUNDLE: 'bundle.app.css',
    JS_APP_BUNDLE: 'bundle.app.js?tm='+Date.now()+'',
    GCM_SENDER_ID: '',
    GA_ID: '',
    AD_PERIOD_INTERSTITIAL: 300,
    FB_APP_ID: '',


    CURRENT_LANGUAGE: 'ru',
    LANGUAGE_RU: 'ru',
    LANGUAGE_EN: 'en',
    LANG_STRINGS: {
        ru: {
            'loadingscreen.message.pleasewait': 'Пожалуйста, подождите...',
            'loadingscreen.errorloading.message': 'Произошла ошибка во время загрузки приложения. Пожалуйста, проверьте подключение к интернету и повторите загрузку',
            'loadingscreen.errorloading.button.reload': 'Повторить загрузку',
            'language.ru': 'Русский',
            'language.en': 'English',
            'button.fb': 'кнопка FBButton',
            'switch.ad':'Реклама',
            'slide.set':'Комплект',
            'playerName':'Гаврюша',
            'slide.score':'Счет',
            'button.settings': 'Настройки',
            'button.rating': 'Рейтинг',
            'button.facebook.enter': 'Войти',
            'button.facebook.exit': 'Выйти',
            'button.shop': 'Магазин',
            'button.languages': 'Языки',
            'button.music': 'Музыка',
            'button.sound': 'Звук',
            t: ''
        },
        en: {
            'loadingscreen.message.pleasewait': 'Please wait...',
            'loadingscreen.errorloading.message': 'An error has occurred loading this game. Please check your internet connection and try again.',
            'loadingscreen.errorloading.button.reload': 'Try again',
            'language.ru': 'Русский',
            'language.en': 'English',
            'button.fb': 'button FBButton',
            'switch.ad':'Adverts',
            'slide.set':'Set',
            'playerName':'Gavryusha',
            'slide.score':'Score',
            'button.settings': 'Settings',
            'button.rating': 'Rating',
            'button.facebook.enter': 'Enter',
            'button.facebook.exit': 'Exit',
            'button.shop': 'Shop',
            'button.languages': 'Language',
            'button.music': 'Music',
            'button.sound': 'Sound',
            t: ''
        }
    },
    LANG_ID: {
        ru: 1,
        en: 2
    }

}