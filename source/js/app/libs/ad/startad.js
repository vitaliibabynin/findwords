"use strict";

(function () {

	function StartAD(appId){
        this.appId = appId;
        this.bannerList = {};
        this.zoom = null;

        this.listeners = {
            onLoad: null,
            onError: null,
            onAdNotFound: null
        }

        this.setApplicationId = function(appId){
            this.appId = appId;
        }

        this.setZoom = function(zoom){
            this.zoom = zoom;
        }

        this.setOnLoadListener = function(listener){
            this.listeners.onLoad = listener;
        }

        this.setOnErrorListener = function(listener){
            this.listeners.onError = listener;
        }

        this.setOnAdNotFoundListener = function(listener){
            this.listeners.onAdNotFound = listener;
        }

        this.showAd = function(layout, params){
            if(typeof layout != 'object'){
                layout = document.getElementById(layout);
            }

            params = params || {};
            params.placeid = params.placeid || StartAD.CONST.PLACE_ID_DEFAULT;
            if(!params.hasOwnProperty("language")){
                throw "StartAD.loadAd param language not found.";
            }


            if(this.bannerList && this.bannerList.hasOwnProperty(params.placeid)){
                this._showInLayout(layout, params.placeid);
                return;
            }

            var url = StartAD.CONST.URL_GET_AD
                        + 'aid='+this.appId
                        +'&pid='+params.placeid
                        +'&l='+params.language
                        +'&t='+Date.now();
            if(window.hasOwnProperty('device') && window.device && window.device.hasOwnProperty('uuid')){
                url += '&did=' + window.device.uuid
            }

            var xmlRequest = this._getXmlHttpRequest();
            xmlRequest.open('GET', url, true);
            xmlRequest.onreadystatechange = function() {
                if (xmlRequest.readyState != 4) {
                    return;
                }

                if(xmlRequest.status != 200) {
                    //TODO: error handler
                    return;
                }

                try{
                    var response = JSON.parse(xmlRequest.responseText);
                    if(!response || !response.status || response.status != 'ok'){
                        if(this.listeners.onError && typeof this.listeners.onError == 'function'){
                            this.listeners.onError();
                        }
                        return;
                    }

                    this._updateBannerList(params.placeid, response.data);
                    this._showInLayout(layout, params.placeid);
                }catch(e){
                    console.log(e);
                    if(this.listeners.onError && typeof this.listeners.onError == 'function'){
                        this.listeners.onError();
                    }
                }
            }.bind(this);
            xmlRequest.send(null);
        }

        this._updateBannerList = function(placeId, bannerlist){
            this.bannerList[placeId] = bannerlist;
            this.bannerList[placeId].lastShowedIdx = 0;
            this.bannerList[placeId].isShowed = false;
        }

        this._onPostMessage = function(event){
            if(event.origin && event.origin != null && event.origin != "null"){
                return;
            }

            try{
                var data = JSON.parse(event.data);
                if(!data || !data.type || data.type != 'startad_click' || !data.url){
                    return;
                }

                window.open(data.url, '_system');

                //console.log(event.origin + " прислал: " + event.data );
            }catch(e){ }

        }


        this._showInLayout = function(layout, placeId){
            if(!this.bannerList || !this.bannerList.hasOwnProperty(placeId)
                || !this.bannerList[placeId].ad || this.bannerList[placeId].ad.length <= 0){
                if(this.listeners.onAdNotFound && typeof this.listeners.onAdNotFound == 'function'){
                    this.listeners.onAdNotFound();
                }
                return;
            }

            var bannerList = this.bannerList[placeId];
            if(bannerList.ad.length <= bannerList.lastShowedIdx){
                this.bannerList[placeId].lastShowedIdx = 0;
            }

            var html = bannerList.ad[this.bannerList[placeId].lastShowedIdx].html;
            html = html.replace('%targetOrigin%', document.location.protocol +'//'+ document.location.host);

            var htmlFontSize = window.getComputedStyle(document.querySelector('html'), null).getPropertyValue('font-size');
            if(htmlFontSize && htmlFontSize.length > 0){
                html = html.replace('</style', ' html{font-size: '+htmlFontSize+'}</style');
            }
            if(null != this.zoom && this.zoom != 0){
                html = html.replace('</style', ' html{zoom: '+this.zoom+';}</style');
            }


            var src = 'data:text/html;charset=utf-8,' + encodeURI(html);
            var iframeWidth = layout.clientWidth;
            if(iframeWidth <= 0){
                iframeWidth = '100%';
            }else{
                iframeWidth += 'px';
            }
            var iframe = '<iframe class="startadiframe '+placeId+'" src="'+src+'" style="height: '+bannerList.banner_size+'px !important; width: '+iframeWidth+' !important; border: none; padding: 0px; margin: 0px;"></iframe>';

            layout.innerHTML = iframe;
            layout.style.height = bannerList.banner_size+'px';
            this.bannerList[placeId].lastShowedIdx++;
            this.bannerList[placeId].isShowed = true;

            if(this.listeners.onLoad && typeof this.listeners.onLoad == 'function'){
                this.listeners.onLoad();
            }
        }

        this._getXmlHttpRequest = function(){
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        }


        if (window.addEventListener){
            window.addEventListener("message", this._onPostMessage.bind(this),false);
        } else {
            window.attachEvent("onmessage", this._onPostMessage.bind(this));
        }
    }


    StartAD.CONST = {
        LANGUAGE_RU: "ru",
        LANGUAGE_EN: "en",

        PLACE_ID_DEFAULT: "default",

        BANNERSIZE_80: 80,
        BANNERSIZE_120: 120,

        URL_GET_AD: "http://api.startad.mobi/ad/get/?st=jsiframe&"
    }



	if (typeof module !== 'undefined' && module.exports) {
		module.exports = StartAD;
	} else {
		window.StartAD = StartAD;
	}
})();
