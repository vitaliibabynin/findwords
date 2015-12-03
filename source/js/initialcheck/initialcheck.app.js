
require('./libs/device.js');
window.deviceJS = device.noConflict();

window.jQuery = window.$ = require('jquery');
window.i18n = require('./i18n-strings');
window.loadingScreen = require('./loading.screen');

window.appAnalytics = require('./model/app.analytics').AnalyticsFactory(CONST.CURRENT_PLATFORM);
window.appAnalytics.init(CONST.GA_ID[CONST.CURRENT_PLATFORM]);

window.refreshApp = function(){
    document.location.reload();
}



//
////------------------------
function loadApp(){
    var buildAppScript = document.createElement( 'script' );
    var buildAppCSS = document.createElement( "link" );
    buildAppCSS.href = CONST.STATIC_CSS_URL + CONST.CSS_APP_BUNDLE;
    buildAppCSS.type = "text/css";
    buildAppCSS.rel = "stylesheet";
    document.getElementsByTagName( "head" )[0].appendChild( buildAppCSS );

    buildAppScript.setAttribute( 'src', CONST.STATIC_JS_URL + CONST.JS_APP_BUNDLE);
    buildAppScript.onload = function(){

    }
    document.body.appendChild( buildAppScript );

}


$(function() {
    //Определяем платформу на которой запущен проект. Если не кордова сборка тогда это сайт
    if(window.deviceJS.cordova()){
        if(window.deviceJS.ios()){
            CONST.CURRENT_PLATFORM = CONST.PLATFORM_IOS;
        }
        if(window.deviceJS.android()){
            CONST.CURRENT_PLATFORM = CONST.PLATFORM_ANDROID;
        }
        if(window.deviceJS.windows()){
            CONST.CURRENT_PLATFORM = CONST.PLATFORM_WINDOWS;
        }
    }

    $.ajaxSetup({ cache: false });

    loadApp();

});