"use strict";

var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};


var EVENT_LOGIN = "eventLogin";
var EVENT_LOGOUT = "eventLogout";

var AbstractFB = Object.assign({}, AbstractEventEmitter, {
    fbAppId: null,
    accessToken: null,
    expireTime: null,
    userId: null,
    meInfo: null,
    appFriends: null,
    friendStats: null,
    lastStatsUpdate: null,

    clear: function () {
        this.accessToken = null;
        this.expireTime = null;
        this.userId = null;
        this.meInfo = null;
        this.appFriends = null;
        this.friendStats = null;
        this.lastStatsUpdate = null;

        this.emitChange();
    },

    init: function (fbAppId) {
        throw 'AbstractFB.init need override';
    },
    login: function () {
        throw 'AbstractFB.login need override';
    },
    logout: function () {
        this.clear();
    },

    isAuthorized: function () {
        if (!this.accessToken || !this.expireTime || this.expireTime < Date.now()) {
            return false;
        }

        return true;
    },

    getAccessToken: function () {
        return this.accessToken;
    },

    share: function (url) {
        throw 'AbstractFB.share';
    },

    invite: function () {
        throw 'AbstractFB.invite';
    },

    getMe: function () {
        throw 'AbstractFB.getMe';
    },

    getAppFriends: function (url) {
        throw 'AbstractFB.getAppFriends';
    },

    getFriend: function (id) {
        if (!this.appFriends || this.appFriends.length <= 0) {
            return false;
        }

        for (var i = 0; i < this.appFriends.length; i++) {
            if (this.appFriends[i].id == id) {
                return this.appFriends[i];
            }
        }

        return false;
    },

    getFriendsRating: function () {
        return new Promise(function (resolve, reject) {
            if (this.friendStats) {
                resolve(this.friendStats);

                if (this.lastStatsUpdate && Date.now() - this.lastStatsUpdate < 30 * 60 * 1000) {
                    return;
                }
            }

            this.getAppFriends().then(function (friends) {
                var ids = [];
                for (var i = 0; i < this.appFriends.length; i++) {
                    ids.push(this.appFriends[i].id);
                }

                return ids.length > 0 ?
                    appApi.getAccountsStats(ids, CONST.GAME_TYPE, appManager.getSettings().getGameId())
                    : {};
            }.bind(this)).then(function (friendStats) {
                if (!friendStats.accounts || friendStats.accounts.length <= 0) {
                    return resolve([]);
                }

                var friend;
                for (var i = 0; i < friendStats.accounts.length; i++) {
                    friend = this.getFriend(friendStats.accounts[i].id);
                    if (!friend) {
                        continue;
                    }
                    friendStats.accounts[i].first_name = friend.first_name;
                    friendStats.accounts[i].last_name = friend.last_name;
                    friendStats.accounts[i].picture = friend.picture;
                }

                this.friendStats = friendStats.accounts;
                this.lastStatsUpdate = Date.now();

                resolve(this.friendStats);
            }.bind(this), reject);
        }.bind(this));
    },


    addLoginListener: function (callback) {
        this.on(EVENT_LOGIN, callback);
    },
    removeLoginListener: function (callback) {
        this.removeListener(EVENT_LOGIN, callback);
    },
    emitLogin: function () {
        this.emit(EVENT_LOGIN, this);
    },

    addLogoutListener: function (callback) {
        this.on(EVENT_LOGOUT, callback);
    },
    removeLogoutListener: function (callback) {
        this.removeListener(EVENT_LOGOUT, callback);
    },
    emitLogout: function () {
        this.emit(EVENT_LOGOUT, this);
    }


});

