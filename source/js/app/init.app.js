

require('es6-promise').polyfill();


window.refreshApp = function(){
    if(window.cordova && cordova.file && cordova.file.applicationDirectory){
        document.location = cordova.file.applicationDirectory + 'www/index_'+device.platform.toLowerCase()+'.html';
    }else{
        document.location.reload();
    }
}

window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimationFrame = (function() {
    return  window.cancelRequestAnimationFrame      ||
    window.webkitCancelRequestAnimationFrame||
    window.mozCancelRequestAnimationFrame   ||
    window.oCancelRequestAnimationFrame     ||
    window.msCancelRequestAnimationFrame    ||
    function(id){
        clearTimeout(id)
    }
})();

var attachFastClick = require('fastclick');
attachFastClick(document.body);



window.React = require('react/addons');
window.appManager = require('./app.manager');



var AppClass = require('./react/app');



var createApp = function(){
    window.appManager.removeOnInitListener(createApp);
    window.APP = React.render(
        <AppClass />,
        document.getElementById('app-content'), function(){

        });
}

var initApp = function(){
    window.appManager.addOnInitListener(createApp);
    window.appManager.init();

}

$(function() {

    Promise.all([

    ]).then(function(){
        if(CONST.IS_CORDOVA_APP){
            var appLoadTime = Date.now();
            document.addEventListener("deviceready", function(){
                window.open = cordova.InAppBrowser.open;
                initApp();
                navigator.splashscreen.hide();
            }, false);

            function onResume() {
                setTimeout(function() {
                    var t = Date.now() - appLoadTime;
                    if(t > 60 * 60 * 1000){
                        refreshApp();
                    }
                }, 0);
            }
            document.addEventListener("resume", onResume, false);
            return;
        }

        initApp();
    }.bind(this), function(){
        window.loadingScreen.showErrorLoadingForm();
    }.bind(this));
});