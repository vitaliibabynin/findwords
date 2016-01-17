"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var SimpleButton = require('./../component/app.button').SimpleButton;


var PlayerStatsClass = Object.assign({}, {}, {

    displayName: 'PlayerStats',

    propTypes: {
        selected: React.PropTypes.bool,
        friend: React.PropTypes.object,
        place: React.PropTypes.number,
        score: React.PropTypes.number
    },

    getInitialState: function () {
        var state = {
            friend: this.props.friend || {},
            selected: this.props.selected || false,
            place: this.props.place || 0,
            score: this.props.score || 9999999,
            roundsComplete: 0
        };
        state.roundsBundlesState = appManager.getGameState().getRoundsBundles() || {};
        state.roundsComplete = this.countRoundsComplete(state.roundsBundlesState) || 0;
        state.roundsBundlesData = appManager.getSettings().getRoundsBundles() || {};
        state.roundsTotal = this.countRoundsTotal(state.roundsBundlesData) || 1;
        state.profilePicUrl = "url(" + state.friend.picture + ")" || "";
        state.profileFirstName = state.friend.first_name || "FirstName";
        state.profileLastName = state.friend.last_name || "LastName";

        return state;
    },

    componentWillReceiveProps: function (nextProps) {
        //console.log({NextPropsFriend: nextProps.friend});
        //console.log({NextPropsScore: nextProps.hasOwnProperty('score')});

        var newState = {};
        if (nextProps.hasOwnProperty('selected') && nextProps.value != this.state.selected) {
            newState.selected = nextProps.selected || false;
        }
        if (nextProps.hasOwnProperty('friend') && nextProps.value != this.state.friend) {
            newState.friend = nextProps.friend || {};
            newState.profilePicUrl = "url(" + nextProps.friend.picture + ")" || "";
            newState.profileFirstName = nextProps.friend.first_name || "FirstName";
            newState.profileLastName = nextProps.friend.last_name || "LastName";
        }
        if (nextProps.hasOwnProperty('place') && nextProps.value != this.state.place) {
            newState.place = nextProps.place || 0;
        }
        if (nextProps.hasOwnProperty('score') && nextProps.value != this.state.score) {
            newState.score = nextProps.score || 9999998;
        }
        if (Utils.countObjectProperties(newState) == 0) {
            console.log("props didn't change");
            return;
        }

        //console.log({newState: newState});
        //console.log("props changed");
        this.setState(newState);
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
        //console.log(this.state.friend);

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
            initialSlide: parseInt(router.getParam('initialSlide')) || 0,
            facebookOnline: appFB.isAuthorized(),
            myData: {},
            friendsData: []
        };

        return state;
    },

    componentDidMount: function () {
        if (!this.state.facebookOnline) {
            return;
        }

        this.retrieveFacebookData();
    },

    retrieveFacebookData: function () {
        appFB.getMe().then(function (result) {
            if (result === null || typeof result !== 'object') {
                console.log("getMe result invalid");
            }

            this.setState({myData: result});
        }.bind(this)).then(function(){
            return appFB.getAppFriends()
        }).then(function (result) {
            if (result.constructor !== Array) {
                console.log("getAppFriends result invalid");
                return;
            }

            this.setState({friendsData: result});
        }.bind(this));
    },

    friendsRankings: function () {
        var friendsData = this.state.friendsData;

        if (friendsData.length <= 0) {
            return <div></div>;
        }

        return friendsData.map(function (friend, idx, allFriends) {
            return (
                <PlayerStats key={"player_"+idx}
                             friend={friend}
                             place={idx+1}
                />
            )
        });
    },

    onClickInviteFriends: function () {
        appFB.invite().then(function (result) {
            if (!result) {
                return;
            }
            if (!result.hasOwnProperty("to")) {
                return;
            }
            if (result.to.constructor !== Array) {
                return;
            }

            var coinsPerFriend = appManager.getSettings().getFreeCoins().sendInvite;
            var coinsToAdd = result.to.length * coinsPerFriend;

            appManager.getGameState().addCoins(coinsToAdd);
        }).then(function () {
            this.forceUpdate();
        }.bind(this));
    },

    onClickLoginToFacebook: function () {
        appFB.login().then(function(res){
            this.setState({
                facebookOnline: appFB.isAuthorized()
            });
        }.bind(this)).then(function(res) {
            this.retrieveFacebookData()
        }.bind(this));
    },

    renderAuthorized: function () {
        var facebookImg = {
            backgroundImage: "url('" + this.getImagePath('button/facebook_connect') + "')"
        };

        var myData = this.state.myData;
        //console.log({myDataRender: myData});

        return (

            <div className="page-rankings">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">

                        <div className="heading">{i18n._('rankings.heading')}</div>

                        <div className="friends-rankings">
                            <PlayerStats
                                selected={true}
                                friend={myData}
                            />
                            {this.friendsRankings()}
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
    },

    renderUnauthorized: function () {
        var rankingsImage = {
            backgroundImage: "url('" + this.getImagePath('rankings/leader_big') + "')"
        };

        return (

            <div className="page-rankings">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">

                        <div className="heading">{i18n._('rankings.heading')}</div>

                        <div className="unautharized">

                            <div className="description">{i18n._('rankings.login.description')}</div>
                            <div className="image" style={rankingsImage}></div>

                            <SimpleButton className="login"
                                          onClick={this.onClickLoginToFacebook}>
                                {i18n._('rankings.login.button')}
                            </SimpleButton>

                        </div>


                    </div>

                </div>
            </div>

        );
    },

    render: function () {
        if (this.state.facebookOnline) {
            return this.renderAuthorized();
        }

        return this.renderUnauthorized();
    }

});
module.exports = React.createClass(PageRankings);
module.exports.Class = PageRankings;