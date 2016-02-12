
require('./../libs/native.history.js');
require('./../libs/Router.js');


var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

var EVENT_LANGUAGE_CHANGE = "eventLanguageChange";

var AppRouter = Object.assign({}, AbstractEventEmitter, {
    router: new Router(),

    urlState: {
        lang: null,
        controller: "",
        action: "",
        params: {}
    },

    _setupRouter: function(){
        this.router.route('[\/]?\\#/([\\w\\W]+)', function(all){
            this.router.navigate(all, null, true, Math.random());
        }.bind(this));

        this.router.route('[\/]?selectlanguage[/]?', function(all){
            window.loadingScreen.showSelectLanguageForm();
        }.bind(this));

        this.router.route('[\/]?([a-zA-Z]{2})/:controller/:action[/]?([\\w\\W]*)$', function(lang, controller, action, params){
            this._setUrlState({lang: lang, controller: controller, action: action, params: this.parseParams(params)});
        }.bind(this));

        this.router.route('[\/]?([a-zA-Z]{2})[/]?', function(lang){
            this._setUrlState({lang: lang, controller: 'index', action: 'index'});
        }.bind(this));
        this.router.start();
    },



    setup: function(){
        this._setupRouter();
    },

    parseParams: function(urlParams){
        var i = 0;
        var params = {};
        if(urlParams){
            var query;
            urlParams = urlParams.split('?');
            query = urlParams[0].split('/');
            if(query && query.length > 0){
                for(i=0;i<query.length;i=i+2){
                    if(i >= query.length){ break; }
                    if(!query[i] || query[i].length <= 0){ continue; }
                    params[query[i]] = i+1>=query.length ? '' : query[i+1];
                }
            }

            if(urlParams.length >= 2){
                query = urlParams[0].split('&');
                if(query && query.length > 0){
                    for(i=0;i<query.length;i++){
                        var p = query[i].split('=');
                        if(!p || p.length < 2){ continue; }
                        params[p[0]] = p[1];
                    }
                }
            }
        }

        return params;
    },

    _setUrlState: function(urlState){
        //console.log('UrlState: ', this.urlState);
        var oldLanguage = this.urlState.lang;
        this.urlState = urlState;
        if(oldLanguage != urlState.lang){
            this.emitChangeLanguage();
        }

        this.emitChange();
    },

    setLanguage: function(lang){
        if(lang){
            if(lang == this.getLanguage()){
                return;
            }

            this.router.navigate(lang+'/');
            return;
        }

        this.router.navigate('selectlanguage/');
    },

    getLanguage: function(){
        if(!this.urlState.lang || this.urlState.lang.length <= 0){
            return null;
        }

        return this.urlState.lang;
    },
    getLanguageId: function(lang){
        var lang = lang || router.getLanguage();
        return CONST.LANG_ID[lang];
    },

    getController: function(){
        if(!this.urlState.controller){
            return null;
        }

        return this.urlState.controller;
    },

    getAction: function(){
        if(!this.urlState.action){
            return null;
        }

        return this.urlState.action;
    },

    getParam: function(paramName, defaultValue){
        defaultValue = defaultValue || null;

        if(!this.urlState.params || !this.urlState.params.hasOwnProperty(paramName)){
            return defaultValue;
        }

        return this.urlState.params[paramName];
    },

    getParams: function(){
        return this.urlState.params || {};
    },

    navigate: function(controller, action, params, replace){
        replace = replace || false;

        var url = '/';
        var lang = this.getLanguage();
        if(lang){
            url += this.getLanguage() + '/';
        }
        if(controller){
            url += controller + '/';
        }
        if(action || action === 0){
            url += action + '/';
        }
        this.navigateToUrl(url, params, replace);
    },

    navigateToUrl: function(url, params, replace){
        url += this.makeParamsUrl(params);
        //console.log('NewUrl: ' + url);
        this.router.navigate(url, null, replace, Math.random());
    },

    goBack: function(){
        if(History.getCurrentIndex() > 1){
            this.router.back();
            return;
        }

        //replace and go to main page
        this.navigate(null, null, null, true);
    },

    makeParamsUrl: function(params){
        var urlString = '';
        if(!params){
            return urlString;
        }

        for(var k in params){
            if(!params.hasOwnProperty(k) || !params[k]){ continue; }

            urlString += k + '/' + params[k] +'/';
        }

        return urlString;
    },


    addChangeLanguageListener: function(callback){
        this.on(EVENT_LANGUAGE_CHANGE, callback);
    },
    removeChangeLanguageListener: function(callback){
        this.removeListener(EVENT_LANGUAGE_CHANGE, callback);
    },
    emitChangeLanguage: function(){
        this.emit(EVENT_LANGUAGE_CHANGE, this);
    }


});

module.exports = AppRouter;



