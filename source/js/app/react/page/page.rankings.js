"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;


var PlayerStatsClass = Object.assign({}, {}, {

    displayName: 'PlayerStats',

    propTypes: {
        selected: React.PropTypes.bool
    },

    getInitialState: function () {
        var state = {
            place: 99999,
            score: 9999999,
            roundsComplete: 200,
            roundsTotal: 300,
            profileFirstName: "FirstName",
            profileLastName: "LastName",
            selected: this.props.selected || false
        };
        state.profilePicUrl = "url('/build/img/counter/star.png')" || "";

        return state;
    },

    numberFormat: function (num) {
        var str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    },

    render: function () {

        var playerStatsClassNames = classNames(
            "player-stats",
            {"selected": this.state.selected}
        );

        var profilePic = {
            backgroundImage: this.state.profilePicUrl
        };

        return (
            <div className={playerStatsClassNames}>
                <div className="place">{this.state.place}.</div>

                <div className="center-block">
                    <div className="profile-pic" style={profilePic}></div>

                    <div className="profile-name">
                        {this.state.profileFirstName} {this.state.profileLastName}
                    </div>

                    <div className="levels-complete">
                        {i18n._('rankings.levels-complete')}: {this.state.roundsComplete}/{this.state.roundsTotal}
                    </div>

                </div>

                <div className="score">{this.numberFormat(this.state.score)}</div>
            </div>
        )

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

                        <div className="friends-rankings">
                            <PlayerStats selected={true}/>
                            <PlayerStats />
                            <PlayerStats />
                        </div>

                        <div className="invite-friends-text">{i18n._('rankings.invite-friends.get-coin')}</div>

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