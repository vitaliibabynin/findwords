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

    propTypes: {

        buttonLayout: React.PropTypes.string

    },

    getInitialState: function () {

        return {

            buttonLayout: "menu"
            //menu, settings, languages, musicOff, soundOff, MusicSoundOff

        };

    },

    onClick: function (buttonProps) {

        if (buttonProps.buttonId === "settings") {
            if (this.state.buttonLayout === "menu" || this.state.buttonLayout === "languages") {
                this.setState({buttonLayout: "settings"});
            } else {
                this.setState({buttonLayout: "menu"});
            }
        }

        else if (buttonProps.buttonId === "languages") {
            if (this.state.buttonLayout === "languages") {
                this.setState({buttonLayout: "settings"});
            } else {
                this.setState({buttonLayout: "languages"})
            }
        }

        else if (buttonProps.buttonId === "music") {
            if (this.state.buttonLayout === "settings") {
                this.setState({buttonLayout: "musicOff"});
            } else if (this.state.buttonLayout === "musicSoundOff") {
                this.setState({buttonLayout: "soundOff"});
            } else if (this.state.buttonLayout === "soundOff") {
                this.setState({buttonLayout: "musicSoundOff"})
            } else {
                this.setState({buttonLayout: "settings"})
            }
        }

        else if (buttonProps.buttonId === "sound") {
            if (this.state.buttonLayout === "settings") {
                this.setState({buttonLayout: "soundOff"});
            } else if (this.state.buttonLayout === "musicSoundOff") {
                this.setState({buttonLayout: "musicOff"});
            } else if (this.state.buttonLayout === "musicOff") {
                this.setState({buttonLayout: "musicSoundOff"})
            } else {
                this.setState({buttonLayout: "settings"})
            }
        }

        else if (buttonProps.buttonId === "russian") {
            appManager.changeLangAndReload(CONST.LANGUAGE_RU)
        }

        else if (buttonProps.buttonId === "english") {
            appManager.changeLangAndReload(CONST.LANGUAGE_EN)
        }

    },

    renderMenu: function () {

        return (
            <div className="navigation menu-layout">
                <IconButton buttonId="settings" className="settings" icon="settings"
                            onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="rating" className="rating" icon="leader"
                            onClick={this.onClick}>{i18n._('button.rating')}</IconButton>
                <FbButton buttonId="facebook-enter" className="facebook-enter" icon="facebook_connect"
                          onClick={this.onClick}>{i18n._('button.facebook.enter')}</FbButton>
                <IconButton buttonId="shop" className="shop" icon="shop"
                            onClick={this.onClick}>{i18n._('button.shop')}</IconButton>
            </div>
        )

    },

    renderSettings: function () {

        return (
            <div className="navigation settings-layout">
                <IconButton buttonId="settings" className="settings hover" icon="settings"
                            onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
                            onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
                <IconButton buttonId="music" className="music" icon="music"
                            onClick={this.onClick}>{i18n._('button.music')}</IconButton>
                <IconButton buttonId="sound" className="sound" icon="sound"
                            onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
            </div>
        )

    },

    renderLanguages: function () {

        return (
            <div className="navigation languages-layout">
                <IconButton buttonId="settings" className="settings hover" icon="settings"
                            onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="languages" className="languages hover" icon={router.getLanguage()}
                            onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
                <IconButton buttonId="russian" className="russian" icon="ru" onClick={this.onClick}>Русский</IconButton>
                <IconButton buttonId="english" className="english" icon="en" onClick={this.onClick}>English</IconButton>
            </div>
        )

    },

    renderMusicOff: function () {

        return (
            <div className="navigation settings-layout">
                <IconButton buttonId="settings" className="settings hover" icon="settings"
                            onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
                            onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
                <IconButton buttonId="music" className="music" icon="off"
                            onClick={this.onClick}>{i18n._('button.music')}</IconButton>
                <IconButton buttonId="sound" className="sound" icon="sound"
                            onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
            </div>
        )

    },

    renderSoundOff: function () {

        return (
            <div className="navigation settings-layout">
                <IconButton buttonId="settings" className="settings hover" icon="settings"
                            onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
                            onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
                <IconButton buttonId="music" className="music" icon="music"
                            onClick={this.onClick}>{i18n._('button.music')}</IconButton>
                <IconButton buttonId="sound" className="sound" icon="off"
                            onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
            </div>
        )

    },

    renderMusicSoundOff: function () {

        return (
            <div className="navigation settings-layout">
                <IconButton buttonId="settings" className="settings hover" icon="settings"
                            onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="languages" className="languages" icon={router.getLanguage()}
                            onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
                <IconButton buttonId="music" className="music" icon="off"
                            onClick={this.onClick}>{i18n._('button.music')}</IconButton>
                <IconButton buttonId="sound" className="sound" icon="off"
                            onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
            </div>
        )

    },

    render: function () {

        if (this.state.buttonLayout === "settings") {
            return this.renderSettings();

        } else if (this.state.buttonLayout === "languages") {
            return this.renderLanguages();

        } else if (this.state.buttonLayout === "musicOff") {
            return this.renderMusicOff();

        } else if (this.state.buttonLayout === "soundOff") {
            return this.renderSoundOff();

        } else if (this.state.buttonLayout === "musicSoundOff") {
            return this.renderMusicSoundOff();

        } else {
            return this.renderMenu();
        }

    }
});

module.exports.Navigation = React.createClass(NavigationClass);
module.exports.Navigation.Class = NavigationClass;