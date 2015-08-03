/** @jsx React.DOM */
"use strict";

var CordovaStorage = {
    set: function(key, val, callback){
        Preferences.put(key, val, function(){
            callback(false);
        }, function(){
            callback(true);
        });
    },

    get: function(key, callback){
        Preferences.get(key, function(val){
            if(val && typeof val == 'string' && val.substr(0,1) == '{' && val.substr(-1,1) == '}'){
                val = JSON.parse(val);
            }
            callback(false, val);
        }, function(){
            callback(true);
        });
    },

    del: function(key, callback){
        this.set(key, null, callback);
    }
}

var Storage = function(){

    var storage = null;
    if(CONST.IS_CORDOVA_APP){
        storage = CordovaStorage;
    }else{
        storage = require('asyncstorage' );
        storage.forage.config({ name: 'app.storage' });
    }

    return storage;
}

var Table = function(storage, namespace){
    this.storage = storage;
    this.namespace = namespace;

    this._getKey = function(key){
        return this.namespace + '_' + key;
    }

    this.set = function(key, val){
        return new Promise(function(resolve, reject){
            this.storage.set(this._getKey(key), val, function(err){
                if(err){
                    reject(err);
                    return;
                }

                resolve();
            });
        }.bind(this));
    }

    this.get = function(key){
        return new Promise(function(resolve, reject){
            this.storage.get(this._getKey(key), function(err, val){
                if(err){
                    reject(err);
                    return;
                }

                resolve(val);
            });
        }.bind(this));
    }

    this.del = function(key){
        return new Promise(function(resolve, reject){
            this.storage.del(this._getKey(key), function(err){
                if(err){
                    reject(err);
                    return;
                }

                resolve();
            });
        }.bind(this));
    }

}

var DB = function(){
    this.storage = new Storage();

    this._tables = {};

    this._getTable = function(tableParam, namespace){
        if(!this._tables.hasOwnProperty(tableParam) && null == this._tables[tableParam]){
            this._tables[tableParam] = new Table(this.storage, namespace);
        }

        return this._tables[tableParam];
    }


    this.getSettings = function(){
        return this._getTable('settingsTable', 'settings');
    }
}



module.exports = {
    DB: DB
}