var SiteFB = Object.assign({}, AbstractFB, {
    onAuthChange: function (authResponse) {
        this.clear();

        if (authResponse.status === 'connected') {
            this.userId = authResponse.authResponse.userID;
            this.accessToken = authResponse.authResponse.accessToken;
            this.expireTime = authResponse.authResponse.expiresIn * 1000 + Date.now();
            this.emitLogin();
        } else if (authResponse.status === 'not_authorized') {
            // the user is logged in to Facebook,
            // but has not authenticated your app
            this.emitLogout();
        } else {
            // the user isn't logged in to Facebook.
            this.emitLogout();
        }

        this.emitChange();
    },

    init: function (fbAppId, lang) {
        return new Promise(function (resolve, reject) {
            if (!fbAppId) {
                console.log('FB APPID is empty.');
                return resolve();
            }

            window.fbAsyncInit = function () {
                FB.Event.subscribe('auth.authResponseChanged', this.onAuthChange.bind(this));
                FB.Event.subscribe('auth.statusChange', this.onAuthChange.bind(this));
                FB.Event.subscribe('auth.login', this.onAuthChange.bind(this));
                FB.Event.subscribe('auth.logout', this.onAuthChange.bind(this));

                FB.init({
                    appId: fbAppId,
                    status: false,
                    xfbml: false,
                    cookie: true,
                    version: 'v2.3'
                });

                this.fbAppId = fbAppId;

                FB.getLoginStatus(function (response) {
                    this.onAuthChange(response);
                    resolve();
                }.bind(this));
            }.bind(this);

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/" + (lang == CONST.LANGUAGE_RU ? 'ru_RU' : 'en_US') + "/sdk.js";
                js.onerror = function (e) {
                    console.log('FB LOADING SCRIPT ERROR');
                    resolve(); //продолжаем загрузку без FB
                }.bind(this);
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }.bind(this))
    },

    login: function () {
        return new Promise(function (resolve, reject) {
            FB.login(function (response) {
                // handle the response
                if (!this.isAuthorized()) {
                    return reject();
                }

                resolve();
            }.bind(this), {
                scope: 'public_profile,email,user_friends', //,publish_actions',
                return_scopes: true
            });
        }.bind(this));
    },


    logout: function () {
        if (!this.isAuthorized()) {
            return;
        }

        AbstractFB.logout.call(this);
        FB.logout(function (response) {
            console.log('SiteFB.logout', response);
        }.bind(this));
    },

    share: function (url) {
        return new Promise(function (resolve, reject) {
            if (!url) {
                url = appManager.getSettings().getShareAppLink();
            }

            FB.ui(
                //{
                //    method: 'share_open_graph',
                //    action_type: 'og.likes',
                //    action_properties: JSON.stringify({
                //        object: url
                //    })
                //}
                {
                    method: 'share',
                    href: url
                }
                ,
                function (response) {
                    console.log('FB.ui share: ', response);
                    if (!response || response.error_code) {
                        console.log('Error while posting.');
                        return reject(response);
                    }

                    resolve(response);
                    console.log('Posting completed.');
                }
            );
        }.bind(this));
    },

    invite: function (message, title, excludeIds) {
        return new Promise(function (resolve, reject) {

            if (!message) {
                message = i18n._('app.invite.message');
            }
            if (!title) {
                title = i18n._('app.invite.title');
            }
            excludeIds = excludeIds || [];

            FB.ui({
                method: 'apprequests',
                message: message
                , filters: ['app_non_users']
                , title: title
                , exclude_ids: excludeIds
            }, function (response) {
                console.log('FB.ui invite: ', response);
                if (!response || response.error_code) {
                    return reject(response);
                }

                return resolve(response);
            });

        }.bind(this));
    },

    getMe: function () {
        return new Promise(function (resolve, reject) {
            if (null != this.meInfo) {
                return resolve(this.meInfo);
            }

            FB.api('/me?fields=id,picture.width(150).height(150),first_name,last_name', function (response) {

                if (!response) {
                    reject();
                    return;
                }

                this.meInfo = {
                    id: response.id,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    picture: response.picture && response.picture.data ? response.picture.data.url : ''
                };

                resolve(this.meInfo);
            }.bind(this));
        }.bind(this));
    },

    getAppFriends: function (nextPageUrl) {
        return new Promise(function (resolve, reject) {
            if (null != this.appFriends) {
                return resolve(this.appFriends);
            }

            var friendList = [];
            var pageLimit = 100;
            if (!nextPageUrl) {
                nextPageUrl = '/' + this.userId + '/friends?fields=id,picture.width(150).height(150),first_name,last_name';
            }

            FB.api(nextPageUrl, {limit: pageLimit}, function (response) {

                if (!response || !response.data) {
                    reject();
                    return;
                }

                for (var k in response.data) {
                    if (!response.data.hasOwnProperty(k)) {
                        continue;
                    }

                    friendList.push({
                        id: response.data[k].id,
                        first_name: response.data[k].first_name,
                        last_name: response.data[k].last_name,
                        picture: response.data[k].picture.data.url
                    });
                }

                if (response.data.length >= pageLimit && response.paging && response.paging.next) {
                    this.getAppFriends(response.paging.next).then(function (nextFriendList) {
                        this.appFriends = friendList.concat(nextFriendList);
                        resolve(this.appFriends);
                    }.bind(this), reject);
                    return;
                }

                this.appFriends = friendList;
                resolve(this.appFriends);
            }.bind(this));
        }.bind(this));

    }

});

