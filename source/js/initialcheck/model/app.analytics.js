/** @jsx React.DOM */
"use strict";

var Object = {assign: require('react/lib/Object.assign')};


var AbstractAnalytics = Object.assign({}, {}, {
    init: function(gaId){
        window.addEventListener('error', function (err) {
            var lineAndColumnInfo = err.colno ? ' line:' + err.lineno +', column:'+ err.colno : ' line:' + err.lineno;
            this.trackEvent(
                'JavaScript Error',
                err.message,
                err.filename + lineAndColumnInfo + ' -> ' +  navigator.userAgent,
                1
            );
        }.bind(this));

        jQuery.error = function (message) {
            this.trackEvent(
                'jQuery Error',
                message,
                navigator.userAgent,
                1
            );
        }.bind(this)

        $(document).ajaxError(function (event, request, settings) {
            this.trackEvent(
                'jQuery Ajax Error',
                settings.url,
                JSON.stringify({
                    result: event.result,
                    status: request.status,
                    statusText: request.statusText,
                    crossDomain: settings.crossDomain,
                    dataType: settings.dataType
                }),
                1
            );
        }.bind(this));
    },

    trackView: function(screenName){

    },

    trackEvent: function(category, action, label, value){

    },

    trackSocial: function(network, action, target){

    },

    setUserId: function(){

    }
});


var SiteAnalytics = Object.assign({}, AbstractAnalytics, {
    init: function(gaId){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', gaId, 'auto');
        ga('require', 'linkid', 'linkid.js');
        ga('require', 'displayfeatures');

        AbstractAnalytics.init.call(this, gaId);
    },

    trackView: function(screenName){
        ga('send', 'pageview');
        ga('send', 'screenview', {
            'appName': CONST.ENV + '_' + CONST.CURRENT_LANGUAGE,
            'screenName': screenName
        });
    },

    trackEvent: function(category, action, label, value){
        ga(
            'send',
            'event',
            category,
            action,
            label,
            value,
            true
        );
    }
});

var CordovaAnalytics = Object.assign({}, AbstractAnalytics, {
    init: function(gaId){
        document.addEventListener("deviceready", function(){
            if(!window.hasOwnProperty('analytics')){
                throw 'Cordova analytics not isset.';
            }

            window.analytics.startTrackerWithId(
                gaId,
                function(){

                }.bind(this),
                function(err){
                    console.log('CordovaAnalytics.init ' + err);
                }.bind(this)
            );
            AbstractAnalytics.init.call(this, gaId);
        }.bind(this), false);
    },

    trackView: function(screenName){
        window.analytics.trackView(screenName);
    },

    trackEvent: function(category, action, label, value){
        window.analytics.trackEvent(category, action, label, value);
    },

    trackSocial: function(network, action, target){
        window.analytics.trackSocial(network, action, target);
    },

    setUserId: function(id){
        window.analytics.setUserId(id);
    }
});



var AnalyticsFactory = function(platform){
    switch(platform){
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            return CordovaAnalytics;
            break;

        case CONST.PLATFORM_SITE:
        default:
            return SiteAnalytics;
            break;
    }
}

module.exports = {
    AnalyticsFactory: AnalyticsFactory,
    SiteAnalytics: SiteAnalytics,
    CordovaAnalytics: CordovaAnalytics
};



