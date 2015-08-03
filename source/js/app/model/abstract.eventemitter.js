
var EventEmitter = require('events').EventEmitter;
var Object = {assign: require('react/lib/Object.assign')};

var EVENT_CHANGE = "eventChange";



var AbstractEventEmitter = Object.assign({}, EventEmitter.prototype, {

    addChangeListener: function(callback){
        this.on(EVENT_CHANGE, callback);
    },

    removeChangeListener: function(callback){
        this.removeListener(EVENT_CHANGE, callback);
    },

    emitChange: function(){
        this.emit(EVENT_CHANGE, this);
    }

});

module.exports = AbstractEventEmitter;



