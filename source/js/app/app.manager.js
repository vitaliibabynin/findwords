
var AbstractEventEmitter = require('./model/abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

var EVENT_ONINIT = "eventOnInit";

var DBClass = require('./model/app.db').DB;
var AdClass = require('./model/app.ad').Ad;
var FBFactory = require('./model/app.fb').FBFactory;
var StoreFactory = require('./model/app.store').StoreFactory;
var NotoficationLocalFactory = require('./model/app.notification.local').NotoficationLocalFactory;
var ApiClass = require('./model/app.api').ApiClass;

window.Utils = require('./utils');
window.router = require('./model/app.router');
window.appDialogs = require('./model/app.dialogs');


var AppManager = Object.assign({}, AbstractEventEmitter, {

    language: null,
    settings: null,
    gameState: null,
    musicManager: null,
    SFXManager: null,
    runtimeState: {},
    hardwareBackBtnEnabled: true,


    init: function(){
        return new Promise(function(resolve, reject){
                    window.DB = new DBClass();
                    window.appAd = new AdClass(CONST.CURRENT_PLATFORM, CONST.IS_CORDOVA_APP);
                    window.appFB = FBFactory(CONST.CURRENT_PLATFORM);
                    window.appStore = StoreFactory(CONST.CURRENT_PLATFORM);
                    window.appNotificationLocal = NotoficationLocalFactory(CONST.CURRENT_PLATFORM);
                    window.appApi = new ApiClass(CONST.API_URL, 1);

                    router.setup();

                    resolve();
                }.bind(this))
            .then(function(){
                    return this.initLanguage();
                }.bind(this))
            .then(function(){
                return this.getGameState().init();
            }.bind(this))
            .then(function(){
                    console.log('init 1');
                    return Promise.all([
                        window.appFB.init(this.getSettings().getFacebookId(), this.language)
                        , window.appStore.init() //из-за этого пока не грузится на iOS девайсах, нужно завести в панельке аппстора приложение
                        , window.appNotificationLocal.init()
                        , window.appAd.init()
                    ]);
                }.bind(this))
            .then(function(){
                    return new Promise(function(resolve, reject){
                        console.log('init 2');
                        this.getMusicManager().playMusic();
                        window.appNotificationLocal.hasPermissions().then(function(granted){
                            if(!granted){
                                return false;
                            }

                            window.appNotificationLocal.cancelNotifyWeekly().then(function(){
                                window.appNotificationLocal.setNotifyWeekly();
                            }, function(){
                                window.appNotificationLocal.setNotifyWeekly();
                            });
                        }.bind(this));

                        resolve();
                    }.bind(this));
                }.bind(this))
            .then(function(){
                    console.log('init 3');
                    router.addChangeLanguageListener(this.onLanguageChanged.bind(this));
                    document.addEventListener("backbutton", this.onHardwareBackBtnClick.bind(this), false);

                    this.emitOnInit();

                    window.loadingScreen.hide();
                }.bind(this), function(){
                    console.log('appManager.init error');
                    window.loadingScreen.showErrorLoadingForm();
                }.bind(this));
    },

    initLanguage: function(){
        return new Promise(function(resolve, reject){
                    if(router.urlState.lang && router.urlState.lang.length > 0){
                        return resolve(router.urlState.lang);
                    }

                    DB.getSettings().get("lang").then(function(lang){
                        if(!lang){
                            if(CONST.IS_CORDOVA_APP && navigator.globalization){
                                navigator.globalization.getLocaleName(function(locale){
                                    resolve(locale.value);
                                }.bind(this), function(){
                                    resolve(CONST.LANGUAGE_EN);
                                }.bind(this));
                                return;
                            }

                            lang = navigator.language || navigator.userLanguage || navigator.browserLanguage;
                        }

                        resolve(lang);
                    }.bind(this));
                }.bind(this))
            .then(function(lang){
                if(lang){
                    lang = lang.toLowerCase().indexOf(CONST.LANGUAGE_RU) > -1 ? CONST.LANGUAGE_RU : CONST.LANGUAGE_EN;
                }

                router.setLanguage(lang);
                this.onLanguageChanged(lang);
                return Promise.resolve();
            }.bind(this))
    },

    onLanguageChanged: function(newLang){
        if(!newLang || typeof newLang == 'object'){
            newLang = router.getLanguage();
        }

        this.language = newLang;
        i18n.setDefaultLocale(this.language);
        DB.getSettings().set("lang", this.language);
    },

    changeLangAndReload: function(newLang){
        newLang = newLang || (this.language == CONST.LANGUAGE_RU ? CONST.LANGUAGE_EN : CONST.LANGUAGE_RU);

        DB.getSettings().set("lang", newLang).then(function(){
            var url = '/'+newLang+'/';

            if(window.cordova && cordova.file && cordova.file.applicationDirectory){
                //url = document.location = cordova.file.applicationDirectory + 'www/index_'+device.platform.toLowerCase()+'.html';
                url = document.location = cordova.file.applicationDirectory + 'www/index.html';
            }

            document.location = url;
        }.bind(this), function(){

        }.bind(this));
    },

    setHardwareBackBtnEnable: function(newValue){
        this.hardwareBackBtnEnabled = newValue;
    },

    onHardwareBackBtnClick: function(){
        if(!this.hardwareBackBtnEnabled){ return; }

        router.navigate('main', 'index');
    },

    getSettings: function(){
        if(null == this.settings){
            this.settings = require('./model/app.settings');
        }

        return this.settings;
    },

    getGameState: function(){
        if(null == this.gameState){
            this.gameState = require('./model/app.gamestate');
        }

        return this.gameState;
    },

    getMusicManager: function(){
        if(null == this.musicManager){
            this.musicManager = require('./model/app.music').AppMusic(CONST.CURRENT_PLATFORM);
            this.musicManager.init();
        }

        return this.musicManager;
    },

    getSFXManager: function(){
        if(null == this.SFXManager){
            this.SFXManager = require('./model/app.music').AppSFX(CONST.CURRENT_PLATFORM);
            this.SFXManager.init();
        }

        return this.SFXManager;
    },

    addOnInitListener: function(callback){
        this.on(EVENT_ONINIT, callback);
    },

    removeOnInitListener: function(callback){
        this.removeListener(EVENT_ONINIT, callback);
    },

    emitOnInit: function(){
        this.emit(EVENT_ONINIT, this);
    }


});

module.exports = AppManager;



