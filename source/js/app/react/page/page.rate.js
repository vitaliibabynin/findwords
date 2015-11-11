"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;

var PageRate = Object.assign({}, {}, {

    displayName: 'PageRate',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            initialSlide: parseInt(router.getParam('initialSlide')) || 0
        };

        return state;
    },

    render: function () {
        var facebookImg = {
            backgroundColor: "url('" + this.getImagePath('button/facebook_connect') + "')"
        };

        return (

            <div className="page-rate">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">

                        <div className="heading">{i18n._('rankings.heading')}</div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageRate);
module.exports.Class = PageRate;