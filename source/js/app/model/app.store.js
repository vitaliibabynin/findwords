/** @jsx React.DOM */
"use strict";

var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};


var PRODUCT = {
    COINS: {
        COINS_50: 'coinspack_1',
        COINS_110: 'coinspack_2',
        COINS_245: 'coinspack_3',
        COINS_550: 'coinspack_4',
        COINS_1100: 'coinspack_5'
    },
    ROUNDSBUNDLES: {
        EN: {
            EN_ROUNDSBUNDLE_2: 'en_roundsbundle_2',
            EN_ROUNDSBUNDLE_3: 'en_roundsbundle_3',
            EN_ROUNDSBUNDLE_4: 'en_roundsbundle_4',
            EN_ROUNDSBUNDLE_5: 'en_roundsbundle_5',
            EN_ROUNDSBUNDLE_6: 'en_roundsbundle_6',
            EN_ROUNDSBUNDLE_7: 'en_roundsbundle_7',
            EN_ROUNDSBUNDLE_8: 'en_roundsbundle_8',
            EN_ROUNDSBUNDLE_9: 'en_roundsbundle_9',
            EN_ROUNDSBUNDLE_10: 'en_roundsbundle_10',
            EN_ROUNDSBUNDLE_11: 'en_roundsbundle_11',
            EN_ROUNDSBUNDLE_12: 'en_roundsbundle_12',
            EN_ROUNDSBUNDLE_13: 'en_roundsbundle_13',
            EN_ROUNDSBUNDLE_14: 'en_roundsbundle_14',
            EN_ROUNDSBUNDLE_15: 'en_roundsbundle_15',
            EN_ROUNDSBUNDLE_16: 'en_roundsbundle_16',
            EN_ROUNDSBUNDLE_17: 'en_roundsbundle_17',
            EN_ROUNDSBUNDLE_18: 'en_roundsbundle_18',
            EN_ROUNDSBUNDLE_19: 'en_roundsbundle_19',
            EN_ROUNDSBUNDLE_20: 'en_roundsbundle_20'
        },
        RU: {
            RU_ROUNDSBUNDLE_2: 'ru_roundsbundle_2',
            RU_ROUNDSBUNDLE_3: 'ru_roundsbundle_3',
            RU_ROUNDSBUNDLE_4: 'ru_roundsbundle_4',
            RU_ROUNDSBUNDLE_5: 'ru_roundsbundle_5',
            RU_ROUNDSBUNDLE_6: 'ru_roundsbundle_6',
            RU_ROUNDSBUNDLE_7: 'ru_roundsbundle_7',
            RU_ROUNDSBUNDLE_8: 'ru_roundsbundle_8',
            RU_ROUNDSBUNDLE_9: 'ru_roundsbundle_9',
            RU_ROUNDSBUNDLE_10: 'ru_roundsbundle_10',
            RU_ROUNDSBUNDLE_11: 'ru_roundsbundle_11',
            RU_ROUNDSBUNDLE_12: 'ru_roundsbundle_12',
            RU_ROUNDSBUNDLE_13: 'ru_roundsbundle_13',
            RU_ROUNDSBUNDLE_14: 'ru_roundsbundle_14',
            RU_ROUNDSBUNDLE_15: 'ru_roundsbundle_15',
            RU_ROUNDSBUNDLE_16: 'ru_roundsbundle_16',
            RU_ROUNDSBUNDLE_17: 'ru_roundsbundle_17',
            RU_ROUNDSBUNDLE_18: 'ru_roundsbundle_18',
            RU_ROUNDSBUNDLE_19: 'ru_roundsbundle_19',
            RU_ROUNDSBUNDLE_20: 'ru_roundsbundle_20'
        }
    },
    REMOVE_AD: 'remove_ad'
};

var AbstractStore = Object.assign({}, AbstractEventEmitter, {

    init: function(){
        return new Promise(function(resolve, reject){
            throw 'AbstractStore.init not implemented';
        }.bind(this));
    },

    getProduct: function(productId){
        console.log('Get product not implemented.');

        return {};
    },

    getProductPrice: function(productId){
        console.log('Get product price not implemented.');
        return '$0';
    },

    order: function(productId){
        console.log('Order not implemented.');
    }

});


var SiteStore = Object.assign({}, AbstractStore, {
    init: function(){
        return Promise.resolve();
    }
});

