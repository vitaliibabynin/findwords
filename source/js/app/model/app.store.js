/** @jsx React.DOM */
"use strict";

var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};


var PRODUCT = {
    COINS_10: CONST.CURRENT_PLATFORM == CONST.PLATFORM_ANDROID ? 'android_coins_10' : 'coins_10',
    COINS_30: 'coins_30',
    COINS_100: 'coins_100',
    REMOVE_AD: 'remove_ad'
}

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

            store.register({
                id: PRODUCT.COINS_10,
                alias: PRODUCT.COINS_10,
                type: store.CONSUMABLE
            });
            store.register({
                id: PRODUCT.COINS_30,
                alias: PRODUCT.COINS_30,
                type: store.CONSUMABLE
            });
            store.register({
                id: PRODUCT.COINS_100,
                alias: PRODUCT.COINS_100,
                type: store.CONSUMABLE
            });
            store.register({
                id: PRODUCT.REMOVE_AD,
                alias: PRODUCT.REMOVE_AD,
                type: store.NON_CONSUMABLE
            });


            store.ready(function() {
                console.log('store.ready');
                resolve();
            });

            store.when(PRODUCT.COINS_10).approved(function (order) {
                this.addCoins(10);
                order.finish();
            }.bind(this));
            store.when(PRODUCT.COINS_30).approved(function (order) {
                this.addCoins(30);
                order.finish();
            }.bind(this));
            store.when(PRODUCT.COINS_100).approved(function (order) {
                this.addCoins(100);
                order.finish();
            }.bind(this));

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

    addCoins: function(coins){
        appSettings.addCoins(coins);
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.addcoins.title'))
            .setContentText(i18n._('app.dialog.info.addcoins.description', coins))
            .show();
    },

    removeAd: function(coins){
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.removead.title'))
            .setContentText(i18n._('app.dialog.info.removead.description'))
            .show();
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



