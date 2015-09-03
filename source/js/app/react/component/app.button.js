/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var Radium = require('radium');
var classNames = require('classnames');

module.exports = {};


var ButtonClass = Object.assign({}, {}, Radium.wrap({
    displayName: 'Button',
    mixins: [GameMixin],

    getInitialState: function () {

        var state = {
            className: 'btn',
            isActive: false,
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

        var imgName = "button/" + this.getBackgoundImageName();
        style.backgroundImage = "url('" + this.getImagePath(imgName) + "')";
    },

    getBackgoundImageName: function () {
        return false;
    },

    onClick: function (e) {
        e.preventDefault();

        if (!this.state.isActive) {
            this.setState({isActive: true}, function () {
                setTimeout(function () {
                    if (this.isMounted()) {
                        this.setState({isActive: false});
                    }
                }.bind(this), 300);
            });
        }

        if (this.props.onClick && typeof this.props.onClick == 'function') {
            this.props.onClick(this.props);
        }
    },

    render: function () {
        var buttonClasses = classNames(
            this.state.className,
            this.props.className,
            {'hover': this.state.isActive || this.props.isActive}
        );

        return (
            <div className={buttonClasses} style={this.state.style} onClick={this.onClick}
                 dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>
                {this.props.children}
            </div>
        );
    }
}));
module.exports.Button = React.createClass(ButtonClass);
module.exports.Button.Class = ButtonClass;


var IconButtonClass = Object.assign({}, ButtonClass, {
    displayName: 'IconButton',

    propTypes: {
        icon: React.PropTypes.string
    },

    getInitialState: function () {
        var state = ButtonClass.getInitialState.call(this);
        state.className += ' icon';

        return state;
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevProps.icon == this.props.icon) {
            return;
        }

        this.updateStyle(this.state.style);
        this.setState({
            style: this.state.style
        });
    },

    getBackgoundImageName: function () {
        return this.props.icon;
    },

    render: function () {
        return ButtonClass.render.call(this);
    }
});
module.exports.IconButton = React.createClass(IconButtonClass);
module.exports.IconButton.Class = IconButtonClass;


var FbButtonClass = Object.assign({}, IconButtonClass, {
    displayName: 'FbButton',

    getInitialState: function () {
        var state = IconButtonClass.getInitialState.call(this);
        state.className += ' fb';

        return state;
    },

    getBackgoundImageName: function () {
        return this.props.icon;
    },

    render: function () {
        return ButtonClass.render.call(this);
    }
});
module.exports.FbButton = React.createClass(FbButtonClass);
module.exports.FbButton.Class = FbButtonClass;


var VkButtonClass = Object.assign({}, IconButtonClass, {
    displayName: 'VkButton',

    getInitialState: function () {
        var state = IconButtonClass.getInitialState.call(this);
        state.className += ' vk';

        return state;
    },

    getBackgoundImageName: function () {
        return 'vk';
    },

    render: function () {
        return ButtonClass.render.call(this);
    }
});
module.exports.VkButton = React.createClass(VkButtonClass);
module.exports.VkButton.Class = VkButtonClass;


var OkButtonClass = Object.assign({}, IconButtonClass, {
    displayName: 'OkButton',

    getInitialState: function () {
        var state = IconButtonClass.getInitialState.call(this);
        state.className += ' ok';

        return state;
    },

    getBackgoundImageName: function () {
        return 'ok';
    },

    render: function () {
        return ButtonClass.render.call(this);
    }
});
module.exports.OkButton = React.createClass(OkButtonClass);
module.exports.OkButton.Class = OkButtonClass;