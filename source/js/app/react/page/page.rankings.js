"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var SimpleButton = require('./../component/app.button').SimpleButton;


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
            profileFirstName: "FirstName",
            profileLastName: "LastName",
            selected: this.props.selected || false
        };
        state.roundsBundlesState = appManager.getGameState().getRoundsBundles() || {};
        state.roundsComplete = this.countRoundsComplete(state.roundsBundlesState) || 0;
        state.roundsBundlesData = appManager.getSettings().getRoundsBundles() || {};
        state.roundsTotal = this.countRoundsTotal(state.roundsBundlesData) || 1;
        state.profilePicUrl = "url('/build/img/counter/star.png')" || "";

        return state;
    },

    countRoundsComplete: function (roundsBundlesState) {
        var roundsComplete = 0;
        for (var key in roundsBundlesState) {
            if (roundsBundlesState.hasOwnProperty(key)) {
                roundsComplete += roundsBundlesState[key].roundsComplete;
            }
        }

        return roundsComplete;
    },

    countRoundsTotal: function (roundsBundlesData) {
        var roundsTotal = 0;

        for (var i = 0; i < roundsBundlesData.length; i++) {
            roundsTotal += roundsBundlesData[i].rounds.length;
        }

        return roundsTotal;
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

    onClickInviteFriends: function () {
        console.log("invite friends");
        appFB.invite();
    },

    render: function () {
        appFB.getAppFriends().then(function (result) {
            console.log(result);
        });

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

                        <SimpleButton className="invite-friends-fb-button"
                                      onClick={this.onClickInviteFriends}
                                      displayName="InviteFriendsButton"
                        >
                            <div style={facebookImg}>{i18n._('rankings.invite-friends')}</div>
                        </SimpleButton>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageRankings);
module.exports.Class = PageRankings;