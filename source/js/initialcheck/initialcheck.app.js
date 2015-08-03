
window.jQuery = window.$ = require('jquery');
window.i18n = require('./i18n-strings');
window.loadingScreen = require('./loading.screen');

window.appAnalytics = require('./model/app.analytics').AnalyticsFactory(CONST.CURRENT_PLATFORM);
window.appAnalytics.init(CONST.GA_ID);

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
    $.ajaxSetup({ cache: false });

    loadApp();

});