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
    JS_APP_BUNDLE: 'bundle.app.js?tm=' + Date.now() + '',
    GCM_SENDER_ID: '',
    GA_ID: '',
    AD_PERIOD_INTERSTITIAL: 300,
    //Production
    //FB_APP_ID: '473524332833935',
    //Developmet
    FB_APP_ID: '473533802832988',
    //FB_APP_ID: '',


    CURRENT_LANGUAGE: 'ru',
    LANGUAGE_RU: 'ru',
    LANGUAGE_EN: 'en',
    LANG_STRINGS: {
        ru: {
            //LOADING SCREEN
            'loadingscreen.message.pleasewait': 'Пожалуйста, подождите...',
            'loadingscreen.errorloading.message': 'Произошла ошибка во время загрузки приложения. Пожалуйста, проверьте подключение к интернету и повторите загрузку',
            'loadingscreen.errorloading.button.reload': 'Повторить загрузку',

            //MAIN PAGE
            'language.ru': 'Русский',
            'language.en': 'English',
            'button.fb': 'кнопка FBButton',
            'switch.ad': 'Реклама',
            'slide.score': 'Счет',
            'slide.instructions': 'Этот комплект уровней откроется, когда вы пройдете все предыдущие.',
            'slide.buy': 'Купить за 0,99$',
            'slide.complete': 'Пройден',
            'slide.complete.message': 'Этот уровень уже был пройден',

            'button.settings': 'Настройки',
            'button.rating': 'Рейтинг',
            'button.facebook.enter': 'Войти',
            'button.facebook.exit': 'Выйти',
            'button.shop': 'Магазин',
            'button.languages': 'Языки',
            'button.music': 'Музыка',
            'button.sound': 'Звук',

            //GAME PAGE
            'chip.open-word': 'Открыть слово',
            'chip.open-letter': 'Открыть букву',
            'chip.show-word': 'Показать слово',

            'notice.selectDifferently.before': 'Попробуйте собрать слово',
            'notice.selectDifferently.after': 'по-другому',
            'notice.noSuchWord.before': 'Слово',
            'notice.noSuchWord.after': 'мы не загадывали',
            'notice.noWordsToShow': 'Больше нету слов, чтобы показать',

            //GAME PAGE VICTORY
            'victory.excellent': 'Отлично!',
            'victory.yourReward': 'Ваша награда:',
            'victory.continue': 'Продолжить',

            //BONUS PAGE
            'bonus.heading': 'Бонусы',
            'bonus.day': 'день',
            'bonus.day1': 'Хороший старт!',
            'bonus.day2': 'Уверенно идете!',
            'bonus.day3': 'Неутомимый!',
            'bonus.day4': 'Вы прошли больше половины пути!',
            'bonus.day5': 'Нету времени отдыхать!',
            'bonus.day6': 'На финешной прямой!',
            'bonus.day7': 'Вы сделали невозможное!',
            'bonus.day7.1': 'Так держать!',
            'bonus.day7.2': 'Напрягитесь, осталось совсем немного!',
            'bonus.day7.3': 'Вы не перестаете удивлять!',
            'bonus.day7.4': 'Вами все восхищаются!',
            'bonus.day7.5': 'Вы Рэмбо!',
            'bonus.day7.6': 'Круче вас только яйца!',
            'bonus.day7.7': 'Не останавливайтесь на достигнутом!',
            'bonus.day7.8': 'Вы выиграли в лотерею!',
            'bonus.day7.9': 'Вы работаете как волк!',
            'bonus.day7.10': 'Покажите на что вы способны!',
            'bonus.day7.11': 'Упорство и труд все перетрут!',
            'bonus.day7.12': 'Я не верю своим глазам!',
            'bonus.day7.13': 'Постоянство признак мастерства!',
            'bonus.day7.14': 'Вы самый лучший!',
            'bonus.collect': 'Получить',

            //SHOP PAGE
            'shop.heading': 'Магазин',
            'shop.free-coins': 'Бесплатные монеты',


            t: ''
        },
        en: {
            //LOADING SCREEN
            'loadingscreen.message.pleasewait': 'Please wait...',
            'loadingscreen.errorloading.message': 'An error has occurred loading this game. Please check your internet connection and try again.',
            'loadingscreen.errorloading.button.reload': 'Try again',

            //MAIN PAGE
            'language.ru': 'Русский',
            'language.en': 'English',
            'button.fb': 'button FBButton',
            'switch.ad': 'Advertising',
            'slide.score': 'Score',
            'slide.instructions': 'This set will unlock, once you complete all previous sets',
            'slide.buy': 'Unlock for 0,99$',
            'slide.complete': 'Complete',
            'slide.complete.message': 'This level has already been completed',

            'button.settings': 'Settings',
            'button.rating': 'Rating',
            'button.facebook.enter': 'Enter',
            'button.facebook.exit': 'Exit',
            'button.shop': 'Shop',
            'button.languages': 'Language',
            'button.music': 'Music',
            'button.sound': 'Sound',

            //GAME PAGE
            'chip.open-word': 'Open word',
            'chip.open-letter': 'Open letter',
            'chip.show-word': 'Show word',

            'notice.selectDifferently.before': 'Try compiling the word',
            'notice.selectDifferently.after': 'in a different way',
            'notice.noSuchWord.before': 'The word',
            'notice.noSuchWord.after': 'is not in the riddle',
            'notice.noWordsToShow': 'No more words to show',

            //GAME PAGE VICTORY
            'victory.excellent': 'Excellent!',
            'victory.yourReward': 'Your reward:',
            'victory.continue': 'Continue',

            //BONUS PAGE
            'bonus.heading': 'Bonuses',
            'bonus.day': 'day',
            'bonus.day1': 'Good start!',
            'bonus.day2': 'Solid progress!',
            'bonus.day3': 'Tireless!',
            'bonus.day4': 'You\'ve passed the half way point!',
            'bonus.day5': 'No time to rest!',
            'bonus.day6': 'Home stretch!',
            'bonus.day7': 'You did the impossible!',
            'bonus.day7.1': 'Keep it up!',
            'bonus.day7.2': 'Come on, only a little bit left!',
            'bonus.day7.3': 'You never cease to amaze!',
            'bonus.day7.4': 'Everyone admires you!',
            'bonus.day7.5': 'You are Rambo!',
            'bonus.day7.6': 'Nobody is cooler than you!',
            'bonus.day7.7': 'Don\'t stop!',
            'bonus.day7.8': 'You won the lottery!',
            'bonus.day7.9': 'You work like a wolf!',
            'bonus.day7.10': 'Show us what you can do!',
            'bonus.day7.11': 'Perseverance and hard word solve everything!',
            'bonus.day7.12': 'I do not believe what I am seeing!',
            'bonus.day7.13': 'Consistency is a sign of mastery!',
            'bonus.day7.14': 'You are the best!',
            'bonus.collect': 'Collect',

            //SHOP PAGE
            'shop.heading': 'Shop',
            'shop.free-coins': 'Free Coins',

            t: ''
        }
    },
    LANG_ID: {
        ru: 1,
        en: 2
    }

}