window.CONST = {
    ENV: CURRENT_ENV,
    IS_CORDOVA_APP: window.cordova ? true : false,

    GAME_TYPE: 'findwords',

    CURRENT_PLATFORM: 'site',
    PLATFORM_WINDOWS: 'win',
    PLATFORM_ANDROID: 'android',
    PLATFORM_IOS: 'ios',
    PLATFORM_SITE: 'site',

    STATIC_IMAGE_URL: 'build/img/',
    STATIC_CSS_URL: 'build/css/',
    STATIC_JS_URL: 'build/js/',
    STATIC_MUSIC_URL: 'build/music/',
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
            'slide.trythisgame.play': 'Играть',
            'gamecomplete': 'Игра пройдена, ждите обновление!',

            'button.settings': 'Настройки',
            'button.rating': 'Рейтинг',
            'button.facebook.enter': 'Войти',
            'button.facebook.exit': 'Выйти',
            'button.shop': 'Магазин',
            'button.languages': 'Языки',
            'button.timer': 'Таймер',
            'button.music': 'Музыка',
            'button.sound': 'Звук',

            //GAME PAGE
            'chip.openword': 'Открыть слово',
            'chip.openletter': 'Открыть букву',
            'chip.showword': 'Показать слово',

            'notice.selectdifferently.before': 'Попробуйте собрать слово',
            'notice.selectdifferently.after': 'по-другому',
            'notice.nosuchword.before': 'Слово',
            'notice.nosuchword.after': 'мы не загадывали',
            'notice.nowordstoshow': 'Больше нет слов, чтобы показать',

            //GAME PAGE VICTORY
            'victory.excellent': 'Отлично!',
            'victory.yourreward': 'Ваша награда:',
            'victory.continue': 'Продолжить',

            //BONUS PAGE
            'bonus.heading': 'Бонусы',
            'bonus.day': 'день',
            'bonus.day1': 'Хороший старт!',
            'bonus.day2': 'Уверенно идете!',
            'bonus.day3': 'Неутомимый!',
            'bonus.day4': 'Вы прошли больше половины пути!',
            'bonus.day5': 'Нет времени отдыхать!',
            'bonus.day6': 'На финишной прямой!',
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
            'bonus.day7.13': 'Постоянство - признак мастерства!',
            'bonus.day7.14': 'Вы самый лучший!',
            'bonus.collect': 'Получить',

            //SHOP PAGE
            'shop.freecoins': 'Монеты бесплатно',
            'shop.watchvideo': 'Посмотреть видео',
            'shop.invitefriends': 'Пригласить друзей',
            'shop.share': 'Рассказать про игру',
            'shop.buycoins': 'Покупка монет',
            'shop.button.restore': 'Восстановить покупки',

            //RANKINGS PAGE
            'rankings.heading': 'Рейтинг друзей',
            'rankings.levelscomplete': 'Пройдено уровней',
            'rankings.invitefriends.getcoins': 'Приглашай друзей и получай монеты!',
            'rankings.invitefriends': 'Пригласить друзей',
            'rankings.login.description': 'Войдите, пожалуйста, в ваш аккаунт Facebook для того, чтобы узнать рейтинг друзей и поделиться своими достижениями.',
            'rankings.login.button': 'Войти в Facebook',

            //LEARN PAGE
            'app.page.learn.aimofthegame': 'Для того, чтобы пройти уровень, нужно отгадать все загаданные слова на поле.',
            'app.page.learn.howtoplay': 'Для отгадывания слов нужно провести пальцем от первой буквы слова к последней в правильном порядке.',
            'app.page.learn.start': 'Начать',

            //RATE DIALOG
            'app.dialog.rateus.title': 'Понравилась игра?',
            'app.dialog.rateus.description': 'Оставьте отзыв. Спасибо за вашу оценку!',
            'app.dialog.rateus.button.rate': 'Оставить отзыв',
            'app.dialog.rateus.button.later': 'Напомнить позже',
            'app.dialog.rateus.button.never': 'Не показывать больше',

            //NO-COINS DIALOG
            'app.dialog.nocoins.title': 'Недостаточно монет',
            'app.dialog.nocoins.description': 'У вас не хватает монет. Вы можете купить монеты или получить их бесплатно.',
            'app.dialog.nocoins.button.buy': 'Купить',
            'app.dialog.nocoins.button.earn': 'Получить бесплатно',
            'app.dialog.nocoins.button.cancel': 'Отмена',

            //TURN-OFF-ADS DIALOG
            'app.dialog.turnoffads.title': 'Выключить рекламу',
            'app.dialog.turnoffads.description': 'Навсегда убрать рекламу из приложения за',
            'app.dialog.turnoffads.button.turnoff': 'Выключить',
            'app.dialog.turnoffads.button.cancel': 'Отмена',

            //INFO DIALOG
            'app.dialog.info.button.cancel': "OK",

            //ADD-COINS DIALOG
            'app.dialog.info.addcoins.title': 'Монеты добавлены',
            'app.dialog.info.addcoins.description': '#{count} моне((та|ты|т)) добавлено.',

            //REMOVE-ADS DIALOG
            'app.dialog.info.removead.title': 'Отключение рекламы',
            'app.dialog.info.removead.description': 'Реклама была отключена. Желаем приятной игры.',

            //UNLOCK-ROUNDSBUNDLE DIALOG
            'app.dialog.info.unlockroundsbundle.title': 'Открытие комплекта',
            'app.dialog.info.unlockroundsbundle.description': 'Комплект №#{count} открыт.',

            //ERROR DIALOG
            'app.dialog.error.title': 'Ошибка',
            'app.dialog.error.description': 'Произошел сбой.',

            //REQUIRE-PUSH DIALOG
            'app.dialog.requirepush.title': 'Уведомления',
            'app.dialog.requirepush.description': 'Хотите знать, когда придут бонусы? Подключайте уведомления.',
            'app.dialog.requirepush.button.ok': 'Разрешить',
            'app.dialog.requirepush.button.cancel': 'Не сейчас',

            //WATCH VIDEO DIALOG
            'app.dialog.info.rewardedvideo.notfound.title': 'Видео не найдено',
            'app.dialog.info.rewardedvideo.notfound.description': 'На данный момент нет видео для просмотра. Пожалуйста, попробуйте немного позже.',

            //FACEBOOK INVITE DIALOG
            'app.dialog.invitefriends.title': 'Пригласить друзей в Facebook',
            //'app.dialog.invitefriends.description.invite': 'За каждого приглашенного друга вы получите #{count} моне((та|ты|т)).',
            'app.dialog.invitefriends.description.accept': 'Вы получите #{count} моне((та|ты|т)) за каждого друга, который примет ваше приглашение и присоединится к игре ',
            'app.dialog.invitefriends.button.invite': 'Пригласить друзей',
            'app.dialog.invitefriends.button.cancel': 'Отмена',

            //FACEBOOK INVITE WINDOW
            'app.invite.title': 'Выберите друзей',
            //'app.invite.message': 'Привет, я играю в интересную игру "Филворды: найди слово"! Присоединяйся, будем играть вместе!',

            //FACEBOOK FRIENDS JOINED DIALOG
            'app.dialog.info.friendsjoined.title': 'Монеты добавлены',
            'app.dialog.info.friendsjoined.description.friends': '#{count} дру((г|га|зей)) приня((л|ли|ли)) ваше приглашение.',
            'app.dialog.info.friendsjoined.description.coins': '#{count} моне((та|ты|т)) добавлено.',

            //FACEBOOK SHARE
            'share.caption': 'Филворды',
            'share.description': 'Увлекательная игра "Филворды: найди слово". Присоединяйся, вместе веселее!',

            //FOR STARTAD
            'startad.recommendapp': 'Рекомендуем приложение',

            //NOTIFICATIONS
            'notification.weekly.notify.title': 'Бонусы',
            'notification.weekly.notify.description': 'Ты давно не заходил в игру, мы начислили бонусы, зайди и проверь!',

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
            'slide.trythisgame.play': 'Play',
            'gamecomplete': 'Game complete, wait for more content!',

            'button.settings': 'Settings',
            'button.rating': 'Rankings',
            'button.facebook.enter': 'Enter',
            'button.facebook.exit': 'Exit',
            'button.shop': 'Shop',
            'button.languages': 'Language',
            'button.timer': 'Timer',
            'button.music': 'Music',
            'button.sound': 'Sound',

            //GAME PAGE
            'chip.openword': 'Open word',
            'chip.openletter': 'Open letter',
            'chip.showword': 'Show word',

            'notice.selectdifferently.before': 'Try compiling the word',
            'notice.selectdifferently.after': 'another way',
            'notice.nosuchword.before': 'The word',
            'notice.nosuchword.after': 'is not in the riddle',
            'notice.nowordstoshow': 'No more words to show',

            //GAME PAGE VICTORY
            'victory.excellent': 'Excellent!',
            'victory.yourreward': 'Your reward:',
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
            'shop.freecoins': 'Free Coins',
            'shop.watchvideo': 'Watch a video',
            'shop.invitefriends': 'Invite friends',
            'shop.share': 'Share with friends',
            'shop.buycoins': 'Buy coins',
            'shop.button.restore': 'Restore purchases',

            //RANKINGS PAGE
            'rankings.heading': 'Friends rankings',
            'rankings.levelscomplete': 'Levels complete',
            'rankings.invitefriends.getcoins': 'Invite friends and get coins!',
            'rankings.invitefriends': 'Invite friends',
            'rankings.login.description': 'Please login to Facebook, to see your friends\' rankings and share your achievements.',
            'rankings.login.button': 'Login to Facebook',

            //LEARN PAGE
            'app.page.learn.aimofthegame': 'In order to complete a level, you need to find all the hidden words on the board.',
            'app.page.learn.howtoplay': 'To guess a word you need to swipe your finger from the first letter to the last, in the correct order.',
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

            //TURN-OFF-ADS DIALOG
            'app.dialog.turnoffads.title': 'Turn off advertisement',
            'app.dialog.turnoffads.description': 'Permenantely remove ads from the app for',
            'app.dialog.turnoffads.button.turnoff': 'Turn Off',
            'app.dialog.turnoffads.button.cancel': 'Cancel',

            //INFO DIALOG
            'app.dialog.info.button.cancel': "OK",

            //ADD-COINS DIALOG
            'app.dialog.info.addcoins.title': 'Coins added',
            'app.dialog.info.addcoins.description': '#{count} coi((n|ns|ns)) added.',

            //REMOVE-ADS DIALOG
            'app.dialog.info.removead.title': 'Remove ads',
            'app.dialog.info.removead.description': 'Ads were turned off. Enjoy your game.',

            //UNLOCK-ROUNDSBUNDLE DIALOG
            'app.dialog.info.unlockroundsbundle.title': 'Set unlock',
            'app.dialog.info.unlockroundsbundle.description': 'Set ##{count} unlocked.',

            //ERROR DIALOG
            'app.dialog.error.title': 'Error',
            'app.dialog.error.description': 'Something went wrong.',

            //REQUIRE-PUSH DIALOG
            'app.dialog.requirepush.title': 'Notifications',
            'app.dialog.requirepush.description': 'Want to know when you\'ve received a bonus? Allow notifications.',
            'app.dialog.requirepush.button.ok': 'Allow',
            'app.dialog.requirepush.button.cancel': 'Not now',

            //WATCH VIDEO DIALOG
            'app.dialog.info.rewardedvideo.notfound.title': 'Video not found',
            'app.dialog.info.rewardedvideo.notfound.description': 'There aren\'t any videos to watch at the moment. Please try again later.',

            //FACEBOOK INVITE DIALOG
            'app.dialog.invitefriends.title': 'Invite friends on Facebook',
            //'app.dialog.invitefriends.description.invite': 'You will receive #{count} coi((n|ns|ns)) per friend invited.',
            'app.dialog.invitefriends.description.accept': 'You will receive #{count} coi((n|ns|ns)) for every friend that accepts your invitation and joins the game.',
            'app.dialog.invitefriends.button.invite': 'Invite friends',
            'app.dialog.invitefriends.button.cancel': 'Cancel',

            //FACEBOOK INVITE WINDOW
            'app.invite.title': 'Select friends',
            //'app.invite.message': 'Hello, I am playing an interesting game called "findwords"! Join, and let\'s play together!',

            //FACEBOOK FRIENDS JOINED DIALOG
            'app.dialog.info.friendsjoined.title': 'Coins added',
            'app.dialog.info.friendsjoined.description.friends': '#{count} frien((d|ds|ds)) accepted your invite.',
            'app.dialog.info.friendsjoined.description.coins': '#{count} coi((n|ns|ns)) added.',

            //FACEBOOK SHARE
            'share.caption': 'Find Words',
            'share.description': 'Exciting game "Find Words"! Join, more fun together!',

            //FOR STARTAD
            'startad.recommendapp': 'We recommend this app',

            //NOTIFICATIONS
            'notification.weekly.notify.title': 'Bonuses',
            'notification.weekly.notify.description': 'You haven\'t played in a while, we gave you some bonuses, come and collect them!',

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

if (!CONST.IS_CORDOVA_APP) {
    CONST.STATIC_IMAGE_URL = '/' + CONST.STATIC_IMAGE_URL;
    CONST.STATIC_CSS_URL = '/' + CONST.STATIC_CSS_URL;
    CONST.STATIC_JS_URL = '/' + CONST.STATIC_JS_URL;
    CONST.STATIC_MUSIC_URL = '/' + CONST.STATIC_MUSIC_URL;
}

var ENV_SETTINGS = {};
ENV_SETTINGS[ENV_LOCAL] = {
    BASE_URL: 'http://words.game',
    API_URL: 'http://api.timetosmile.net/'
}
ENV_SETTINGS[ENV_ALEK] = {
    BASE_URL: 'http://vitaliy.findwords.smalldev',
    API_URL: 'http://api.vitaliy.findwords.smalldev',
    API_URL: 'http://mobileapi/'
}
ENV_SETTINGS[ENV_PRODUCTION] = {
    BASE_URL: 'http://vitaliy.findwords.smalldev.alek.in.ua',
    API_URL: 'http://api.timetosmile.net/'
}

if (ENV_SETTINGS.hasOwnProperty(CURRENT_ENV)) {
    for (var k in ENV_SETTINGS[CURRENT_ENV]) {
        if (!ENV_SETTINGS[CURRENT_ENV].hasOwnProperty(k)) {
            continue;
        }
        CONST[k] = ENV_SETTINGS[CURRENT_ENV][k];
    }
}