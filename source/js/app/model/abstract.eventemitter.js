
var EventEmitter = require('events').EventEmitter;
var Object = {assign: require('react/lib/Object.assign')};

var EVENT_CHANGE = "eventChange";
var EVENT_CHANGE_ROUNDS_BUNDLES = "eventChangeRoundsBundles";
var EVENT_CHANGE_COINS = "eventChangeCoins";


var AbstractEventEmitter = Object.assign({}, EventEmitter.prototype, {

    addChangeListener: function(callback){
        this.on(EVENT_CHANGE, callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(EVENT_CHANGE, callback);
    },
    emitChange: function(){
        this.emit(EVENT_CHANGE, this);
    },


    addChangeRoundsBundlesListener: function(callback){
        this.on(EVENT_CHANGE_ROUNDS_BUNDLES, callback);
    },
    removeChangeRoundsBundlesListener: function(callback){
        this.removeListener(EVENT_CHANGE_ROUNDS_BUNDLES, callback);
    },
    emitChangeRoundsBundles: function(){
        this.emit(EVENT_CHANGE_ROUNDS_BUNDLES, this);
    },


    addChangeCoinsListener: function(callback){
        this.on(EVENT_CHANGE_COINS, callback);
    },
    removeChangeCoinsListener: function(callback){
        this.removeListener(EVENT_CHANGE_COINS, callback);
    },
    emitChangeCoins: function(){
        this.emit(EVENT_CHANGE_COINS, this);
    }

});

module.exports = AbstractEventEmitter;



