
var LoadingScreen = {
    getHTMLSpiner: function(){
        return "<div class='sk-spinner sk-spinner-chasing-dots'><div class='sk-dot1'></div><div class='sk-dot2'></div></div>";
    },
    getHTMLMessage: function(message){
        message = message || "";
        return "<p class='loading-message'>"+message+"</p>";
    },

    getPleaseWaitObj: function(){
        if(!window.pleeaseWaitObj || typeof window.pleeaseWaitObj != 'object'){
            //return {
            //    updateLoadingHtml: function(html){
                    //console.log((cordova && cordova.file && cordova.file.applicationDirectory ? cordova.file.applicationDirectory + 'www/' : '') + CONST.STATIC_IMAGE_URL + "logo/logo-100x100.png");
                    window.pleeaseWaitObj = window.pleaseWait({
                        logo: (window.cordova && window.cordova.file && window.cordova.file.applicationDirectory ? window.cordova.file.applicationDirectory + 'www/' : '') + CONST.STATIC_IMAGE_URL + (documentWidth >= 640 ? "man/man_logo_2x.png" : "man/man_logo.png"),
                        backgroundColor: '#E6D2B8',
                        loadingHtml: /*html ||*/ this.getHTMLMessage() + this.getHTMLSpiner()
                    });
            //    }
            //}

        }

        return window.pleeaseWaitObj;
    },

    updateMessage: function(message){
        var pleaseWaitObj = this.getPleaseWaitObj();
        pleaseWaitObj.updateLoadingHtml(
            this.getHTMLMessage(message) + this.getHTMLSpiner()
        );
    },

    showSelectLanguageForm: function(){
        var formSelectLangHtml = "<p class='form-loadingscreen form-selectlanguage'>";
        for(var lang in CONST.LANG_STRINGS){
            if(!CONST.LANG_STRINGS.hasOwnProperty(lang)){ continue; }
            formSelectLangHtml += "<a href='/"+lang+"' class='btn' onclick='router.navigate( \""+lang+"\" ); return false;' data-lang='"+lang+"'>"+i18n._('language.'+lang)+"</a>";
        }
        formSelectLangHtml += "</p>";

        var pleaseWaitObj = this.getPleaseWaitObj();
        pleaseWaitObj.updateLoadingHtml(formSelectLangHtml);
    },

    showErrorLoadingForm: function(){
        var formHtml = "<div class='form-loadingscreen form-errorloading'>";
        formHtml += "<p>" + i18n._('loadingscreen.errorloading.message') + "</p>";
        formHtml += "<a href='#' onclick='refreshApp(); return false;' class='btn'>"+i18n._('loadingscreen.errorloading.button.reload')+"</a>";
        formHtml += "</div>";


        var pleaseWaitObj = this.getPleaseWaitObj();
        pleaseWaitObj.updateLoadingHtml(formHtml);
    },

    hide: function(){
        if(!window.pleeaseWaitObj || typeof window.pleeaseWaitObj != 'object'){
            return;
        }

        window.pleeaseWaitObj.finish();
        window.pleeaseWaitObj = null;

        setTimeout(function(){
            $('.pg-loading-screen').remove();
        }, 500);

    }
}

module.exports = LoadingScreen;