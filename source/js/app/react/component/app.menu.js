/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var IconButton = require('./app.button').IconButton;

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
            <div className="menu">
                <IconButton>Settings</IconButton>
                <IconButton>Rankings</IconButton>
                <IconButton>Facebook</IconButton>
                <IconButton>Shop</IconButton>
            </div>
        )
    },

    renderSettings: function() {
        return (
            <div>
                <IconButton></IconButton>
                <IconButton></IconButton>
                <IconButton></IconButton>
                <IconButton></IconButton>
            </div>
        )
    },

    renderLanguages: function() {
        return (
            <div>
                <IconButton></IconButton>
                <IconButton></IconButton>
                <IconButton></IconButton>
                <IconButton></IconButton>
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