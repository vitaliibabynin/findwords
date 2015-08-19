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

        if (buttonProps.className === "settings") {
            if (this.state.buttonLayout === "menu" || this.state.buttonLayout === "languages") {
                this.setState({buttonLayout: "settings"});
            } else {
                this.setState({buttonLayout: "menu"});
            }

        } else if (buttonProps.className === "languages") {
            if (this.state.buttonLayout === "settings") {
                this.setState({buttonLayout: "languages"});
            } else {
                this.setState({buttonLayout: "settings"})
            }
        }

    },

    renderMenu: function () {

        return (
            <div className="navigation menu-layout">
                <IconButton className="settings" onClick={this.onClick}>Settings</IconButton>
                <IconButton className="rankings" onClick={this.onClick}>Rankings</IconButton>
                <FbButton className="facebook" onClick={this.onClick}>Facebook</FbButton>
                <IconButton className="shop" onClick={this.onClick}>Shop</IconButton>
            </div>
        )

    },

    renderSettings: function () {

        return (
            <div className="navigation settings-layout">
                <IconButton className="settings" onClick={this.onClick}>Settings</IconButton>
                <IconButton className="languages" onClick={this.onClick}>Languages</IconButton>
                <IconButton className="music" onClick={this.onClick}>Music</IconButton>
                <IconButton className="sound" onClick={this.onClick}>Sound</IconButton>
            </div>
        )

    },

    renderLanguages: function () {

        return (
            <div className="navigation languages-layout">
                <IconButton className="settings" onClick={this.onClick}>Settings</IconButton>
                <IconButton className="languages" onClick={this.onClick}>Languages</IconButton>
                <IconButton className="russian" onClick={this.onClick}>Russian</IconButton>
                <IconButton className="english" onClick={this.onClick}>English</IconButton>
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