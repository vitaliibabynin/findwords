"use strict";


var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var Radium = require('radium');
var classNames = require('classnames');

module.exports = {};

var DOLLAR = 'counter/coins';
module.exports.DOLLAR = DOLLAR;

var ButtonClass = Object.assign({}, {}, Radium.wrap({

    displayName: 'Button',
    mixins: [GameMixin],

    propTypes: {
        className: React.PropTypes.string,
        icon: React.PropTypes.string
    },

    getInitialState: function () {
        var state = {
            className: 'btn',
            isActive: false,
            style: {}
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
            appManager.getSFXManager().playButton();

            this.setState({isActive: true}, function () {
                setTimeout(function () {
                    if (this.isMounted()) {
                        this.setState({isActive: false});
                    }
                }.bind(this), 300);
            }.bind(this));
        }

        if (this.props.onClick && typeof this.props.onClick == 'function') {
            this.props.onClick(this.props, e);
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


var ChipButtonClass = Object.assign({}, ButtonClass, {

    displayName: 'ChipButton',

    propTypes: {
        value: React.PropTypes.number
    },

    getInitialState: function () {
        var state = ButtonClass.getInitialState.call(this);
        state.className += ' chip';
        state.value = this.props.value || 0;

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

        var buttonClasses = classNames(
            this.state.className,
            this.props.className,
            {'hover': this.state.isActive || this.props.isActive}
        );

        var dollar = {
            backgroundImage: "url('" + this.getImagePath(DOLLAR) + "')"
        };

        return (
            <div className={buttonClasses}
                 style={this.state.style}
                 onClick={this.onClick}
                 dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>

                <div className="text">{this.props.children}</div>
                <div className="value" style={dollar}>{this.props.value}</div>
            </div>
        );
    }

});
module.exports.ChipButton = React.createClass(ChipButtonClass);
module.exports.ChipButton.Class = ChipButtonClass;


var FbButtonClass = Object.assign({}, IconButtonClass, {
    displayName: 'FbButton',

    propTypes: {
        profilePic: React.PropTypes.string,
        profileFirstName: React.PropTypes.string,
        profileLastName: React.PropTypes.string
    },

    getInitialState: function () {
        var state = IconButtonClass.getInitialState.call(this);
        state.className += ' fb';
        state.profilePic = this.props.profilePic || "";
        state.profileFirstName = this.props.profileFirstName || "";
        state.profileLastName = this.props.profileLastName || "";

        return state;
    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevProps.icon == this.props.icon && prevProps.profilePic == this.props.profilePic) {
            if (prevProps.profileFirstName == this.props.profileFirstName && prevProps.profileLastName == this.props.profileLastName) {
                return;
            }
        }

        this.updateStyle(this.state.style);
        this.setState({
            style: this.state.style,
            profilePic: this.props.profilePic || "",
            profileFirstName: this.props.profileFirstName || "",
            profileLastName: this.props.profileLastName || ""
        });
    },

    getBackgoundImageName: function () {
        return this.props.icon;
    },

    render: function () {
        var buttonClasses = classNames(
            this.state.className,
            this.props.className,
            {'hover': this.state.isActive || this.props.isActive}
        );

        var profilePicPath = "url('" + this.state.profilePic + "')";

        var profilePic = {
            backgroundImage: profilePicPath
        };

        return (
            <div className={buttonClasses} style={this.state.style} onClick={this.onClick}
                 dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>
                <span className="enter-exit">{this.props.children}</span>

                <div className="profile-pic" style={profilePic}></div>
                <div className="profile-name">
                    <div><span>{this.state.profileFirstName}</span></div>
                    <div><span>{this.state.profileLastName}</span></div>
                </div>

            </div>
        );
    }
});
module.exports.FbButton = React.createClass(FbButtonClass);
module.exports.FbButton.Class = FbButtonClass;


//var VkButtonClass = Object.assign({}, IconButtonClass, {
//    displayName: 'VkButton',
//
//    getInitialState: function () {
//        var state = IconButtonClass.getInitialState.call(this);
//        state.className += ' vk';
//
//        return state;
//    },
//
//    getBackgoundImageName: function () {
//        return 'vk';
//    },
//
//    render: function () {
//        return ButtonClass.render.call(this);
//    }
//});
//module.exports.VkButton = React.createClass(VkButtonClass);
//module.exports.VkButton.Class = VkButtonClass;


//var OkButtonClass = Object.assign({}, IconButtonClass, {
//    displayName: 'OkButton',
//
//    getInitialState: function () {
//        var state = IconButtonClass.getInitialState.call(this);
//        state.className += ' ok';
//
//        return state;
//    },
//
//    getBackgoundImageName: function () {
//        return 'ok';
//    },
//
//    render: function () {
//        return ButtonClass.render.call(this);
//    }
//});
//module.exports.OkButton = React.createClass(OkButtonClass);
//module.exports.OkButton.Class = OkButtonClass;


var SimpleButtonClass = Object.assign({}, {}, {

    displayName: 'SimpleButton',

    propTypes: {
        className: React.PropTypes.string
    },

    getInitialState: function () {
        var state = {
            className: 'btn',
            isActive: false
        };

        return state;
    },

    onClick: function (e) {
        e.preventDefault();

        if (!this.state.isActive) {
            appManager.getSFXManager().playButton();

            this.setState({isActive: true}, function () {
                setTimeout(function () {
                    if (this.isMounted()) {
                        this.setState({isActive: false});
                    }
                }.bind(this), 300);
            }.bind(this));
        }

        if (this.props.onClick && typeof this.props.onClick == 'function') {
            this.props.onClick(this.props, e);
        }
    },

    render: function () {
        var buttonClasses = classNames(
            this.state.className,
            this.props.className,
            {'hover': this.state.isActive || this.props.isActive}
        );

        return (
            <div className={buttonClasses} onClick={this.onClick}>
                {this.props.children}
            </div>
        );
    }
});
module.exports.SimpleButton = React.createClass(SimpleButtonClass);
module.exports.SimpleButton.Class = SimpleButtonClass;


var FreeCoinsClass = Object.assign({}, SimpleButtonClass, {
    displayName: 'FreeCoins'
});
module.exports.FreeCoins = React.createClass(FreeCoinsClass);
module.exports.FreeCoins.Class = FreeCoinsClass;


var BuyCoinsClass = Object.assign({}, SimpleButtonClass, {

    displayName: 'BuyCoins',

    propTypes: {
        className: React.PropTypes.string,
        blockId: React.PropTypes.string,
        style: React.PropTypes.shape({
            backgroundImage: React.PropTypes.string
        })
    },

    getInitialState: function () {
        var state = {
            className: 'btn',
            isActive: false,
            blockId: this.props.blockId || "",
            style: this.props.style || {backgroundImage: ""}
        };

        return state;
    },

    render: function () {
        var buttonClasses = classNames(
            this.state.className,
            this.props.className,
            {'hover': this.state.isActive || this.props.isActive}
        );

        return (
            <div id={this.state.blockId} style={this.state.style} className={buttonClasses} onClick={this.onClick}>
                {this.props.children}
            </div>
        );
    }
});
module.exports.BuyCoins = React.createClass(BuyCoinsClass);
module.exports.BuyCoins.Class = BuyCoinsClass;