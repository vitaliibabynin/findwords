"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;

var PageLearn = Object.assign({}, {}, {

    displayName: 'PageLearn',
    mixins: [GameMixin],

    getInitialState: function () {
        return {};
    },

    getImage: function () {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return "url('" + this.getImagePath('learn/learn_en') + "')";
            case CONST.LANGUAGE_RU:
                return "url('" + this.getImagePath('learn/learn_ru') + "')";
            default:
                return "url('" + this.getImagePath('learn/learn_en') + "')";
        }
    },

    onClickStart: function () {
        router.navigate("game","learn");
    },

    render: function () {

        var imageStyle = {
            backgroundImage: this.getImage()
        };

        return (

            <div className="page-learn">
                <div className="page-content">

                    <Counters isDisplayBackButton={false}/>

                    <div className="container">

                        <div className="aim-of-the-game">
                            <span>{i18n._('app.page.learn.aim-of-the-game')}</span>
                        </div>

                        <div className="image-of-board" style={imageStyle}></div>

                        <div className="how-to-play">
                            <span>{i18n._('app.page.learn.how-to-play')}</span>
                        </div>

                        <div className="btn start" onClick={this.onClickStart}>{i18n._('app.page.learn.start')}</div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageLearn);
module.exports.Class = PageLearn;