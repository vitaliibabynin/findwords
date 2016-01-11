/** @jsx React.DOM */
"use strict";


var Dialog = function(params){
    params = params || {};

    this._dialogId = params.dialogId || 'modalDialog';
    this.title = params.title || CONFIG.lang._('app_dialog_Title');

    this._effect = 'md-effect-' + params.effect || 'slidebottom';
    this._isShowed = false;

    this._dialog = null;

    this.setTitle = function(title){
        this.title = title;
        this._dialog = null;

        return this;
    }

    this.getTitle = function(){
        return '<div class="md-title icon"> \
                    <h3>'+this.title+'</h3> \
                </div>';
    }

    this.getContent = function(){
        throw 'Dialog content not implemented'
    }

    this.getOverlay = function(){
        return '<div class="md-overlay"></div>';
    }

    this.getDialog = function(){
        if(null == this._dialog){
            this._dialog = $('<div class="md-overlay"><div class="md-modal '+this._effect+'" id="'+this._dialogId+'">'
                + this.getTitle()
                + this.getContent()
                + '</div></div>');
            this.prepareDialog(this._dialog);
        }
        return this._dialog;
    }

    this.prepareDialog = function(dialog){
        $('.md-close', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    this.clear = function(){

    },

    this.isShowed = function(){
        return this._isShowed;
    }

    this.show = function(){
        if(this.isShowed()){
            return;
        }

        this._isShowed = true;
        var $body = $('body');
        $body.append( this.getDialog() )
             //.append( this.getOverlay() )
        ;

        this.clear();

        setTimeout(function(){
            this.getDialog().addClass('md-show');
        }.bind(this), 100);
    }

    this.hide = function(){
        if(null == this._dialog){
            return;
        }

        this._dialog.removeClass('md-show');
        this._isShowed = false;
        setTimeout(function(){
            this._dialog.detach();
            //$('.md-overlay').remove();
        }.bind(this),300);
    }

}

var InfoDialog = function(){

    var dialog = new Dialog({
        dialogId: 'info-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.info.title')
    });

    dialog.contentText = '';
    dialog.setContentText = function(text){
        this.contentText = text;
        this._dialog = null;

        return this;
    }

    dialog.getContent = function(){
        return '<div class="md-content font-roboto"> \
                        <p>'+this.contentText+'</p> \
                        <div><a href="#" class="btn cancel">'+i18n._('app.dialog.info.button.cancel')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}

var ErrorDialog = function(){

    var dialog = new Dialog({
        dialogId: 'error-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.error.title')
    });

    dialog.contentText = '';
    dialog.setContentText = function(text){
        this.contentText = text;
        this._dialog = null;

        return this;
    }

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+this.contentText+'</p> \
                        <div><a href="#" class="btn cancel">'+i18n._('app.dialog.info.button.cancel')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}




var TurnOffAdsDialog = function() {
    var dialog = new Dialog({
        dialogId: 'turnoffads-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.turnoffads.title')
    });

    var productId = appManager.getSettings().getShopValue("removeAds")[CONST.CURRENT_PLATFORM];

    dialog.getContent = function(){
        var removeAdsPrice = appStore.getProductPrice(productId) || "$0";

        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.turnoffads.description')+' '+removeAdsPrice+'</p> \
                        <div><a href="#" class="btn turnoff">'+i18n._('app.dialog.turnoffads.button.turnoff')+'</a></div> \
                        <div><a href="#" class="btn cancel">'+i18n._('app.dialog.turnoffads.button.cancel')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.turnoff', dialog).bind( 'click', function( e ) {
            appStore.order(productId);
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}



var NoCoinsDialog = function(){

    var dialog = new Dialog({
        dialogId: 'nocoins-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.nocoins.title')
    });

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.nocoins.description')+'</p> \
                        <div><a href="#" class="btn buy">'+i18n._('app.dialog.nocoins.button.buy')+'</a></div> \
                        <div><a href="#" class="btn earn">'+i18n._('app.dialog.nocoins.button.earn')+'</a></div> \
                        <div><a href="#" class="btn cancel">'+i18n._('app.dialog.nocoins.button.cancel')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.buy', dialog).bind( 'click', function( e ) {
            //setTimeout(function(){
                router.navigate("shop", "index");
                //appDialogs.getBuyMoneyDialog().show();
            //}, 1000);
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.earn', dialog).bind( 'click', function( e ) {
            //this.hide();
            //setTimeout(function(){
                router.navigate("shop", "index");
                //appDialogs.getEarnMoneyDialog()
                //    .setInvitedFriendsCount(appManager.getGameStatus().inviteFriends.length)
                //    .show();
            //}, 1000);
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}

var EarnCoinsDialog = function(){

    var dialog = new Dialog({
        dialogId: 'earncoins-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.earncoins.title')
    });

    dialog.invitedFriendsCount = 0;
    dialog.setInvitedFriendsCount = function(invitedFriendsCount){
        this.invitedFriendsCount = invitedFriendsCount;
        this._dialog = null;

        return this;
    }

    dialog.getContent = function(){
        var inviteHtml = '<p>'+i18n._('app.dialog.earncoins.description')+'</p> \
                        <p><strong>'+i18n._('app.dialog.earncoins.invite')+'</strong><br/>\
                            <small>'+i18n._('app.dialog.earncoins.invite.1-50')+'</small><br/>\
                            <small>'+i18n._('app.dialog.earncoins.invite.51-100')+'</small>\
                        </p>\
                        <p>'+i18n._('app.dialog.earncoins.invitedfriends', this.invitedFriendsCount)+'</p>\
                        <div><a href="#" class="btn yellow invite">'+i18n._('app.dialog.earncoins.button.invite')+'</a></div>';

        var shareHtml = '<p>'+i18n._('app.dialog.earncoins.share.description', appManager.getPriceShare())+'</p> \
                        <div><a href="#" class="btn yellow share">'+i18n._('app.dialog.earncoins.button.share')+'</a></div>';

        var html = '<div class="md-content"> \
                        '+(appManager.canShare() ? shareHtml : inviteHtml)+' \
                        <br/><p>'+i18n._('app.dialog.earncoins.rewardedvideo')+'</p>\
                        <div><a href="#" class="btn yellow showvideo">'+i18n._('app.dialog.earncoins.button.showvideo')+'</a></div> \
                        <div><a href="#" class="btn brown cancel">'+i18n._('app.dialog.earncoins.button.cancel')+'</a></div> \
                 </div> \
                ';

        return html;
    }

    dialog.prepareDialog = function(dialog){
        $('.share', dialog).bind( 'click', function( e ) {
            this.hide();
            appManager.share();
            e.stopPropagation();
        }.bind(this));
        $('.invite', dialog).bind( 'click', function( e ) {
            this.hide();
            appManager.inviteFriends();
            e.stopPropagation();
        }.bind(this));
        $('.showvideo', dialog).bind( 'click', function( e ) {
            appAd.showRewardedVideo();
            this.hide();
            e.stopPropagation();
        }.bind(this));

        $('.cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}

var BuyCoinsDialog = function(){

    var PRODUCT = require('./app.store').PRODUCT;

    var dialog = new Dialog({
        dialogId: 'buycoins-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.buycoins.title')
    });

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.buycoins.description')+'</p> \
                        <div><a href="#" class="btn yellow buy" data-product-id="'+PRODUCT.COINS_10+'">'+i18n._('app.dialog.buycoins.button.buycoins', {coins: 10, price: appStore.getProductPrice(PRODUCT.COINS_10)})+'</a></div> \
                        <div><a href="#" class="btn yellow buy" data-product-id="'+PRODUCT.COINS_30+'">'+i18n._('app.dialog.buycoins.button.buycoins', {coins: 30, price: appStore.getProductPrice(PRODUCT.COINS_30)})+'</a></div> \
                        <div><a href="#" class="btn yellow buy" data-product-id="'+PRODUCT.COINS_100+'">'+i18n._('app.dialog.buycoins.button.buycoins', {coins: 100, price: appStore.getProductPrice(PRODUCT.COINS_100)})+'</a></div> \
                        <div><a href="#" class="btn brown cancel">'+i18n._('app.dialog.buycoins.button.cancel')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.btn.buy', dialog).bind( 'click', function( e ) {
            appStore.order( $(e.currentTarget).data('product-id') );
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}

var RequirePushDialog = function(){

    var dialog = new Dialog({
        dialogId: 'requirepush-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.requirepush.title')
    });
    dialog.isLoadedSettings = false;
    //dialog.showPeriod = 86400 * 5 * 1000;
    dialog.showPeriod = appManager.getSettings().getDialogs().requirePushShowPeriod * 86400 * 1000 || 86400 * 5 * 1000;

    dialog.settingsNamespace = 'dialogRequirePush';
    dialog.nextShowTime = 0;

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.requirepush.description')+'</p> \
                        <div><a href="#" class="btn ok">'+i18n._('app.dialog.requirepush.button.ok')+'</a></div> \
                        <div><a href="#" class="btn cancel">'+i18n._('app.dialog.requirepush.button.cancel')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.ok', dialog).bind( 'click', function( e ) {
            appNotificationLocal.registerPermissions();
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    dialog.loadSettings = function(){
        return new Promise(function(onSuccess, onError){
            if(this.isLoadedSettings){
                onSuccess();
                return;
            }

            DB.getSettings().get(this.settingsNamespace).then(function(settings){
                if(!settings){
                    onSuccess();
                    return;
                }

                this.nextShowTime = settings.nextShowTime || 0;
                this.isLoadedSettings = true;
                onSuccess();
            }.bind(this));
        }.bind(this));
    }

    dialog.saveSettings = function(){
        DB.getSettings().set(this.settingsNamespace, {
            nextShowTime: this.nextShowTime
        });
    }

    dialog.showIfTime = function(){
        this.loadSettings().then(function(){
            if(this.nextShowTime > Date.now()){
                return false;
            }

            this.nextShowTime = Date.now() + this.showPeriod;
            this.show();
            this.saveSettings();
        }.bind(this));
    }

    return dialog;
}

//var RateDialog = function(){
//
//    var dialog = new Dialog({
//        dialogId: 'rateus-dialog',
//        effect: 'slidebottom',
//        title: i18n._('app.dialog.rateus.title')
//    });
//    dialog.isLoadedSettings = false;
//    dialog.maxShowCount = 10;
//    dialog.settingsNamespace = 'dialogRateUs';
//    dialog.currentShowCount = 0;
//    dialog.isNeverShow = false;
//
//    dialog.getContent = function(){
//        return '<div class="md-content"> \
//                        <p>'+i18n._('app.dialog.rateus.description')+'</p> \
//                        <div><a href="#" class="btn rate-now">'+i18n._('app.dialog.rateus.button.rate')+'</a></div> \
//                        <div><a href="#" class="btn brown rate-later">'+i18n._('app.dialog.rateus.button.later')+'</a></div> \
//                        <div><a href="#" class="btn brown rate-never">'+i18n._('app.dialog.rateus.button.never')+'</a></div> \
//                 </div> \
//                ';
//    }
//
//    dialog.prepareDialog = function(dialog){
//        $('.rate-now', dialog).bind( 'click', function( e ) {
//            Utils.openAppInMarket();
//            this.saveNeverShow();
//            this.hide();
//            e.stopPropagation();
//        }.bind(this));
//        $('.rate-later', dialog).bind( 'click', function( e ) {
//            this.hide();
//            e.stopPropagation();
//        }.bind(this));
//        $('.rate-never', dialog).bind( 'click', function( e ) {
//            this.saveNeverShow();
//            this.hide();
//            e.stopPropagation();
//        }.bind(this));
//    }
//
//    dialog.loadSettings = function(){
//        return new Promise(function(onSuccess, onError){
//            if(this.isLoadedSettings){
//                onSuccess();
//                return;
//            }
//
//            DB.getSettings().get(this.settingsNamespace).then(function(settings){
//                if(!settings){
//                    onSuccess();
//                    return;
//                }
//
//                this.currentShowCount = settings.currentShowCount || 0;
//                this.isNeverShow = settings.isNeverShow || false;
//                this.isLoadedSettings = true;
//                onSuccess();
//            }.bind(this));
//        }.bind(this));
//    }
//
//    dialog.saveSettings = function(){
//        DB.getSettings().set(this.settingsNamespace, {
//            currentShowCount: this.currentShowCount,
//            isNeverShow: this.isNeverShow
//        });
//    }
//
//    dialog.saveNeverShow = function(){
//        this.isNeverShow = true;
//        this.saveSettings();
//    }
//
//    dialog.showIfTime = function(){
//        this.loadSettings().then(function(){
//            if(this.isNeverShow){
//                return false;
//            }
//
//            if(this.currentShowCount < this.maxShowCount){
//                this.currentShowCount++;
//                this.saveSettings();
//                return false;
//            }
//
//            this.currentShowCount = 0;
//            this.show();
//            this.saveSettings();
//        }.bind(this));
//    }
//
//    return dialog;
//}

var RateDialog = function(){

    var dialog = new Dialog({
        dialogId: 'rateus-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.rateus.title')
    });
    dialog.isLoadedSettings = false;
    dialog.maxShowCount = appManager.getSettings().getDialogs().rateUsMaxShowCount || 10;
    //dialog.maxShowCount = 1;
    dialog.settingsNamespace = 'dialogRateUs';
    dialog.currentShowCount = 0;
    dialog.isNeverShow = false;

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.rateus.description')+'</p> \
                        <div><a href="#" class="btn rate-now">'+i18n._('app.dialog.rateus.button.rate')+'</a></div> \
                        <div><a href="#" class="btn rate-later">'+i18n._('app.dialog.rateus.button.later')+'</a></div> \
                        <div><a href="#" class="btn rate-never">'+i18n._('app.dialog.rateus.button.never')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.rate-now', dialog).bind( 'click', function( e ) {
            Utils.openAppInMarket();
            this.saveNeverShow();
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.rate-later', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.rate-never', dialog).bind( 'click', function( e ) {
            this.saveNeverShow();
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    dialog.loadSettings = function(){
        return new Promise(function(onSuccess, onError){
            if(this.isLoadedSettings){
                onSuccess();
                return;
            }

            DB.getSettings().get(this.settingsNamespace).then(function(settings){
                if(!settings){
                    onSuccess();
                    return;
                }

                this.currentShowCount = settings.currentShowCount || 0;
                this.isNeverShow = settings.isNeverShow || false;
                this.isLoadedSettings = true;
                onSuccess();
            }.bind(this));
        }.bind(this));
    }

    dialog.saveSettings = function(){
        DB.getSettings().set(this.settingsNamespace, {
            currentShowCount: this.currentShowCount,
            isNeverShow: this.isNeverShow
        });
    }

    dialog.saveNeverShow = function(){
        this.isNeverShow = true;
        this.saveSettings();
    }

    dialog.showIfTime = function(){
        this.loadSettings().then(function(){
            if(this.isNeverShow){
                return false;
            }

            if(this.currentShowCount < this.maxShowCount){
                this.currentShowCount++;
                this.saveSettings();
                return false;
            }

            this.currentShowCount = 0;
            this.show();
            this.saveSettings();
        }.bind(this));
    }

    return dialog;
}

var AuthRequestDialog = function(){

    var dialog = new Dialog({
        dialogId: 'authrequest-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.authrequest.title')
    });

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.authrequest.description')+'</p> \
                        <div><a href="#" class="btn fb button-login">'+i18n._('app.dialog.authrequest.button.login')+'</a></div> \
                        <div><a href="#" class="btn brown button-notnow">'+i18n._('app.dialog.authrequest.button.notnow')+'</a></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.button-login', dialog).bind( 'click', function( e ) {
            appFB.login();
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.button-notnow', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}

/**************
 *
 *  NOT USED DIALOGS
 *
 */





//
//var PushRequestDialog = function(){
//
//    var dialog = new Dialog({
//        dialogId: 'pushrequest-dialog',
//        effect: 'slidebottom',
//        title: CONFIG.lang._('app_dialog_pushRequest_Title')
//    });
//    dialog.isLoadedSettings = false;
//    dialog.showPreiod = 604800 * 1000;
//    dialog.settingsNamespace = 'dialogPushRequest';
//    dialog.isNeverShow = false;
//    dialog.nextShowTime = 0;
//    dialog.handlerButtonYes = null;
//
//    dialog.setHandlerButtonYes = function(handler){
//        this.handlerButtonYes = handler;
//    }
//
//    dialog.getContent = function(){
//        return '<div class="md-content"> \
//                        <p>'+CONFIG.lang._('app_dialog_pushRequest_dialog_Description')+'</p> \
//                        <div><button class="rate-yes">'+CONFIG.lang._('app_dialog_pushRequest_dialog_buttonYes')+'</button></div> \
//                        <div><button class="rate-no">'+CONFIG.lang._('app_dialog_pushRequest_dialog_buttonNo')+'</button></div> \
//                 </div> \
//                ';
//    }
//
//    dialog.prepareDialog = function(dialog){
//        $('.rate-yes', dialog).bind( 'click', function( e ) {
//            this.saveNeverShow();
//            if(this.handlerButtonYes && typeof this.handlerButtonYes == 'function'){
//                this.handlerButtonYes();
//            }
//            this.hide();
//            e.stopPropagation();
//        }.bind(this));
//        $('.rate-no', dialog).bind( 'click', function( e ) {
//            this.saveNextShowTime();
//            this.hide();
//            e.stopPropagation();
//        }.bind(this));
//    }
//
//    dialog.loadSettings = function(){
//        return when.promise(function(onSuccess, onError, onProgress){
//            if(this.isLoadedSettings){
//                onSuccess();
//                return;
//            }
//
//            CONFIG.db.getSettings().get(this.settingsNamespace, function(err, settings){
//                if(!settings){
//                    onSuccess();
//                    return;
//                }
//
//                this.nextShowTime = settings.nextShowTime || 0;
//                this.isNeverShow = settings.isNeverShow || false;
//                this.isLoadedSettings = true;
//                onSuccess();
//            }.bind(this));
//        }.bind(this));
//    }
//
//    dialog.saveSettings = function(){
//        CONFIG.db.getSettings().set(this.settingsNamespace, {
//            nextShowTime: this.nextShowTime,
//            isNeverShow: this.isNeverShow
//        });
//    }
//
//    dialog.saveNeverShow = function(){
//        this.isNeverShow = true;
//        this.saveSettings();
//    }
//
//    dialog.saveNextShowTime = function(){
//        this.nextShowTime = Date.now() + this.showPreiod;
//        this.saveSettings();
//    }
//
//    dialog.showIfTime = function(){
//        this.loadSettings().done(function(){
//            if(this.isNeverShow){
//                return false;
//            }
//
//            if(this.nextShowTime >= Date.now()){
//                return false;
//            }
//
//            this.show();
//        }.bind(this));
//    }
//
//    return dialog;
//}



var AuthErrorDialog = function(){

    var dialog = new Dialog({
        dialogId: 'autherror-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.autherror.title')
    });

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.autherror.description')+'</p> \
                        <div><button class="button-ok subprimary">'+i18n._('app.dialog.autherror.button.ok')+'</button></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.button-ok', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}

var AuthSessionExpiredDialog = function(){

    var dialog = new Dialog({
        dialogId: 'authsessionexpired-dialog',
        effect: 'slidebottom',
        title: i18n._('app.dialog.authsessionexpired.title')
    });

    dialog.getContent = function(){
        return '<div class="md-content"> \
                        <p>'+i18n._('app.dialog.authsessionexpired.description')+'</p> \
                        <div><button class="button-auth primary">'+i18n._('app.dialog.authsessionexpired.button.upadateauth')+'</button></div> \
                        <div><button class="button-cancel ">'+i18n._('app.dialog.authsessionexpired.button.later')+'</button></div> \
                 </div> \
                ';
    }

    dialog.prepareDialog = function(dialog){
        $('.button-auth', dialog).bind( 'click', function( e ) {
            appAccount.goToLoginPage();
            this.hide();
            e.stopPropagation();
        }.bind(this));
        $('.button-cancel', dialog).bind( 'click', function( e ) {
            this.hide();
            e.stopPropagation();
        }.bind(this));
    }

    return dialog;
}




var Dialogs = {
    _dialogs: {},

    //_getDialog: function(dialogId, dialogType){
    //    if(!this._dialogs.hasOwnProperty(dialogId) && null == this._dialogs[dialogId]){
    //        this._dialogs[dialogId] = new dialogType();
    //    }
    //
    //    return this._dialogs[dialogId];
    //},

    _getDialog: function(dialogId, dialogType){
//        if(!this._dialogs.hasOwnProperty(dialogId) && null == this._dialogs[dialogId]){
//            this._dialogs[dialogId] = new dialogType();
//        }

        return new dialogType();
    },

    /**
     * Инфо окно с текстом
     */
    getInfoDialog: function(){
        return this._getDialog("InfoDialog", InfoDialog);
    },

    getErrorDialog: function(){
        return this._getDialog("ErrorDialog", ErrorDialog);
    },


    /**
     *  Выключить Рекламу
     */
    getTurnOffAdsDialog: function(){
        return this._getDialog("TurnOffAdsDialog", TurnOffAdsDialog);
    },




    /**
     * Нет монет
     */
    getNoMoneyDialog: function(){
        return this._getDialog("NoCoinsDialog", NoCoinsDialog);
    },

    /**
     * Заработать монеты
     */
    getEarnMoneyDialog: function(){
        return this._getDialog("EarnCoinsDialog", EarnCoinsDialog);
    },

    /**
     * Купить монеты
     */
    getBuyMoneyDialog: function(){
        return this._getDialog("BuyCoinsDialog", BuyCoinsDialog);
    },

    /**
     * Запрашиваем разрешение на уведомления
     */
    getRequirePushDialog: function(){
        return this._getDialog("RequirePushDialog", RequirePushDialog);
    },

    /**
     * Оцените нас
     */
    getRateDialog: function(){
        return this._getDialog("rateDialog", RateDialog);
    },

    /**
     * Требуется авторизация
     */
    getAuthRequestDialog: function(){
        return this._getDialog("authRequerstDialog", AuthRequestDialog);
    },











    /**
     * Произошла ошибка во время авторизации
     */
    getAuthErrorDialog: function(){
        return this._getDialog("authErrorDialog", AuthErrorDialog);
    },

    getAuthSessionExpiredDialog: function(){
        return this._getDialog("authSessionExpiredDialog", AuthSessionExpiredDialog);
    },










    getPushRequestDialog: function(){
        return this._getDialog("pushRequestDialog", PushRequestDialog);
    }

}

module.exports = Dialogs;



