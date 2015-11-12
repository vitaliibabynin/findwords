"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;


var PlayerStatsClass = Object.assing({}, {}, {

    displayName: 'PlayerStats',

    getInitialState: function () {
        var state = {
            place: 1,
            score: 9999999,
            roundsComplete: 200,
            roundsTotal: 300,
            profilePicUrl: ""
        };

        return state;
    },

    render: function () {

    }

});
var PlayerStats = React.createClass(PlayerStatsClass);


var PageRankings = Object.assign({}, {}, {

    displayName: 'PageRankings',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            initialSlide: parseInt(router.getParam('initialSlide')) || 0
        };

        return state;
    },

    render: function () {
        var facebookImg = {
            backgroundImage: "url('" + this.getImagePath('button/facebook_connect') + "')"
        };

        return (

            <div className="page-rankings">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">

                        <div className="heading">{i18n._('rankings.heading')}</div>

                        <div className="friends-rankings"></div>

                        <div className="invite-friends-fb-button">
                            <div style={facebookImg}>{i18n._('rankings.invite-friends')}</div>
                        </div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageRankings);
module.exports.Class = PageRankings;