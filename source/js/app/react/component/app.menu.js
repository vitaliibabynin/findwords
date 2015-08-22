/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var IconButton = require('./app.button').IconButton;
var FbButton = require('./app.button').FbButton;

module.exports = {};


var BUTTON_LAYOUT_MENU = "menu";
var BUTTON_LAYOUT_SETTINGS = "settings";
var BUTTON_LAYOUT_SETTINGS_LANG = "settings_lang";

var BUTTON_SETTINGS = "settings";
var BUTTON_SETTINGS_LANGUAGES = "settings_languages";
var BUTTON_SETTINGS_MUSIC = "settings_music";
var BUTTON_SETTINGS_SOUND = "settings_sound";
var BUTTON_SETTINGS_LANG_RU = "settings_lang_ru";
var BUTTON_SETTINGS_LANG_EN = "settings_lang_en";


var NavigationClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    getInitialState: function () {

        var state = {
            buttonLayout: BUTTON_LAYOUT_SETTINGS,
            buttonsData: this.getInitialButtonsData()
        };

        return state;
    },

    getInitialButtonsData: function(){
        var buttons = {};
        buttons[BUTTON_SETTINGS] = {id: BUTTON_SETTINGS, title: i18n._('button.settings'), icon: "settings", onClick: this.onClick };
        buttons[BUTTON_SETTINGS_LANGUAGES] = {id: BUTTON_SETTINGS_LANGUAGES, title: i18n._('button.languages'), icon: router.getLanguage(), onClick: this.onClick };
        buttons[BUTTON_SETTINGS_MUSIC] = {id: BUTTON_SETTINGS_MUSIC, title: i18n._('button.music'), icon: "music", onClick: this.onClick };
        buttons[BUTTON_SETTINGS_SOUND] = {id: BUTTON_SETTINGS_SOUND, title: i18n._('button.sound'), icon: "sound", onClick: this.onClick };
        buttons[BUTTON_SETTINGS_LANG_RU] = {id: BUTTON_SETTINGS_LANG_RU, title: i18n._('language.ru'), icon: CONST.LANGUAGE_RU, onClick: this.onClick };
        buttons[BUTTON_SETTINGS_LANG_EN] = {id: BUTTON_SETTINGS_LANG_EN, title: i18n._('language.en'), icon: CONST.LANGUAGE_EN, onClick: this.onClick };

        return buttons;
    },

    getButtonsToShow: function(buttonLayout){
        buttonLayout = buttonLayout || this.state.buttonLayout;
        var buttonItems = [];

        switch(buttonLayout){
            case BUTTON_LAYOUT_MENU:

                break;
            case BUTTON_LAYOUT_SETTINGS:
                buttonItems.push({id: BUTTON_SETTINGS, isPressed: true});
                buttonItems.push({id: BUTTON_SETTINGS_LANGUAGES, isPressed: false});
                buttonItems.push({id: BUTTON_SETTINGS_MUSIC, isPressed: false, icon: appManager.getGameState().getMusic() ? "music" : "music_off"});
                buttonItems.push({id: BUTTON_SETTINGS_SOUND, isPressed: false, icon: appManager.getGameState().getSound() ? "sound" : "sound_off"});
                break;
            case BUTTON_LAYOUT_SETTINGS_LANG:
                buttonItems.push({id: BUTTON_SETTINGS, isPressed: true});
                buttonItems.push({id: BUTTON_SETTINGS_LANGUAGES, isPressed: true});
                buttonItems.push({id: BUTTON_SETTINGS_LANG_RU, isPressed: CONST.LANGUAGE_RU == router.getLanguage()});
                buttonItems.push({id: BUTTON_SETTINGS_LANG_EN, isPressed: CONST.LANGUAGE_EN == router.getLanguage()});
                break;
        }

        return buttonItems;
    },

    onClick: function(buttonProps){
        switch(buttonProps.id){
            case BUTTON_SETTINGS:
                this.setState({buttonLayout: BUTTON_LAYOUT_SETTINGS});
                break;
            case BUTTON_SETTINGS_LANGUAGES:
                this.setState({buttonLayout: this.state.buttonLayout == BUTTON_LAYOUT_SETTINGS_LANG ? BUTTON_LAYOUT_SETTINGS : BUTTON_LAYOUT_SETTINGS_LANG});
                break;
            case BUTTON_SETTINGS_MUSIC:
                appManager.getGameState().setMusic(!appManager.getGameState().getMusic());
                this.forceUpdate();
                break;
            case BUTTON_SETTINGS_SOUND:
                appManager.getGameState().setSound(!appManager.getGameState().getSound());
                this.forceUpdate();
                break;
            case BUTTON_SETTINGS_LANG_RU:
                //ничего не делаем если язык уже выставлен точно такой же на кнопку которого мы клацаем
                if(router.getLanguage() == CONST.LANGUAGE_RU){ return; }
                appManager.changeLangAndReload(CONST.LANGUAGE_RU);
                break;
            case BUTTON_SETTINGS_LANG_EN:
                //ничего не делаем если язык уже выставлен точно такой же на кнопку которого мы клацаем
                if(router.getLanguage() == CONST.LANGUAGE_EN){ return; }
                appManager.changeLangAndReload(CONST.LANGUAGE_EN);
                break;
        }
    },


    render: function () {
        var classses = classNames("navigation", this.state.buttonLayout + '-layout');

        var buttons = this.getButtonsToShow().map(function(item, idx, allItems){
            var button = this.state.buttonsData[item.id];
            button.icon = item.hasOwnProperty('icon') ? item.icon : button.icon;

            var classes = classNames(item.isPressed ? "hover" : "");

            return (
                <IconButton
                    id={button.id}
                    className={classes}
                    icon={button.icon}
                    onClick={button.onClick}>{button.title}</IconButton>
            )
        }.bind(this));

        return (
            <div className={classses}>
                {buttons}
            </div>
        )



        //if (this.state.buttonLayout === "settings") {
        //    return this.renderSettings();
        //
        //} else if (this.state.buttonLayout === "menuFacebookOnline") {
        //    return this.renderMenuFacebookOnline();
        //
        //} else if (this.state.buttonLayout === "languages") {
        //    return this.renderLanguages();
        //
        //} else if (this.state.buttonLayout === "musicOff") {
        //    return this.renderMusicOff();
        //
        //} else if (this.state.buttonLayout === "soundOff") {
        //    return this.renderSoundOff();
        //
        //} else if (this.state.buttonLayout === "musicSoundOff") {
        //    return this.renderMusicSoundOff();
        //
        //} else {
        //    return this.renderMenuFacebookOffline();
        //}

    }



    //settingsLayout: {
    //
    //    buttons: {
    //        settingsIsPressed: <IconButton buttonId="settings" className="settings hover" icon="settings"
    //                                       onClick={this.onClick}>{i18n._('button.settings')}</IconButton>,
    //        languages: <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
    //                               onClick={this.onClick}>{i18n._('button.languages')}</IconButton>,
    //        languagesIsPressed: <IconButton buttonId="languages" className="languages hover" icon={router.getLanguage()}
    //                                        onClick={this.onClick}>{i18n._('button.languages')}</IconButton>,
    //        music: <IconButton buttonId="music" className="music" icon="music"
    //                           onClick={this.onClick}>{i18n._('button.music')}</IconButton>,
    //        musicIsPressed: <IconButton buttonId="music" className="music" icon="music_off"
    //                                    onClick={this.onClick}>{i18n._('button.music')}</IconButton>,
    //        sound: <IconButton buttonId="sound" className="sound" icon="sound"
    //                           onClick={this.onClick}>{i18n._('button.sound')}</IconButton>,
    //        soundIsPressed: <IconButton buttonId="sound" className="sound" icon="sound_off"
    //                                    onClick={this.onClick}>{i18n._('button.sound')}</IconButton>,
    //        russian: <IconButton buttonId="russian" className="russian" icon="ru"
    //                             onClick={this.onClick}>Русский</IconButton>,
    //        english: <IconButton buttonId="english" className="english" icon="en"
    //                             onClick={this.onClick}>English</IconButton>
    //    }
    //},

    //renderSettingsLayout: function () {
    //
    //    return (
    //        this.settingsLayout.buttons.english +
    //            this.settingsLayout.buttons.russian
    //    );
    //
    //
    //    //var buttons = this.state.settingsLayout.buttons;
    //    ////var cFL = Utils.capitalizeFirstLetter();
    //    //var render;
    //    //
    //    //for (var buttonName in buttons) {
    //    //    var renderButton;
    //    //    if (buttonName.display) {
    //    //        renderButton = "this.render" + buttonName;
    //    //        console.log(renderButton)
    //    //        if (buttonName.isPressed) {
    //    //            renderButton += "IsPressed";
    //    //        }
    //    //        console.log(renderButton);
    //    //        render += {renderButton};
    //    //    }
    //    //}
    //    //
    //    //return render;
    //
    //},

    //updateState: function() {
    //
    //    this.setState.buttonLayout = this.getSavedLayout();
    //
    //}
    //,
    //
    //getSavedLayout: function() {
    //    return appManager.getGameState().getButtonLayout();
    //}
    //,
    //
    //chooseLayout: function(room) {
    //    if (room === "menu") {
    //        this.menuLayout();
    //    } else if (room === "settings") {
    //        this.settingsLayout();
    //    }
    //}
    //,
    //
    //menuLayout: function () {
    //
    //    //if (false) {
    //    //    return "menuFacebookOnline";
    //    //} else {
    //    return "menuFacebookOffline";
    //    //}
    //
    //}
    //,
    //
    //settingsLayout: function () {
    //
    //    if (!appManager.getGameState().getMusic() && !appManager.getGameState().getSound()) {
    //        return "musicSoundOff"
    //    } else if (!appManager.getGameState().getMusic() && appManager.getGameState().getSound()) {
    //        return "musicOff"
    //    } else if (appManager.getGameState().getMusic() && !appManager.getGameState().getSound()) {
    //        return "soundOff"
    //    } else if (appManager.getGameState().getSettings()) {
    //        return "settings"
    //    } else if (appManager.getGameState().getLanguages()) {
    //        return "languages"
    //    }
    //
    //}
    //,
    //
    //onClick: function (buttonProps) {
    //
    //    //settings clicked
    //    if (buttonProps.buttonId === "settings") {
    //        var room;
    //        if (appManager.getGameState().getSettings()) {
    //            room = "menu";
    //        } else {
    //            room = "settings"
    //        }
    //        this.setState({buttonLayout: this.getLayout(room)})
    //    }
    //
    //    //facebook clicked
    //    //else if (buttonProps.buttonId === "facebook") {
    //    //    this.setState({buttonLayout: this.menuLayout()})
    //    //}
    //
    //    //languages clicked
    //    else if (buttonProps.buttonId === "languages") {
    //        var room;
    //        if (this.state.buttonLayout === "languages") {
    //            room = "settings";
    //        } else {
    //            this.setState({buttonLayout: "languages"})
    //        }
    //        this.saveState(buttonLayout, languages)
    //    }
    //
    //    else if (buttonProps.buttonId === "music") {
    //        if (appManager.getGameState().getMusic()) {
    //            appManager.getGameState().setMusic(false);
    //        } else {
    //            appManager.getGameState().setMusic(true);
    //        }
    //        this.setState({buttonLayout: this.settingsLayout()})
    //    }
    //
    //    else if (buttonProps.buttonId === "sound") {
    //        if (appManager.getGameState().getSound()) {
    //            appManager.getGameState().setSound(false);
    //        } else {
    //            appManager.getGameState().setSound(true);
    //        }
    //        this.setState({buttonLayout: this.settingsLayout()})
    //    }
    //
    //    else if (buttonProps.buttonId === "russian") {
    //        appManager.changeLangAndReload(CONST.LANGUAGE_RU)
    //    }
    //
    //    else if (buttonProps.buttonId === "english") {
    //        appManager.changeLangAndReload(CONST.LANGUAGE_EN)
    //    }
    //
    //}
    //,
    //
    //renderMenuFacebookOffline: function () {
    //
    //    return (
    //        <div className="navigation menu-layout">
    //            <IconButton buttonId="settings" className="settings" icon="settings"
    //                        onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
    //            <IconButton buttonId="rating" className="rating" icon="leader"
    //                        onClick={this.onClick}>{i18n._('button.rating')}</IconButton>
    //            <IconButton buttonId="facebook" className="facebook-connect" icon="facebook_connect"
    //                        onClick={this.onClick}>{i18n._('button.facebook.enter')}</IconButton>
    //            <IconButton buttonId="shop" className="shop" icon="shop"
    //                        onClick={this.onClick}>{i18n._('button.shop')}</IconButton>
    //        </div>
    //    )
    //
    //}
    //,
    //
    //renderMenuFacebookOnline: function () {
    //
    //    return (
    //        <div className="navigation menu-layout">
    //            <IconButton buttonId="settings" className="settings" icon="settings"
    //                        onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
    //            <IconButton buttonId="rating" className="rating" icon="leader"
    //                        onClick={this.onClick}>{i18n._('button.rating')}</IconButton>
    //            <IconButton buttonId="facebook" className="facebook-online" icon="facebook_online"
    //                        onClick={this.onClick}>{i18n._('button.facebook.exit')}</IconButton>
    //            <IconButton buttonId="shop" className="shop" icon="shop"
    //                        onClick={this.onClick}>{i18n._('button.shop')}</IconButton>
    //        </div>
    //    )
    //
    //}
    //,
    //
    //renderSettings: function () {
    //
    //    return (
    //        <div className="navigation settings-layout">
    //            <IconButton buttonId="settings" className="settings hover" icon="settings"
    //                        onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
    //            <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
    //                        onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
    //            <IconButton buttonId="music" className="music" icon="music"
    //                        onClick={this.onClick}>{i18n._('button.music')}</IconButton>
    //            <IconButton buttonId="sound" className="sound" icon="sound"
    //                        onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
    //        </div>
    //    )
    //
    //}
    //,
    //
    //renderLanguages: function () {
    //
    //    return (
    //        <div className="navigation languages-layout">
    //            <IconButton buttonId="settings" className="settings hover" icon="settings"
    //                        onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
    //            <IconButton buttonId="languages" className="languages hover" icon={router.getLanguage()}
    //                        onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
    //            <IconButton buttonId="russian" className="russian" icon="ru"
    //                        onClick={this.onClick}>Русский</IconButton>
    //            <IconButton buttonId="english" className="english" icon="en"
    //                        onClick={this.onClick}>English</IconButton>
    //        </div>
    //    )
    //
    //}
    //,
    //
    //renderMusicOff: function () {
    //
    //    return (
    //        <div className="navigation settings-layout">
    //            <IconButton buttonId="settings" className="settings hover" icon="settings"
    //                        onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
    //            <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
    //                        onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
    //            <IconButton buttonId="music" className="music" icon="music_off"
    //                        onClick={this.onClick}>{i18n._('button.music')}</IconButton>
    //            <IconButton buttonId="sound" className="sound" icon="sound"
    //                        onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
    //        </div>
    //    )
    //
    //}
    //,
    //
    //renderSoundOff: function () {
    //
    //    return (
    //        <div className="navigation settings-layout">
    //            <IconButton buttonId="settings" className="settings hover" icon="settings"
    //                        onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
    //            <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
    //                        onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
    //            <IconButton buttonId="music" className="music" icon="music"
    //                        onClick={this.onClick}>{i18n._('button.music')}</IconButton>
    //            <IconButton buttonId="sound" className="sound" icon="sound_off"
    //                        onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
    //        </div>
    //    )
    //
    //}
    //,
    //
    //renderMusicSoundOff: function () {
    //
    //    return (
    //        <div className="navigation settings-layout">
    //            <IconButton buttonId="settings" className="settings hover" icon="settings"
    //                        onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
    //            <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
    //                        onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
    //            <IconButton buttonId="music" className="music" icon="music_off"
    //                        onClick={this.onClick}>{i18n._('button.music')}</IconButton>
    //            <IconButton buttonId="sound" className="sound" icon="sound_off"
    //                        onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
    //        </div>
    //    )
    //
    //}
    //,


});

module.exports.Navigation = React.createClass(NavigationClass);
module.exports.Navigation.Class = NavigationClass;