/**
 * Created by Vitaliy Babynin on 06.08.2015.
 */

/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var Radium = require('radium');
var classNames = require('classnames');

module.exports = {};


var HeadClass = Object.assign({}, {}, Radium.wrap({

    displayName: 'Head',
    mixins: [GameMixin],

    getInitialState: function () {

        var state = {

            className: 'head',
            style: {
                //width: '17.500rem',
                //height: '3.500rem',
                //lineHeight: '3.500rem',
                //paddingLeft: '2rem',
                //textShadow: '-0.063rem -0.063rem 0.063rem #223E85, \
                //             0.063rem -0.063rem 0.063rem #223E85, \
                //             -0.063rem 0.063rem 0.063rem #223E85, \
                //             0.063rem 0.063rem 0.063rem #223E85',
                //
                //backgroundImage: "url('"+this.getImagePath(imgName)+"')",
                //
                //':hover': {
                //    backgroundImage: "url('"+this.getPressedImagePath(imgName)+"')"
                //}
            }
        };

        this.updateStyle(state.style);

        return state;

    },

    updateStyle: function (style) {

        if (!this.getBackgoundImageName()) {
            return false;
        }

        var imgName = "head/" + this.getBackgoundImageName();
        style.backgroundImage = "url('" + this.getImagePath(imgName) + "')";

    },

    getBackgoundImageName: function () {

        return "head_img";

    },

    render: function () {

        var HeadClasses = classNames(
            this.state.className,
            this.props.className
        );

        return (

            <head className={HeadClasses} style={this.state.style}
                  dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}></head>

        );
    }
}));

module.exports.Head = React.createClass(HeadClass);
module.exports.Head.Class = HeadClass;