var CordovaFB = Object.assign({}, AbstractFB, {

    permisions: ['public_profile', 'email', 'user_friends'],
    fbPlugin: null,

    onAuthChange: function (response) {
        this.clear();

        if (response && response.accessToken) {
            this.userId = response.userID;
            this.accessToken = response.accessToken;
            this.expireTime = response.expirationDate;
            this.emitLogin();
        } else {
            this.emitLogout();
        }

        this.emitChange();
    },

    init: function (fbAppId, lang) {
        return new Promise(function (resolve, reject) {
            if (!fbAppId) {
                console.log('FB APPID is empty.');
                return resolve();
            }

            this.fbAppId = fbAppId;
            this.fbPlugin = window.CordovaFacebook;

            this.fbPlugin.init({
                onSuccess: function (response) {
                    this.onAuthChange(response);
                    resolve();
                }.bind(this)
            });
        }.bind(this));
    },

    login: function () {
        return new Promise(function (resolve, reject) {
            this.fbPlugin.login({
                permissions: this.permisions,
                onSuccess: function (result) {
                    this.onAuthChange(result);

                    resolve();
                }.bind(this),
                onFailure: function (result) {
                    console.log('CordovaFB.login', result);
                    reject();
                }.bind(this)
            });

        }.bind(this));
    },

    logout: function () {
        if (!this.isAuthorized()) {
            return;
        }

        AbstractFB.logout.call(this);
        this.fbPlugin.logout({
            onSuccess: function () {
                console.log('CordovaFB.logout');
            }.bind(this)
        });
    },

    share: function (url) {
        return new Promise(function(resolve, reject){
            var promise;
            if (!appFB.isAuthorized()) {
                promise = appFB.login();
            } else {
                promise = Promise.resolve();
            }

            promise.then(function () {
                    this.fbPlugin.share({
                        shareLinkUrl: url || appManager.getSettings().getShareAppLink(),
                        title: i18n._('share.caption'),
                        description: i18n._('share.description'),
                        onSuccess: function (result) {
                            if(!result || !result.postId){
                                return reject()
                            }
                            resolve(result.postId);
                        }.bind(this),
                        onFailure: function (result) {
                            console.log('CordovaFB.share', result);
                            reject(result);
                        }.bind(this)
                    });
            }.bind(this), reject);

        }.bind(this));
    },

    invite: function (message, title, excludeIds) {
        //return new Promise(function(resolve, reject){
        //
        //    this.fbPlugin.invite({
        //        appLinkUrl: appManager.getSettings().getShareAppLink(),
        //        appInvitePreviewImageURL: appManager.getSettings().getAppInviteImgUrl(),
        //        onSuccess: function(result) {
        //
        //            console.log({FBresult: result});
        //
        //            resolve(result);
        //        }.bind(this),
        //        onFailure: function(result) {
        //            console.log('CordovaFB.invite', result);
        //            reject(result);
        //        }.bind(this)
        //    });
        //
        //}.bind(this));


        return new Promise(function(resolve, reject){
            var promise;
            if (!appFB.isAuthorized()) {
                promise = appFB.login();
            } else {
                promise = Promise.resolve();
            }

            promise.then(function () {
                this.fbPlugin.invite({
                    appLinkUrl: appManager.getSettings().getInviteAppUrl(),
                    appInvitePreviewImageURL: appManager.getSettings().getAppInviteImgUrl(),
                    onSuccess: function (result) {
                        resolve(result);
                    }.bind(this),
                    onFailure: function (result) {
                        console.log('CordovaFB.invite', result);
                        reject(result);
                    }.bind(this)
                });
            }.bind(this));
        }.bind(this));
    },

    getMe: function () {
        return new Promise(function (resolve, reject) {
            if (null != this.meInfo) {
                return resolve(this.meInfo);
            }

            var path = 'me';
            var params = {"fields": "id,picture.width(150).height(150),first_name,last_name"};
            if (CONST.CURRENT_PLATFORM == CONST.PLATFORM_IOS) {
                path += '?fields=id,picture.width(150).height(150),first_name,last_name';
                params = {};
            }

            this.fbPlugin.graphRequest({
                path: path,
                params: params,
                onSuccess: function (response) {
                    console.log(response);
                    if (!response) {
                        reject();
                        return;
                    }

                    this.userId = response.id;
                    this.meInfo = {
                        id: response.id,
                        first_name: response.first_name,
                        last_name: response.last_name,
                        picture: response.picture && response.picture.data ? response.picture.data.url : ''
                    };

                    resolve(this.meInfo);
                }.bind(this),
                onFailure: function (response) {
                    reject();
                }.bind(this)
            });

        }.bind(this));
    },

    getAppFriends: function (nextPageUrl) {
        return new Promise(function (resolve, reject) {
            if (null != this.appFriends) {
                return resolve(this.appFriends);
            }

            var friendList = [];
            var pageLimit = 100;
            if (!nextPageUrl) {
                nextPageUrl = 'me/friends?fields=id,picture.width(150).height(150),first_name,last_name';
                if (CONST.CURRENT_PLATFORM == CONST.PLATFORM_ANDROID) {
                    nextPageUrl += '&access_token=' + this.getAccessToken() + '&a=1';
                }
            }

            var params = {limit: pageLimit};
            if (CONST.CURRENT_PLATFORM == CONST.PLATFORM_IOS) {
                nextPageUrl += '&limit=' + pageLimit;
                params = {};
            }

            this.fbPlugin.graphRequest({
                path: nextPageUrl,
                params: params,
                onSuccess: function (response) {
                    if (!response || !response.data) {
                        reject();
                        return;
                    }

                    for (var k in response.data) {
                        if (!response.data.hasOwnProperty(k)) {
                            continue;
                        }

                        friendList.push({
                            id: response.data[k].id,
                            first_name: response.data[k].first_name,
                            last_name: response.data[k].last_name,
                            picture: response.data[k].picture.data.url
                        });
                    }

                    if (response.data.length >= pageLimit && response.paging && response.paging.next) {
                        this.getAppFriends(response.paging.next).then(function (nextFriendList) {
                            this.appFriends = friendList.concat(nextFriendList);
                            resolve(this.appFriends);
                        }.bind(this), reject);
                        return;
                    }

                    this.appFriends = friendList;
                    resolve(this.appFriends);
                }.bind(this),
                onFailure: function (response) {
                    reject();
                }.bind(this)
            });

        }.bind(this));

    }

});


var FBFactory = function (platform) {
    switch (platform) {
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            return CordovaFB;
            break;

        case CONST.PLATFORM_SITE:
        default:
            return SiteFB;
            break;
    }
}

module.exports = {
    FBFactory: FBFactory,
    SiteFB: SiteFB,
    CordovaFB: CordovaFB
};