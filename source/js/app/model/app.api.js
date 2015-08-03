"use strict";

var ApiClass = function(apiUrl, apiVersion){
    this.ACCOUNT_NOT_FOUND = 101;
    this.NOT_FOUND = 103;
    this.WRONG_AUTH_TOKEN = 105;


    if(apiUrl && typeof apiUrl == "string" && apiUrl.substr(-1) != '/'){
        apiUrl += '/';
    }

    this.accessToken = null;
    this.apiUrl = apiUrl;
    this.apiVersion = apiVersion;

    this.jqXHR = {};

    //appAccount.addChangeTokenListener(function(){
    //    this.setAccessToken(appAccount.token);
    //}.bind(this));

    this.setAccessToken = function(newAccessToken){
        this.accessToken = newAccessToken;
    }

    this.hasAccessToken = function(){
        return null != this.accessToken;
    }

    this.isErrorResponse = function(response){
        if(response && response.status && response.status == 'ok' && response.data){
            return false;
        }

        if(response && response.error && response.error.code){
            switch(parseInt(response.error.code)){
                //case this.ACCOUNT_NOT_FOUND:
                case this.WRONG_AUTH_TOKEN:
                    appDialogs.getAuthSessionExpiredDialog().show();
                    break;

                default:
                    break;
            }
        }

        return true;
    }

    this.abortXHR = function(xhrKey){
        if(!this.jqXHR.hasOwnProperty(xhrKey)){ return; }
        this.jqXHR[xhrKey].abort();
        //this.clearXHR(xhrKey);
    }
    this.clearXHR = function(xhrKey){
        //console.log('clear: '+xhrKey);
        if(!this.jqXHR.hasOwnProperty(xhrKey)){ return; }
        delete this.jqXHR[xhrKey];
    }

    this.makeRequest = function(httpMethod, method, params, withoutAccessToken){
        this.abortXHR(method);
        return new Promise(function(onSuccess, onError){
            if(!params){
                params = {};
            }
            if(this.accessToken && !withoutAccessToken){
                params.gtoken = this.accessToken;
            }
            params.v = this.apiVersion;

            this.jqXHR[method] = $.ajax({
                type: httpMethod,
                url: this.apiUrl + method,
                data: params,
                dataType: 'json'
            }).done(function(response) {
                    this.clearXHR(method);
                    if(this.isErrorResponse(response)){
                        onError(response.error);
                        return;
                    }
                    onSuccess(response.data);
                }.bind(this))
            .fail(function(jqxhr, textStatus, error) {
                    if(textStatus == 'abort'){
                        return;
                    }

                    this.clearXHR(method);
                    onError();
                }.bind(this));
        }.bind(this));
    }


/*
ПРИМЕР МЕТОДА
    this.signin = function(authType, authData, appOS, lang){
        var params = {
            type: authType,
            data: authData,
            appos: appOS,
            lang: lang
        }
        return this.makeRequest('GET', 'game/manvswoman/signin', params);
    }
*/

};

module.exports = ApiClass;






