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
        player: React.PropTypes.object,
        place: React.PropTypes.number,
        score: React.PropTypes.number,
        roundsTotal: React.PropTypes.number
    },

    getInitialState: function () {
        var state = {
            //player: this.props.player || {},
            //selected: this.props.selected || false,
            //place: this.props.place || 0,
            //roundsComplete: 0
        };
        //state.roundsBundlesState = appManager.getGameState().getRoundsBundles() || {};
        //state.roundsComplete = state.player.levelscompleted || 0;
        ////state.roundsBundlesData = appManager.getSettings().getRoundsBundles() || {};
        //state.roundsTotal = this.countRoundsTotal(state.roundsBundlesData) || 1;
        //state.profilePicUrl = "url(" + state.player.picture + ")" || "";
        //state.profileFirstName = state.player.first_name || "FirstName";
        //state.profileLastName = state.player.last_name || "LastName";
        //state.score = state.player.score || 0;

        return state;
    },
    //
    //componentWillReceiveProps: function (nextProps) {
    //    //console.log({NextPropsFriend: nextProps.player});
    //    //console.log({NextPropsScore: nextProps.hasOwnProperty('score')});
    //
    //    var newState = {};
    //    if (nextProps.hasOwnProperty('selected') && nextProps.value != this.state.selected) {
    //        newState.selected = nextProps.selected || false;
    //    }
    //    if (nextProps.hasOwnProperty('player') && nextProps.value != this.state.player) {
    //        newState.player = nextProps.player || {};
    //        newState.profilePicUrl = "url(" + nextProps.player.picture + ")" || "";
    //        newState.profileFirstName = nextProps.player.first_name || "FirstName";
    //        newState.profileLastName = nextProps.player.last_name || "LastName";
    //    }
    //    if (nextProps.hasOwnProperty('place') && nextProps.value != this.state.place) {
    //        newState.place = nextProps.place || 0;
    //    }
    //    if (nextProps.hasOwnProperty('score') && nextProps.value != this.state.score) {
    //        newState.score = nextProps.score || 0;
    //    }
    //    if (Utils.countObjectProperties(newState) == 0) {
    //        console.log("props didn't change");
    //        return;
    //    }
    //
    //    //console.log({newState: newState});
    //    //console.log("props changed");
    //    this.setState(newState);
    //},

    //countRoundsComplete: function (roundsBundlesState) {
    //    var roundsComplete = 0;
    //    for (var key in roundsBundlesState) {
    //        if (roundsBundlesState.hasOwnProperty(key)) {
    //            roundsComplete += roundsBundlesState[key].roundsComplete;
    //        }
    //    }
    //
    //    return roundsComplete;
    //},

    //countRoundsTotal: function (roundsBundlesData) {
    //    var roundsTotal = 0;
    //
    //    for (var i = 0; i < roundsBundlesData.length; i++) {
    //        roundsTotal += roundsBundlesData[i].rounds.length;
    //    }
    //
    //    return roundsTotal;
    //},

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
        //console.log(this.state.player);

        var playerStatsClassNames = classNames(
            "player-stats",
            {"selected": this.props.selected}
        );

        var profilePic = {
            backgroundImage: "url(" + this.props.player.picture + ")"
        };

        return (
            <div className={playerStatsClassNames}>
                <div className="place">{this.props.place}.</div>

                <div className="center-block">
                    <div className="profile-pic" style={profilePic}></div>

                    <div className="profile-name">
                        {this.props.player.first_name} {this.props.player.last_name}
                    </div>

                    <div className="levels-complete">
                        {i18n._('rankings.levels-complete')}: {this.props.player.levelscompleted}/{this.props.roundsTotal}
                    </div>

                </div>

                <div className="score">{this.numberFormat(this.props.player.score)}</div>
            </div>
        )

        //var playerStatsClassNames = classNames(
        //    "player-stats",
        //    {"selected": this.state.selected}
        //);
        //
        //var profilePic = {
        //    backgroundImage: this.state.profilePicUrl
        //};
        //
        //return (
        //    <div className={playerStatsClassNames}>
        //        <div className="place">{this.state.place}.</div>
        //
        //        <div className="center-block">
        //            <div className="profile-pic" style={profilePic}></div>
        //
        //            <div className="profile-name">
        //                {this.state.profileFirstName} {this.state.profileLastName}
        //            </div>
        //
        //            <div className="levels-complete">
        //                {i18n._('rankings.levels-complete')}: {this.state.roundsComplete}/{this.state.roundsTotal}
        //            </div>
        //
        //        </div>
        //
        //        <div className="score">{this.numberFormat(this.state.score)}</div>
        //    </div>
        //)

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
            roundsTotal: appManager.getSettings().getRoundsTotal(),
            //myData: {},
            friendsData: []
            //playersScores: [
                //{
                //    id: "101420906907102",
                //    score: 99
                //}
            //]
        };

        return state;
    },

    componentDidMount: function () {
        window.appAnalytics.trackView('pageRankings');

        if (!this.state.facebookOnline) {
            return;
        }

        this.retrieveFacebookData();
    },

    retrieveFacebookData: function () {

        Promise.all([
            appFB.getFriendsRating(),
            appFB.getMe()
        ]).then(function(result){
            var friendsData = Utils.cloneArray(result[0]);
            result[1].score = appManager.getGameState().getScore();
            result[1].levelscompleted = appManager.getGameState().getCompletedRoundsCount();

            friendsData.push(result[1]);

            this.setState({
                myId: result[1].id,
                friendsData: Utils.sortArray(friendsData, 'score')});
        }.bind(this));




        //appFB.getMe().then(function (result) {
        //    if (result === null || typeof result !== 'object') {
        //        console.log("getMe result invalid");
        //    }
        //
        //    this.setState({myData: result});
        //}.bind(this)).then(function () {
        //    return appFB.getAppFriends()
        //}).then(function (result) {
        //    if (result.constructor !== Array) {
        //        console.log("getAppFriends result invalid");
        //        return;
        //    }
        //
        //    //console.log({friendsData: result});
        //    this.setState({friendsData: result});
        //}.bind(this));
    },








    //noFriendsRankings: function (myData) {
    //    myData.score = appManager.getGameState().getScore();
    //
    //    return (
    //        <PlayerStats player={myData}
    //                     selected={true}
    //                     place={1}
    //        />
    //    )
    //},

    //sortDataById: function (playersData) {
    //    var playersDataSortedById = playersData.slice(0);
    //    playersDataSortedById.sort(function (a, b) {
    //        return a.id - b.id;
    //    });
    //},

    //addScore: function (playersData) {
    //    for (var i = 0; i < playersData.length; i++) {
    //        playersData[i].score = Math.floor(Math.random() * (99999 - 999 + 1)) + 999;
    //    }
    //
    //    return playersData;
    //},

    //sortPlayersByScore: function (playersData) {
    //    if(!playersData){ return []; }
    //
    //    var PlayersDataSortedByScore = playersData.slice(0);
    //    PlayersDataSortedByScore.sort(function (a, b) {
    //        return b.score - a.score;
    //    });
    //
    //    return PlayersDataSortedByScore;
    //},

    playersRankings: function () {
        return this.state.friendsData.map(function (player, idx) {
             return (
                    <PlayerStats key={"player_"+idx}
                                 player={player}
                                 selected={player.id == this.state.myId}
                                 place={idx+1}
                                 roundsTotal={this.state.roundsTotal}
                    />
                );
        }.bind(this));


        //
        //var friendsData = this.state.friendsData;
        //var myData = this.state.myData;
        //
        //if (Utils.countObjectProperties(myData) <= 0) {
        //    return <div></div>;
        //}
        //
        //if (friendsData.length <= 0) {
        //    return this.noFriendsRankings(myData);
        //}
        //
        //var playersData = friendsData.concat(myData);
        ////playersData = this.sortDataById(playersData);
        //playersData = this.addScore(playersData);
        //playersData = this.sortPlayersByScore(playersData);
        //
        //return playersData.map(function (player, idx) {
        //    if (player.id == myData.id) {
        //
        //        return (
        //            <PlayerStats key={"me_"+idx}
        //                         player={player}
        //                         selected={true}
        //                         place={idx+1}
        //            />
        //        )
        //    }
        //
        //    return (
        //        <PlayerStats key={"player_"+idx}
        //                     player={player}
        //                     place={idx+1}
        //        />
        //    )
        //}.bind(this));
    },

    //onClickInviteFriends2: function () {
    //    var friendsAlreadyInvited = appManager.getGameState().getFriendsInvited();
    //
    //    appFB.invite(null, null, friendsAlreadyInvited).then(function (result) {
    //        if (!result) {
    //            return;
    //        }
    //        if (!result.hasOwnProperty("to")) {
    //            return;
    //        }
    //        if (result.to.constructor !== Array) {
    //            return;
    //        }
    //
    //        var friendsJustInvited = result.to;
    //
    //        if (friendsAlreadyInvited.length == 0) {
    //            appManager.getGameState().setFriendsInvited(friendsJustInvited);
    //        } else {
    //            var friendsInvited = Utils.removeArrayDuplicates(friendsAlreadyInvited.concat(friendsJustInvited));
    //            appManager.getGameState().setFriendsInvited(friendsInvited);
    //        }
    //
    //        var coinsPerFriend = appManager.getSettings().getFreeCoins().sendInvite;
    //        var coinsToAdd = friendsJustInvited.length * coinsPerFriend;
    //        appManager.getGameState().addCoins(coinsToAdd);
    //
    //        this.forceUpdate();
    //
    //        appDialogs.getInfoDialog()
    //            .setTitle(i18n._('app.dialog.info.addcoins.title'))
    //            .setContentText(i18n._('app.dialog.info.addcoins.description', coinsToAdd))
    //            .show();
    //    }.bind(this));
    //},

    onClickInviteFriends: function () {
        appFB.invite();
    },

    onClickLoginToFacebook: function () {
        appFB.login().then(function (res) {
            this.setState({
                facebookOnline: appFB.isAuthorized()
            });
        }.bind(this)).then(function (res) {
            this.retrieveFacebookData()
        }.bind(this));
    },

    renderAuthorized: function () {
        var facebookImg = {
            backgroundImage: "url('" + this.getImagePath('button/facebook_connect') + "')"
        };

        return (
            <div>

                <div className="players-rankings">
                    {this.playersRankings()}
                </div>

                <div className="invite-friends-text">{i18n._('rankings.invite-friends.get-coins')}</div>

                <SimpleButton className="invite-friends-fb-button"
                              onClick={this.onClickInviteFriends}
                              displayName="InviteFriendsButton" >
                    <div style={facebookImg}>{i18n._('rankings.invite-friends')}</div>
                </SimpleButton>

            </div>

        );
    },

    renderUnauthorized: function () {
        var rankingsImage = {
            backgroundImage: "url('" + this.getImagePath('rankings/leader_big') + "')"
        };

        return (

            <div className="unautharized">

                <div className="description">{i18n._('rankings.login.description')}</div>
                <div className="image" style={rankingsImage}></div>

                <SimpleButton className="login"
                              onClick={this.onClickLoginToFacebook}>
                    {i18n._('rankings.login.button')}
                </SimpleButton>

            </div>

        );
    },

    render: function () {
        var pageContentHeight = {
            paddingBottom: appAd.getBottomBannerHeight() + 'px'
        };

        var wallpaper = {
            backgroundImage: ""
        };
        //var wallpaper = {
        //    backgroundImage: "url('" + Utils.getImgPath('wallpaper/fon.png') + "')"
        //};

        return (
            <div className="page page-rankings" style={wallpaper}>
                <Counters isDisplayBackButton={true}/>

                <div className="page-content" style={pageContentHeight}>
                    <div className={classNames("container", {"unauth": !this.state.facebookOnline})} >
                        <div className="heading">{i18n._('rankings.heading')}</div>
                        {this.state.facebookOnline ? this.renderAuthorized() : this.renderUnauthorized()}
                    </div>

                </div>
            </div>
        )
    }

});
module.exports = React.createClass(PageRankings);
module.exports.Class = PageRankings;