"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;

var PageRankings = Object.assign({}, {}, {

    displayName: 'PageRankings',

    getInitialState: function () {
        var state = {
            initialSlide: parseInt(router.getParam('initialSlide')) || 0
        };

        return state;
    },

    render: function () {

        return (

            <div className="page-rankings">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">

                        <div className="heading">{i18n._('shop.heading')}</div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageRankings);
module.exports.Class = PageRankings;