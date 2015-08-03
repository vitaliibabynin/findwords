/** @jsx React.DOM */
"use strict";

var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};


var NOTIFY_ID = {
    REFILL_LIVES: 1,
    WEEKLY_NOTIFY: 2
}

var EVERY = {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
}

var AbstractNotificationLocal = Object.assign({}, AbstractEventEmitter, {

    init: function(){
        return Promise.resolve();
    },

    hasPermissions: function(){
        return Promise.resolve(true);
    },

    registerPermissions: function(){
        return Promise.resolve(true);
    },

    setNotify: function(id, title, text, at, data){
        return Promise.resolve();
    },

    setNotifyRefillLives: function(){
        return Promise.resolve();
    },

    cancelNotifyRefillLives: function(){
        return Promise.resolve();
    },

    setNotifyWeekly: function(){
        return Promise.resolve();
    },
    cancelNotifyWeekly: function(){
        return Promise.resolve();
    },

    requireNotificationPermissions: function(){
        return Promise.resolve();
    }

});


var SiteNotificationLocal = Object.assign({}, AbstractNotificationLocal, {

});

var CordovaNotificationLocal = Object.assign({}, AbstractNotificationLocal, {
    notifLocal: null,

    init: function(){
        return new Promise(function(resolve, reject){
            this.notifLocal = cordova.plugins.notification.local;

            resolve();
        }.bind(this));
    },

    hasPermissions: function(){
        return new Promise(function(resolve, reject){
            this.notifLocal.hasPermission(function (granted) {
                resolve(granted);
            });


        }.bind(this));
    },

    registerPermissions: function(){
        return new Promise(function(resolve, reject){
            this.notifLocal.registerPermission(function (granted) {
                resolve(granted);
                this.emitChange();
            }.bind(this));
        }.bind(this));
    },

    setNotify: function(id, title, text, at, data, scheduleEvery){
        id = id || 1;
        text = text || null;
        at = at || Date.now();
        data = data || {};

        var notifyObj = {
            id: id,
            title: title,
            text: text,
            data: data
        };

        if(scheduleEvery){
            notifyObj.firstAt = at;
            notifyObj.every = scheduleEvery;
        }else{
            notifyObj.at = at;
        }


        cordova.plugins.notification.local.schedule(notifyObj);
    },

    cancelNotification: function(notificationId){
        return new Promise(function(resolve, reject){
            this.notifLocal.cancel(notificationId, function () {
                resolve();
            });
        }.bind(this));
    },

    setNotifyRefillLives: function(){
        var atDate = Date.now() + appManager.getTotalLives() * appManager.getNewLivesPeriod() * 1000;

        this.setNotify(
            NOTIFY_ID.REFILL_LIVES,
            i18n._('notification.refill.lives.title'),
            i18n._('notification.refill.lives.description'),
            atDate
        )
    },
    cancelNotifyRefillLives: function(){
        return this.cancelNotification(NOTIFY_ID.REFILL_LIVES);
    },

    setNotifyWeekly: function(){
        //3 days
        var atDate = Date.now() + 259200 * 1000;

        this.setNotify(
            NOTIFY_ID.WEEKLY_NOTIFY,
            i18n._('notification.weekly.notify.title'),
            i18n._('notification.weekly.notify.description'),
            atDate,
            null,
            EVERY.WEEK
        )
    },
    cancelNotifyWeekly: function(){
        return this.cancelNotification(NOTIFY_ID.WEEKLY_NOTIFY);
    },


    requireNotificationPermissions: function(){
        this.hasPermissions().then(function(granted){
            if(!granted){
                appDialogs.getRequirePushDialog().showIfTime();
                return;
            }
        }.bind(this));
    }
});



var NotoficationLocalFactory = function(platform){
    switch(platform){
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            return CordovaNotificationLocal;
            break;

        case CONST.PLATFORM_SITE:
        default:
            return SiteNotificationLocal;
            break;
    }
}

module.exports = {
    NotoficationLocalFactory: NotoficationLocalFactory,
    SiteNotificationLocal: SiteNotificationLocal,
    CordovaNotificationLocal: CordovaNotificationLocal
};



