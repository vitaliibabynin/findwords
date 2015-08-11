
window.CONST = {
    ENV: 'local',
    IS_CORDOVA_APP: false,

    CURRENT_PLATFORM: 'site',
    PLATFORM_WINDOWS8: 'win8',
    PLATFORM_ANDROID: 'android',
    PLATFORM_IOS: 'ios',
    PLATFORM_SITE: 'site',

    BASE_URL: 'http://manvswoman.game',
    API_URL: 'http://api.manvswoman.game',
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
            'button.fb': 'кнопка FBButton',
            'switch.ad':'Реклама',
            t: ''
        },
        en: {
            'loadingscreen.message.pleasewait': 'Please wait...',
            'loadingscreen.errorloading.message': 'An error has occurred loading this game. Please check your internet connection and try again.',
            'loadingscreen.errorloading.button.reload': 'Try again',
            'button.fb': 'button FBButton',
            'switch.ad':'Ads',
            t: ''
        }
    },
    LANG_ID: {
        ru: 1,
        en: 2
    }

}