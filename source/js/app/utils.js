module.exports = {
    convertEmToPx: function (basePx, em) {
        return basePx * em;
    },

    convertPxToEm: function (basePx, px) {
        return px / basePx;
    },

    getWindowWidth: function () {
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    },

    isProblemAndroid: function () {
        if (CONST.CURRENT_PLATFORM == CONST.PLATFORM_ANDROID && window.device && window.device.version) {
            var v = window.device.version.replace(new RegExp('[.]', 'g'), '');
            if (v < 440) {
                return true;
            }
        }

        return false;
    },

    getStaticPath: function () {
        return (window.cordova && window.cordova.file && window.cordova.file.applicationDirectory ? window.cordova.file.applicationDirectory + 'www/' : '');
    },

    getImgPath: function (imgName) {
        return this.getStaticPath() + CONST.STATIC_IMAGE_URL + imgName;
    },

    addTouchEvents: function (domElement, onStartFunc, ontEndFunc, onMoveFunc) {
        if (window.navigator.msPointerEnabled) {
            domElement.addEventListener("MSPointerDown", onStartFunc, false);
            if (ontEndFunc) {
                domElement.addEventListener("MSPointerUp", ontEndFunc, false);
            }
            if (onMoveFunc) {
                domElement.addEventListener("MSPointerMove", onMoveFunc, false);
            }
            return;
        }
        domElement.addEventListener("touchstart", onStartFunc, false);
        if (ontEndFunc) {
            domElement.addEventListener("touchend", ontEndFunc, false);
        }
        if (onMoveFunc) {
            domElement.addEventListener("touchmove", onMoveFunc, false);
        }
    },
    removeTouchEvents: function (domElement, onStartFunc, ontEndFunc, onMoveFunc) {
        if (window.navigator.msPointerEnabled) {
            domElement.removeEventListener("MSPointerDown", onStartFunc, false);
            if (ontEndFunc) {
                domElement.removeEventListener("MSPointerUp", ontEndFunc, false);
            }
            if (onMoveFunc) {
                domElement.removeEventListener("MSPointerMove", onMoveFunc, false);
            }
            return;
        }
        domElement.removeEventListener("touchstart", onStartFunc, false);
        if (ontEndFunc) {
            domElement.removeEventListener("touchend", ontEndFunc, false);
        }
        if (onMoveFunc) {
            domElement.removeEventListener("touchmove", onMoveFunc, false);
        }
    },

    isPlatformIOS: function () {
        return CONST.CURRENT_PLATFORM == CONST.PLATFORM_IOS;
    },

    shareUrl: function (url, params) {
        /* Example params
         {
         text: 'Share description or title',
         imglist: ['imgUrl1','imgUrl2'],
         servie: 'vk|facebook ....'
         }
         */
        params = params || {};
        return window.open(url, '_share||' + JSON.stringify(params));
    },

    getPlatformUrl: function (platform, returnFullUrl) {
        var url = CONST.BASE_URL + '/' + router.getLanguage();
        var appPlatforms = appManager.getSettings().getAppPlatforms();
        if (platform == CONST.PLATFORM_ANDROID) {
            url = CONST.CURRENT_PLATFORM == CONST.PLATFORM_ANDROID && !returnFullUrl ? 'market://details?id=' : 'https://play.google.com/store/apps/details?id=';
            url += appPlatforms.android;
        } else if (platform == CONST.PLATFORM_IOS) {
            url = 'https://itunes.apple.com/app/id'+appPlatforms.ios+'?ls=1&mt=8';
        } else if (platform == CONST.PLATFORM_WINDOWS8) {
            url = appPlatforms.windows;
        }

        return url;
    },

    getUrlTarget: function (openInApp) {
        openInApp = openInApp || false;
        if (!openInApp && CONST.IS_CORDOVA_APP) {
            return '_system';
        }

        return '_blank';
    },

    openUrl: function (url, openInApp, params) {
        return window.open(url, this.getUrlTarget(openInApp), params);
    },

    openAppInMarket: function (platform) {
        platform = platform || CONST.CURRENT_PLATFORM;

        this.openUrl(this.getPlatformUrl(platform));
    },


    sortArray: function (sortArr, sortKey) {
        if (!sortArr || sortArr.length <= 0) {
            return sortArr;
        }

        sortArr.sort(function (a, b) {
            if (a[sortKey] < b[sortKey])
                return 1;
            if (a[sortKey] > b[sortKey])
                return -1;
            return 0;
        });

        return sortArr;
    },

    round: function (val, precisions) {
        precisions = Math.pow(10, precisions || 0);
        return Math.round(val * precisions) / precisions;
    },

    countObjectProperties: function (object) {
        if (typeof object == "undefined") {
            return false;
        }

        var length = 0;
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                ++length;
            }
        }
        return length;
    },

    capitalizeWord: function (initialWord) {
        if (typeof initialWord == "undefined") {
            return false;
        }

        if (initialWord.length == 0) {
            return false;
        }

        var word = initialWord[0].toUpperCase();
        for (var i = 1; i < initialWord.length; i++) {
            word += initialWord[i].toLowerCase();
        }

        return word;
    }

}