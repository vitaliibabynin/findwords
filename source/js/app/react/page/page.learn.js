"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;

var PageRate = Object.assign({}, {}, {

    displayName: 'PageRate',

    getInitialState: function () {
        return {};
    },

    getImage: function () {
        return "";
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
                            <span>{i18n._('rate.description')}</span>
                        </div>

                        <div className="image-of-board" style={imageStyle}></div>

                        <div className="how-to-play">
                            <span>{i18n._('rate.description')}</span>
                        </div>

                        <div className="start">{i18n._('rate.remind.never')}</div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageRate);
module.exports.Class = PageRate;