
window.CONST = {
    ENV: CURRENT_ENV,
    IS_CORDOVA_APP: window.cordova ? true : false,

    CURRENT_PLATFORM: 'site',
    PLATFORM_WINDOWS: 'win',
    PLATFORM_ANDROID: 'android',
    PLATFORM_IOS: 'ios',
    PLATFORM_SITE: 'site',

    STATIC_IMAGE_URL: 'build/img/',
    STATIC_CSS_URL: 'build/css/',
    STATIC_JS_URL: 'build/js/',
    CSS_APP_BUNDLE: 'bundle.app.css',
    JS_APP_BUNDLE: 'bundle.app.js?tm=' + Date.now() + '',
    GA_ID: {},
    //AD_PERIOD_INTERSTITIAL: 300,

    CURRENT_LANGUAGE: 'en',
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
            'slide.instructions': 'До открытия осталось пройти #{count} уров((ень|ня|ней)) в предыдущем комплекте.',
            'slide.buy': 'Купить за 0,99$',
            'slide.complete': 'Пройден',
            'slide.complete.message': 'Этот уровень уже был пройден',
            'slide.soon': 'СКОРО',

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
            'shop.free-coins': 'Монеты бесплатно',
            'shop.watch-video': 'Посмотреть видео',
            'shop.share': 'Рассказать про игру',
            'shop.buy-coins': 'Покупка монет',

            //RANKINGS PAGE
            'rankings.heading': 'Рейтинг друзей',
            'rankings.levels-complete': 'Пройдено уровней',
            'rankings.invite-friends.get-coin': 'Приглашай друзей и получай монеты!',
            'rankings.invite-friends': 'Пригласить друзей',

            //LEARN PAGE
            'app.page.learn.aim-of-the-game': 'Для того чтобы пройти уровень, нужно отгадывать все загаданные слова на поле.',
            'app.page.learn.how-to-play': 'Для отгадывания слов нужно провести пальцем с первой буквы слова к последней в правильном порядке.',
            'app.page.learn.start': 'Начать',

            //RATE DIALOG
            'app.dialog.rateus.title': 'Понравилась игра?',
            'app.dialog.rateus.description': 'Оставте отзыв. Спасибо за Вашу оценку!',
            'app.dialog.rateus.button.rate': 'Оставить отзыв',
            'app.dialog.rateus.button.later': 'Напомнить позже',
            'app.dialog.rateus.button.never': 'Не показывать больше',

            //NO-COINS DIALOG
            'app.dialog.nocoins.title': 'Недостаточно монет',
            'app.dialog.nocoins.description': 'У вас не хватает монет, вы можете купить монеты или получить их бесплатно.',
            'app.dialog.nocoins.button.buy': 'Купить',
            'app.dialog.nocoins.button.earn': 'Получить бесплатно',
            'app.dialog.nocoins.button.cancel': 'Отмена',

            //ERROR DIALOG
            'app.dialog.error.title': 'Ошибка',
            'app.dialog.error.description': 'Произошел сбой.',
            'app.dialog.error.button.cancel': 'ОК',

            //REQUIRE-PUSH DIALOG
            'app.dialog.requirepush.title': 'Уведомления',
            'app.dialog.requirepush.description': 'Хотите знать когда придут бонусы? Подключайте уведомления.',
            'app.dialog.requirepush.button.ok': 'Разрешить',
            'app.dialog.requirepush.button.cancel': 'Не сейчас',

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
            'slide.instructions': 'Сomplete #{count} more roun((d|ds|ds)) in the previous set to unlock.',
            'slide.buy': 'Unlock for 0,99$',
            'slide.complete': 'Complete',
            'slide.complete.message': 'This level has already been completed',
            'slide.soon': 'SOON',

            'button.settings': 'Settings',
            'button.rating': 'Rankings',
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
            'notice.selectDifferently.after': 'another way',
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
            'shop.free-coins': 'Free Coins',
            'shop.watch-video': 'Watch a video',
            'shop.share': 'Share with friends',
            'shop.buy-coins': 'Buy coins',

            //RANKINGS PAGE
            'rankings.heading': 'Friends rankings',
            'rankings.levels-complete': 'Levels complete',
            'rankings.invite-friends.get-coin': 'Invite friends and get coins!',
            'rankings.invite-friends': 'Invite friends',

            //LEARN PAGE
            'app.page.learn.aim-of-the-game': 'In order to complete a level, you need to find all the hidden words on the board.',
            'app.page.learn.how-to-play': 'To guess words you need to move your finger from the first letter, of the word, to the last in the correct order.',
            'app.page.learn.start': 'Start',

            //RATE DIALOG
            'app.dialog.rateus.title': 'Like the game?',
            'app.dialog.rateus.description': 'Write a review. Thanks for rating!',
            'app.dialog.rateus.button.rate': 'Write a review',
            'app.dialog.rateus.button.later': 'Ask later',
            'app.dialog.rateus.button.never': 'Do not ask again',

            //NO-COINS DIALOG
            'app.dialog.nocoins.title': 'Not enough coins',
            'app.dialog.nocoins.description': 'You do not have enough coins, you may buy some or get them for free.',
            'app.dialog.nocoins.button.buy': 'Purchase',
            'app.dialog.nocoins.button.earn': 'Get for free',
            'app.dialog.nocoins.button.cancel': 'Cancel',

            //ERROR DIALOG
            'app.dialog.error.title': 'Error',
            'app.dialog.error.description': 'Something went wrong.',
            'app.dialog.error.button.cancel': 'OK',

            //REQUIRE-PUSH DIALOG
            'app.dialog.requirepush.title': 'Notifications',
            'app.dialog.requirepush.description': 'Want to know when you\'ve received a bonus? Allow notifications.',
            'app.dialog.requirepush.button.ok': 'Allow',
            'app.dialog.requirepush.button.cancel': 'Not now',

            t: ''
        }
    },
    LANG_ID: {
        ru: 1,
        en: 2
    }

}
CONST.GA_ID[CONST.PLATFORM_IOS] = '';
CONST.GA_ID[CONST.PLATFORM_ANDROID] = '';
CONST.GA_ID[CONST.PLATFORM_WINDOWS] = '';
CONST.GA_ID[CONST.PLATFORM_SITE] = '';

if(!CONST.IS_CORDOVA_APP){
    CONST.STATIC_IMAGE_URL = '/'+CONST.STATIC_IMAGE_URL;
    CONST.STATIC_CSS_URL = '/'+CONST.STATIC_CSS_URL;
    CONST.STATIC_JS_URL = '/'+CONST.STATIC_JS_URL;
}

var ENV_SETTINGS = {};
ENV_SETTINGS[ENV_LOCAL] = {
    BASE_URL: 'http://words.game',
    API_URL: 'http://api.words.game'
}
ENV_SETTINGS[ENV_ALEK] = {
    BASE_URL: 'http://vitaliy.findwords.smalldev',
    API_URL: 'http://api.vitaliy.findwords.smalldev'
}
ENV_SETTINGS[ENV_PRODUCTION] = {
    BASE_URL: 'http://vitaliy.findwords.smalldev.alek.in.ua',
    API_URL: 'http://api.vitaliy.findwords.smalldev.alek.in.ua'
}

if(ENV_SETTINGS.hasOwnProperty(CURRENT_ENV)){
    for(var k in ENV_SETTINGS[CURRENT_ENV]){
        if(!ENV_SETTINGS[CURRENT_ENV].hasOwnProperty(k)){ continue; }
        CONST[k] = ENV_SETTINGS[CURRENT_ENV][k];
    }
}