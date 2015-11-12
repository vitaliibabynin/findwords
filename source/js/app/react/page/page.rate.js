"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;

var PageRate = Object.assign({}, {}, {

    displayName: 'PageRate',

    getInitialState: function () {
        var state = {
            //initialSlide: parseInt(router.getParam('initialSlide')) || 0
        };

        return state;
    },

    render: function () {

        return (

            <div className="page-rate">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">

                        <div className="heading">{i18n._('rate.heading')}</div>
                        <div className="description">
                            <span>{i18n._('rate.description')}</span>
                        </div>
                        <div className="review">{i18n._('rate.review')}</div>
                        <div className="later">{i18n._('rate.remind.later')}</div>
                        <div className="never">{i18n._('rate.remind.never')}</div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageRate);
module.exports.Class = PageRate;