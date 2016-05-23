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

var BUTTON_MENU_RATING = "rating";
var BUTTON_MENU_FACEBOOK = "facebook";
var BUTTON_MENU_SHOP = "shop";
var BUTTON_SETTINGS = "settings";
var BUTTON_SETTINGS_LANGUAGES = "settings_languages";
var BUTTON_SETTINGS_LANG_RU = "settings_lang_ru";
var BUTTON_SETTINGS_LANG_EN = "settings_lang_en";
var BUTTON_SETTINGS_TIMER = "settings_timer";
var BUTTON_SETTINGS_MUSIC = "settings_music";
var BUTTON_SETTINGS_SOUND = "settings_sound";


var NavigationClass = Object.assign({}, {}, {

    displayName: 'Navigation',
    mixins: [GameMixin],

    propTypes: {
        initialSlide: React.PropTypes.number
    },

    getInitialState: function () {
        var state = {
            initialSlide: this.props.initialSlide || 0,
            buttonLayout: BUTTON_LAYOUT_MENU,
            buttonsData: this.getInitialButtonsData(),
            facebookOnline: appFB.isAuthorized(),
            profilePic: "",
            profileFirstName: "",
            profileLastName: "",
            showTimerButton: appManager.getSettings().getTimerUserChangeAllow()
        };

        return state;
    },

    componentDidMount: function () {
        if (this.state.facebookOnline) {
            appFB.getMe().then(function (res) {
                this.setState({
                    profilePic: res.picture,
                    profileFirstName: res.first_name,
                    profileLastName: res.last_name
                });
            }.bind(this));
        }

        appFB.addLoginListener(this.appFbUpdated);
        appFB.addLogoutListener(this.appFbUpdated);
    },

    componentWillUnmount: function () {
        appFB.removeLoginListener(this.appFbUpdated);
        appFB.removeLogoutListener(this.appFbUpdated);
    },

    appFbUpdated: function () {
        appFB.getMe().then(function (res) {
            this.setState({
                facebookOnline: appFB.isAuthorized(),
                profilePic: res.picture,
                profileFirstName: res.first_name,
                profileLastName: res.last_name
            });
        }.bind(this))
    },

    getInitialButtonsData: function () {
        var buttons = {};
        buttons[BUTTON_MENU_RATING] = {
            id: BUTTON_MENU_RATING,
            title: i18n._('button.rating'),
            icon: "leader",
            onClick: this.onClick
        };
        buttons[BUTTON_MENU_FACEBOOK] = {
            id: BUTTON_MENU_FACEBOOK,
            title: i18n._('button.facebook.enter'),
            icon: "facebook_connect",
            onClick: this.onClick
        };
        buttons[BUTTON_MENU_SHOP] = {
            id: BUTTON_MENU_SHOP,
            title: i18n._('button.shop'),
            icon: "shop",
            onClick: this.onClick
        };
        buttons[BUTTON_SETTINGS] = {
            id: BUTTON_SETTINGS,
            title: i18n._('button.settings'),
            icon: "settings",
            onClick: this.onClick
        };
        buttons[BUTTON_SETTINGS_LANGUAGES] = {
            id: BUTTON_SETTINGS_LANGUAGES,
            title: i18n._('button.languages'),
            icon: router.getLanguage(),
            onClick: this.onClick
        };
        buttons[BUTTON_SETTINGS_LANG_RU] = {
            id: BUTTON_SETTINGS_LANG_RU,
            title: i18n._('language.ru'),
            icon: CONST.LANGUAGE_RU,
            onClick: this.onClick
        };
        buttons[BUTTON_SETTINGS_LANG_EN] = {
            id: BUTTON_SETTINGS_LANG_EN,
            title: i18n._('language.en'),
            icon: CONST.LANGUAGE_EN,
            onClick: this.onClick
        };
        buttons[BUTTON_SETTINGS_TIMER] = {
            id: BUTTON_SETTINGS_TIMER,
            title: i18n._('button.timer'),
            icon: "timer",
            onClick: this.onClick
        };
        buttons[BUTTON_SETTINGS_MUSIC] = {
            id: BUTTON_SETTINGS_MUSIC,
            title: i18n._('button.music'),
            icon: "music",
            onClick: this.onClick
        };
        buttons[BUTTON_SETTINGS_SOUND] = {
            id: BUTTON_SETTINGS_SOUND,
            title: i18n._('button.sound'),
            icon: "sound",
            onClick: this.onClick
        };

        return buttons;
    },

    getButtonsToShow: function (buttonLayout) {
        buttonLayout = buttonLayout || this.state.buttonLayout;
        var buttonItems = [];

        switch (buttonLayout) {
            case BUTTON_LAYOUT_MENU:
                buttonItems.push({id: BUTTON_SETTINGS, isPressed: false});
                buttonItems.push({id: BUTTON_MENU_RATING, isPressed: false});
                buttonItems.push({
                    id: BUTTON_MENU_FACEBOOK,
                    isPressed: false,
                    icon: this.state.facebookOnline ? "facebook_online" : "facebook_connect",
                    title: this.state.facebookOnline ? i18n._('button.facebook.exit') : i18n._('button.facebook.enter')
                });
                buttonItems.push({id: BUTTON_MENU_SHOP, isPressed: false});
                break;
            case BUTTON_LAYOUT_SETTINGS:
                buttonItems.push({id: BUTTON_SETTINGS, isPressed: true});
                buttonItems.push({id: BUTTON_SETTINGS_LANGUAGES, isPressed: false});
                if (this.state.showTimerButton === true) {
                    buttonItems.push({
                        id: BUTTON_SETTINGS_TIMER,
                        isPressed: false,
                        icon: appManager.getGameState().getTimer() ? "time_on" : "time_off"
                    });
                }
                buttonItems.push({
                    id: BUTTON_SETTINGS_MUSIC,
                    isPressed: false,
                    icon: appManager.getGameState().getMusic() ? "music" : "music_off"
                });
                buttonItems.push({
                    id: BUTTON_SETTINGS_SOUND,
                    isPressed: false,
                    icon: appManager.getGameState().getSound() ? "sound" : "sound_off"
                });
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

    onClick: function (buttonProps) {
        switch (buttonProps.id) {
            case BUTTON_MENU_RATING:
                router.navigate("rankings", "index", {initialSlide: this.state.initialSlide});
                break;
            case BUTTON_MENU_FACEBOOK:
                if (!this.state.facebookOnline) {
                    appFB.login().then(function (res) {
                            return appFB.getMe();
                        }.bind(this))
                        .then(function (res) {
                            var profilePic = res.picture;
                            var profileFirstName = res.first_name;
                            var profileLastName = res.last_name;

                            this.setState({
                                facebookOnline: true,
                                profilePic: profilePic,
                                profileFirstName: profileFirstName,
                                profileLastName: profileLastName
                            });
                        }.bind(this), function (error) {
                            console.log(error);
                        }.bind(this));
                } else {
                    appFB.logout();

                    this.setState({
                        facebookOnline: false,
                        profilePic: "",
                        profileFirstName: "",
                        profileLastName: ""
                    });
                }
                break;
            case BUTTON_MENU_SHOP:
                router.navigate("shop", "index", {initialSlide: this.state.initialSlide});
                break;
            case BUTTON_SETTINGS:
                this.setState({buttonLayout: this.state.buttonLayout == BUTTON_LAYOUT_MENU ? BUTTON_LAYOUT_SETTINGS : BUTTON_LAYOUT_MENU});
                break;
            case BUTTON_SETTINGS_LANGUAGES:
                this.setState({buttonLayout: this.state.buttonLayout == BUTTON_LAYOUT_SETTINGS_LANG ? BUTTON_LAYOUT_SETTINGS : BUTTON_LAYOUT_SETTINGS_LANG});
                break;
            case BUTTON_SETTINGS_LANG_RU:
                //ничего не делаем если язык уже выставлен точно такой же на кнопку которого мы клацаем
                if (router.getLanguage() == CONST.LANGUAGE_RU) {
                    return;
                }
                appManager.changeLangAndReload(CONST.LANGUAGE_RU);
                break;
            case BUTTON_SETTINGS_LANG_EN:
                //ничего не делаем если язык уже выставлен точно такой же на кнопку которого мы клацаем
                if (router.getLanguage() == CONST.LANGUAGE_EN) {
                    return;
                }
                appManager.changeLangAndReload(CONST.LANGUAGE_EN);
                break;
            case BUTTON_SETTINGS_TIMER:
                appManager.getGameState().setTimer(!appManager.getGameState().getTimer());
                this.forceUpdate();
                break;
            case BUTTON_SETTINGS_MUSIC:
                appManager.getGameState().setMusic(!appManager.getGameState().getMusic());
                this.forceUpdate();
                break;
            case BUTTON_SETTINGS_SOUND:
                appManager.getGameState().setSound(!appManager.getGameState().getSound());
                this.forceUpdate();
                break;
        }
    },


    render: function () {
        //console.log({facebookOnline: this.state.facebookOnline});

        var classses = classNames("navigation", this.state.buttonLayout + '-layout');

        var buttons = this.getButtonsToShow().map(function (item, idx, allItems) {
            var button = this.state.buttonsData[item.id];
            button.title = item.hasOwnProperty('title') ? item.title : button.title;
            button.icon = item.hasOwnProperty('icon') ? item.icon : button.icon;

            var classes = classNames(
                item.id,
                item.isPressed ? "hover" : ""
            );

            if (this.state.facebookOnline && item.id == BUTTON_MENU_FACEBOOK) {
                classes += " online";

                return (
                    <FbButton
                        key={button.id}
                        id={button.id}
                        className={classes}
                        icon={button.icon}
                        profilePic={this.state.profilePic}
                        profileFirstName={this.state.profileFirstName}
                        profileLastName={this.state.profileLastName}
                        onClick={button.onClick}>
                        {button.title}
                    </FbButton>
                )
            }

            return (
                <IconButton
                    key={button.id}
                    id={button.id}
                    className={classes}
                    icon={button.icon}
                    onClick={button.onClick}>
                    {button.title}
                </IconButton>
            )
        }.bind(this));

        return (
            <div className={classses}>
                {buttons}
            </div>
        )

    }

});
module.exports.Navigation = React.createClass(NavigationClass);
module.exports.Navigation.Class = NavigationClass;