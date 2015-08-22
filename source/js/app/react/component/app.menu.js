/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var IconButton = require('./app.button').IconButton;
var FbButton = require('./app.button').FbButton;

module.exports = {};

var NavigationClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    getInitialState: function () {

        return {

            buttonLayout: "menu",
            //menu, settings
            settingsLayout: {
                buttons: {
                    settings: {
                        display: true,
                        isPressed: true,
                        saveToGlobal: true
                    },
                    languages: {
                        display: true,
                        isPressed: false,
                        saveToGlobal: true
                    },
                    music: {
                        display: true,
                        isPressed: false,
                        saveToGlobal: true
                    },
                    sound: {
                        display: true,
                        isPressed: false,
                        saveToGlobal: true
                    },
                    russian: {
                        display: false,
                        isPressed: false,
                        saveToGlobal: false
                    },
                    english: {
                        display: false,
                        isPressed: false,
                        saveToGlobal: false
                    }
                }
            }

        };

    },

    settingsLayout: {
        buttons: {
            settingsIsPressed: <IconButton buttonId="settings" className="settings hover" icon="settings"
                                           onClick={this.onClick}>{i18n._('button.settings')}</IconButton>,
            languages: <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
                                   onClick={this.onClick}>{i18n._('button.languages')}</IconButton>,
            languagesIsPressed: <IconButton buttonId="languages" className="languages hover" icon={router.getLanguage()}
                                            onClick={this.onClick}>{i18n._('button.languages')}</IconButton>,
            music: <IconButton buttonId="music" className="music" icon="music"
                               onClick={this.onClick}>{i18n._('button.music')}</IconButton>,
            musicIsPressed: <IconButton buttonId="music" className="music" icon="music_off"
                                        onClick={this.onClick}>{i18n._('button.music')}</IconButton>,
            sound: <IconButton buttonId="sound" className="sound" icon="sound"
                               onClick={this.onClick}>{i18n._('button.sound')}</IconButton>,
            soundIsPressed: <IconButton buttonId="sound" className="sound" icon="sound_off"
                                        onClick={this.onClick}>{i18n._('button.sound')}</IconButton>,
            russian: <IconButton buttonId="russian" className="russian" icon="ru"
                                 onClick={this.onClick}>Русский</IconButton>,
            english: <IconButton buttonId="english" className="english" icon="en"
                                 onClick={this.onClick}>English</IconButton>
        }
    },

    renderSettingsLayout: function () {

        return (
            this.settingsLayout.buttons.english +
                this.settingsLayout.buttons.russian
        );









        //var buttons = this.state.settingsLayout.buttons;
        ////var cFL = Utils.capitalizeFirstLetter();
        //var render;
        //
        //for (var buttonName in buttons) {
        //    var renderButton;
        //    if (buttonName.display) {
        //        renderButton = "this.render" + buttonName;
        //        console.log(renderButton)
        //        if (buttonName.isPressed) {
        //            renderButton += "IsPressed";
        //        }
        //        console.log(renderButton);
        //        render += {renderButton};
        //    }
        //}
        //
        //return render;

    },

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

    render: function () {

        return (
            <div className="navigation settings-layout">
                {this.renderSettingsLayout()}
            </div>
        );


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
});

module.exports.Navigation = React.createClass(NavigationClass);
module.exports.Navigation.Class = NavigationClass;