var CordovaStore = Object.assign({}, AbstractStore, {
    init: function(){
        return new Promise(function(resolve, reject){
            if(!window.hasOwnProperty('store')){
                throw 'Cordova store not isset.';
            }

//            store.verbosity = 0;
            if(CONST.ENV != 'production'){
                store.verbosity = store.DEBUG;
            }

            for (var k in PRODUCT.COINS) {
                if (!PRODUCT.COINS.hasOwnProperty(k)) {
                    continue;
                }

                store.register({
                    id: PRODUCT.COINS[k],
                    alias: PRODUCT.COINS[k],
                    type: store.CONSUMABLE
                });
            }

            for (k in PRODUCT.ROUNDSBUNDLES) {
                if (!PRODUCT.ROUNDSBUNDLES.hasOwnProperty(k)) {
                    continue;
                }

                for (var m in PRODUCT.ROUNDSBUNDLES[k]) {
                    if (!PRODUCT.ROUNDSBUNDLES[k].hasOwnProperty(m)) {
                        continue;
                    }

                    store.register({
                        id: PRODUCT.ROUNDSBUNDLES[k][m],
                        alias: PRODUCT.ROUNDSBUNDLES[k][m],
                        type: store.NON_CONSUMABLE
                    });
                }
            }

            store.register({
                id: PRODUCT.REMOVE_AD,
                alias: PRODUCT.REMOVE_AD,
                type: store.NON_CONSUMABLE
            });

            store.ready(function() {
                console.log('store.ready');
                resolve();
            });

            for (k in PRODUCT.COINS) {
                if (!PRODUCT.COINS.hasOwnProperty(k)) {
                    continue;
                }

                store.when(PRODUCT.COINS[k]).approved(function (order) {
                    var coins = this.getCoins(PRODUCT.COINS[k]);
                    this.addCoins(coins);
                    order.finish();
                }.bind(this));
            }

            for (k in PRODUCT.ROUNDSBUNDLES) {
                if (!PRODUCT.ROUNDSBUNDLES.hasOwnProperty(k)) {
                    continue;
                }

                var roundsBundleNumber = 1;
                for (m in PRODUCT.ROUNDSBUNDLES[k]) {
                    if (!PRODUCT.ROUNDSBUNDLES[k].hasOwnProperty(m)) {
                        continue;
                    }

                    roundsBundleNumber++;
                    store.when(PRODUCT.ROUNDSBUNDLES[k][m]).approved(function (order) {
                        this.unlockRoundsBundle(roundsBundleNumber);
                        order.finish();
                    }.bind(this));
                    store.when(PRODUCT.ROUNDSBUNDLES[k][m]).updated(function (product) {
                        console.log(PRODUCT.ROUNDSBUNDLES[k][m]+(product.owned ? " OWNED" : " not owned")+"!");

                        var productOwned = product && product.owned ? true : false;
                        this.setRoundsBundle(roundsBundleNumber, productOwned);
                    }.bind(this));
                }
            }

            store.when(PRODUCT.REMOVE_AD).approved(function (order) {
                this.removeAd();
                order.finish();
            }.bind(this));
            store.when(PRODUCT.REMOVE_AD).updated(function (product) {
                console.log("remove_ad "+(product.owned ? "OWNED" : "not owned")+"!");

                appAd.setAdRemoved(product && product.owned ? true : false);
            }.bind(this));


            store.when('initiated', function(){
                console.log('store.initiated');
            }.bind(this));
            store.when('refreshed', function(){
                console.log('store.refreshed');
                resolve();
            }.bind(this));

            store.refresh();
        }.bind(this));
    },

    getProduct: function(productId){
        return store.get(productId);
    },

    getProductPrice: function(productId){
        var product = store.get(productId);

        if(product && product.price){
            product.price = product.price.replace('₽', '<i class="fa fa-rub"></i>');
        }

        return product.price;
    },

    order: function(productId){
        store.order(productId);
    },

    getCoins: function(productId) {
        var purchases = appManager.getSettings().getPurchases() || {};

        for (var k in purchases) {
            if (!purchases.hasOwnProperty(k)) {
                continue;
            }

            if (k == productId) {
                return purchases[productId];
            }
        }

        return 0;
    },

    addCoins: function(coins){
        //appSettings.addCoins(coins);
        appManager.getGameState().addCoins(coins);
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.addcoins.title'))
            .setContentText(i18n._('app.dialog.info.addcoins.description', coins))
            .show();
    },

    removeAd: function(){
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.removead.title'))
            .setContentText(i18n._('app.dialog.info.removead.description'))
            .show();
    },

    unlockRoundsBundle: function(roundsBundleNumber) {
        var idx = roundsBundleNumber - 1;
        appManager.getGameState().setRoundsBundles(idx, "isUnlocked", true);
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.unlockroundsbundle.title'))
            .setContentText(i18n._('app.dialog.info.unlockroundsbundle.description', number))
            .show();
    },

    setRoundsBundle: function(roundsBundleNumber, boolean) {
        var idx = roundsBundleNumber - 1;
        appManager.getGameState().setRoundsBundles(idx, "isUnlocked", boolean);
    }

});



var StoreFactory = function(platform){
    switch(platform){
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            return CordovaStore;
            break;

        case CONST.PLATFORM_SITE:
        default:
            return SiteStore;
            break;
    }
}

module.exports = {
    StoreFactory: StoreFactory,
    SiteStore: SiteStore,
    CordovaStore: CordovaStore,
    PRODUCT: PRODUCT
};



