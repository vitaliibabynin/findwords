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

    renderNavigation: function() {
        return (
            <div className="navigation menu-layout">
                <IconButton className="settings">Settings</IconButton>
                <IconButton className="rankings">Rankings</IconButton>
                <FbButton className="facebook">Facebook</FbButton>
                <IconButton className="shop">Shop</IconButton>
            </div>
        )
    },

    renderSettings: function() {
        return (
            <div className="navigation settings-layout">
                <IconButton className="settings">Settings</IconButton>
                <IconButton className="languages">Languages</IconButton>
                <IconButton className="music">Music</IconButton>
                <IconButton className="sound">Sound</IconButton>
            </div>
        )
    },

    renderLanguages: function() {
        return (
            <div className="navigation languages-layout">
                <IconButton className="settings">Settings</IconButton>
                <IconButton className="languages">Languages</IconButton>
                <IconButton className="russian">Russian</IconButton>
                <IconButton className="english">English</IconButton>
            </div>
        )
    },

    render: function () {

            if (this.state.buttonLayout === "settings") {
                return this.renderSettings();
            } else if (this.state.buttonLayout === "languages") {
                return this.renderLanguages();
            } else {
                return this.renderNavigation();
            }

    }
});

module.exports.Navigation = React.createClass(NavigationClass);
module.exports.Navigation.Class = NavigationClass;