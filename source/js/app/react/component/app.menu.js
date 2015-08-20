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
            if (this.state.buttonLayout === "settings") {
                this.setState({buttonLayout: "languages"});
            } else {
                this.setState({buttonLayout: "settings"})
            }
        }

        else if (buttonProps.buttonId === "russian") {
            //var urlRu = CONST.BASE_URL + "/" + CONST.LANGUAGE_RU;
            //router.navigateToUrl(urlRu, null, null);
        }

        else if (buttonProps.buttonId === "english") {
            //var urlEn = CONST.BASE_URL + "/" + CONST.LANGUAGE_EN;
            //router.navigateToUrl(urlEn, null, null);
        }

    },

    renderMenu: function () {

        return (
            <div className="navigation menu-layout">
                <IconButton buttonId="settings" className="settings" icon="settings" onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="rating" className="rating" icon="leader" onClick={this.onClick}>{i18n._('button.rating')}</IconButton>
                <FbButton buttonId="facebook-enter" className="facebook-enter" icon="facebook_connect" onClick={this.onClick}>{i18n._('button.facebook.enter')}</FbButton>
                <IconButton buttonId="shop" className="shop" icon="shop" onClick={this.onClick}>{i18n._('button.shop')}</IconButton>
            </div>
        )

    },

    renderSettings: function () {

        return (
            <div className="navigation settings-layout">
                <IconButton buttonId="settings" className="settings hover" icon="settings" onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="languages" className="languages" icon={router.getLanguage()} onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
                <IconButton buttonId="music" className="music" icon="music" onClick={this.onClick}>{i18n._('button.music')}</IconButton>
                <IconButton buttonId="sound" className="sound" icon="sound" onClick={this.onClick}>{i18n._('button.sound')}</IconButton>
            </div>
        )

    },

    renderLanguages: function () {

        return (
            <div className="navigation languages-layout">
                <IconButton buttonId="settings" className="settings hover" icon="settings" onClick={this.onClick}>{i18n._('button.settings')}</IconButton>
                <IconButton buttonId="languages" className="languages hover" icon={router.getLanguage()} onClick={this.onClick}>{i18n._('button.languages')}</IconButton>
                <IconButton buttonId="russian" className="russian" icon="ru" onClick={this.onClick}>Русский</IconButton>
                <IconButton buttonId="english" className="english" icon="en" onClick={this.onClick}>English</IconButton>
            </div>
        )

    },

    render: function () {

        if (this.state.buttonLayout === "settings") {
            return this.renderSettings();

        } else if (this.state.buttonLayout === "languages") {
            return this.renderLanguages();

        } else {
            return this.renderMenu();
        }

    }
});

module.exports.Navigation = React.createClass(NavigationClass);
module.exports.Navigation.Class = NavigationClass;