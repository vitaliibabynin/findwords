"use strict";


module.exports = {};

//var GameMixin = require('./../component/app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var Timer = require('./../component/app.timer').Timer;
var ChipButton = require('./../component/app.button').ChipButton;
var GameControl = require('./../component/board/app.gamecontrol.js').GameControl;
var BoardA1 = require('./../component/board/app.board.a1.js').BoardA1;
var BoardA2 = require('./../component/board/app.board.a2.js').BoardA2;
var Notice = require('./../component/app.notice.js').Notice;
var ShownWords = require('./../component/app.shownwords.js').ShownWords;

var NO_WORDS_TO_SHOW = require('./../component/app.notice.js').NO_WORDS_TO_SHOW;

var PageGameAbstract = Object.assign({}, {}, {

    getInitialState: function () {
        var state = {
            boardType: "boardA2",
            noticeType: "",
            noticeContainerHeight: "",
            noticeWord: {letters: []},
            boardMaxHeight: 0,
            wallpaper: "url('" + Utils.getImgPath('wallpaper/fon.png') + "')"
        };

        return state;
    },

    componentWillMount: function () {
        console.log('componentWillMount not implemented.');
    },

    componentDidMount: function () {
        console.log('componentDidMount not implemented.');
    },

    componentWillUnmount: function () {
        console.log('componentWillUnmount not implemented.');
    },

    getBoardData: function () {
        console.log('getBoardData not implemented.');
    },

    setGameStateRoundField: function () {
        console.log('setGameStateRoundField not implemented.');
    },

    getGameStateRoundField: function () {
        console.log('getGameStateRoundField not implemented.');
    },

    getStarsReceived: function () {
        console.log('getStarsReceived not implemented.');
    },

    getRewardScore: function () {
        console.log('getRewardScore not implemented.');
    },

    getRewardCoins: function () {
        console.log('getRewardCoins not implemented.');
    },

    addRewardScore: function () {
        console.log('getRewardCoins not implemented.');
    },

    addRewardCoins: function (rewardCoins) {
        var prevTotalCoins = appManager.getGameState().getCoins();
        var newTotalCoins = prevTotalCoins + rewardCoins;
        appManager.getGameState().setCoins(newTotalCoins);
    },

    addRewards: function () {
        console.log('getRewardCoins not implemented.');
    },

    centerContent: function () {
        var $pageContent = $(this.refs.pageContent.getDOMNode());
        var boardMaxHeight = this.refs.pageContent.getDOMNode().clientHeight
            - parseInt($pageContent.css('padding-bottom'));

        this.setState({boardMaxHeight: boardMaxHeight});
    },


    displayNotice: function (type, word) {
        var boardHeight = this.refs.board.getDOMNode().clientHeight;
        var boardTop = this.refs.board.getDOMNode().getBoundingClientRect().top;

        var noticeContainerStyle = {
            height: boardHeight,
            marginTop: boardTop
        };

        this.setState({
            noticeType: type,
            noticeContainerStyle: noticeContainerStyle || {},
            noticeWord: word
        }, function () {
            setTimeout(function () {
                this.hideNotice();
            }.bind(this), 2000);
        });
    },

    hideNotice: function () {
        if (this.isMounted()) {
            this.setState({
                noticeType: "",
                noticeWord: {letters: []}
            });

            this.refs.board.emptySelectedLetters();
        }
    },


    setRoundComplete: function () {
        console.log('setRoundComplete not implemented.');
    },

    goToPageRoundComplete: function () {
        console.log('goToPageRoundComplete not implemented.');
    },


    facebookUpdate: function () {
        if (appFB.isAuthorized()) {
            appApi.updateRating(
                appFB.getAccessToken(),
                CONST.GAME_TYPE,
                appManager.getSettings().getGameId(),
                appManager.getGameState().getScore(),
                appManager.getGameState().getCompletedRoundsCount()
            );
        }
    },


    selectBoardType: function () {
        switch (this.state.boardType) {
            case "boardA1":
                return BoardA1;
            case "boardA2":
                return BoardA2;
            default:
                return BoardA1
        }
    },


    renderNotice: function () {
        return (
            <Notice noticeType={this.state.noticeType}
                    noticeContainerStyle={this.state.noticeContainerStyle}
                    word={this.state.noticeWord}
                    hideNotice={this.hideNotice}
            />
        )
    },

    renderTimer: function () {
        return (
            <Timer ref="timer" time={this.state.time}
                   setGameStateRoundField={this.setGameStateRoundField}
                   getGameStateRoundField={this.getGameStateRoundField}
            />
        )
    }

});

var PageGameLearn = Object.assign({}, PageGameAbstract, {

    displayName: 'PageGameLearn',

    getInitialState: function () {
        var state = PageGameAbstract.getInitialState.apply(this);

        state.boardData = this.getBoardData() || {};
        state.time = state.boardData.time || 0;
        state.board = this.getGameStateRoundField("board", {}) || {};

        return state;
    },

    componentWillMount: function () {
        //appManager.getMusicManager().playGameMusic();
        appAd.hideBanner();
    },

    componentDidMount: function () {
        window.appAnalytics.trackView('pageGameLearn');

        this.centerContent();
    },

    componentWillUnmount: function () {
        appManager.getMusicManager().playMusic();
        appAd.showBottomBanner();
    },

    getBoardData: function () {
        return appManager.getSettings().getPracticeRound();
    },

    setGameStateRoundField: function (field, newValue) {
        return appManager.getGameState().setPracticeRoundField(field, newValue);
    },

    getGameStateRoundField: function (field, defaultValue) {
        return appManager.getGameState().getPracticeRoundField(field, defaultValue);
    },


    getStarsReceived: function () {
        return appManager.getGameState().getPracticeRoundField('starsReceived') || 3;
    },

    getRewardScore: function (round, starsReceived) {
        //return round.score * (starsReceived / 3) || 0;
        return round.bonus[starsReceived].score || 0;
    },

    getRewardCoins: function (round, starsReceived) {
        //return round.coins * (starsReceived / 3) || 0;
        return round.bonus[starsReceived].coins || 0;
    },

    addRewardScore: function (rewardScore) {
        var prevTotalScore = appManager.getGameState().getScore();
        var newTotalScore = prevTotalScore + rewardScore;
        appManager.getGameState().setScore(newTotalScore);
    },

    addRewards: function () {
        var round = this.state.boardData;
        var params = {};
        params.starsReceived = this.getStarsReceived() || 3;
        params.rewardScore = this.getRewardScore(round, params.starsReceived) || 0;
        params.rewardCoins = this.getRewardCoins(round, params.starsReceived) || 0;

        this.addRewardScore(params.rewardScore);
        this.addRewardCoins(params.rewardCoins);

        return params;
    },

    setRoundComplete: function () {
        appManager.getGameState().setGameStateField("practiceRound", {});
        appManager.getGameState().setPracticeRoundComplete(true);
    },

    goToPageRoundComplete: function (time) {
        var params = this.addRewards();
        this.setRoundComplete();

        this.facebookUpdate();

        time = time || 0;
        setTimeout(function () {
            router.navigate("game", "learn_victory", params);
        }.bind(this), time);
    },


    render: function () {

        var wallpaper = {
            backgroundImage: this.state.wallpaper
        };

        var BoardType = this.selectBoardType();

        return (
            <div className="page page-game" style={wallpaper}>

                {this.renderNotice()}

                <Counters isDisplayBackButton={true}/>

                {this.renderTimer()}

                <div ref="pageContent" className="page-content">

                    <div className="container transform-center">
                        {this.state.boardMaxHeight > 0 ? <BoardType
                            ref="board"
                            boardMaxHeight={this.state.boardMaxHeight}
                            boardData={this.state.boardData}
                            board={this.state.board}
                            isPracticeRound={true}
                            displayNotice={this.displayNotice}
                            setGameStateRoundField={this.setGameStateRoundField}
                            goToPageRoundComplete={this.goToPageRoundComplete}
                        /> : ''}
                    </div>

                </div>
            </div>
        );
    }

});
module.exports.PageGameLearn = React.createClass(PageGameLearn);
module.exports.PageGameLearn.Class = PageGameLearn;

var PageGameMain = Object.assign({}, PageGameAbstract, {

    //mixins: [GameMixin],
    displayName: 'PageGameMain',
    chipProcessing: false,

    getInitialState: function () {
        var state = PageGameAbstract.getInitialState.apply(this);

        state.roundsBundleIdx = parseInt(router.getParam('roundsBundleIdx')) || 0;
        state.roundIdx = parseInt(router.getParam('roundIdx')) || 0;
        state.shownWordsLetters = [];
        state.chipsOpenWord = appManager.getSettings().getChipsCoinsCost().openWord || 0;
        state.chipsOpenLetter = appManager.getSettings().getChipsCoinsCost().openLetter || 0;
        state.chipsShowWord = appManager.getSettings().getChipsCoinsCost().showWord || 0;
        state.shownWordsAnimationLeave = true;
        state.roundComplete = false;

        state.roundsBundlesData = appManager.getSettings().getRoundsBundles();
        state.roundData = state.roundsBundlesData[state.roundsBundleIdx] || [];
        state.boardData = this.getBoardData(state.roundData, state.roundIdx);

        state.board = this.getGameStateRoundField("board", state.roundsBundleIdx, state.roundIdx) || {};
        state.time = state.boardData.time || 0;

        state.openedLetters = this.getGameStateRoundField("openedLetters", state.roundsBundleIdx, state.roundIdx) || [];
        state.shownWords = this.getGameStateRoundField("shownWords", state.roundsBundleIdx, state.roundIdx) || [];
        state.shownWordsLetters = this.shownWordsConverter(state.shownWords, state.boardData) || [];

        return state;
    },

    componentWillMount: function () {
        appManager.getMusicManager().playGameMusic();
    },

    componentDidMount: function () {
        if (this.checkIfRoundIdxIsValid() === false) {
            console.log("roundIdx invalid");
            this.goToPageMain();
            return;
        }

        if (this.checkIfRoundsBundleIsLocked() === true) {
            console.log("roundsBundle locked");
            this.goToPageMain();
            return;
        }

        if (this.checkIfRoundAlreadyComplete() === true) {
            console.log("round already complete");
            this.goToPageVictory();
            return;
        }

        window.appAnalytics.trackView('pageGame');
        appAnalytics.trackEvent('round', 'bundle-' + this.state.roundsBundleIdx + ' round-' + this.state.roundIdx, '', 1);

        this.centerContent();
    },

    checkIfRoundsBundleIsLocked: function (roundsBundleIdx) {
        var roundsBundleIsUnlocked = this.getGameStateRoundsBundleField('isUnlocked', roundsBundleIdx);
        var roundsBundleIsPurchased = this.getGameStateRoundsBundleField('isPurchased', roundsBundleIdx);

        return !(roundsBundleIsUnlocked === true || roundsBundleIsPurchased === true);
    },

    checkIfRoundIdxIsValid: function () {
        var roundsTotal = appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx].rounds.length || 1;
        if (this.state.roundIdx > roundsTotal) {
            return false;
        }
    },

    checkIfRoundAlreadyComplete: function () {
        var wordsTotal = this.state.boardData.words.length;
        var board = this.state.board;
        var wordsComplete = 0;

        for (var k in board) {
            if (!board.hasOwnProperty(k)) {
                continue;
            }

            if (!board[k].openWord) {
                continue;
            }
            wordsComplete++;
        }

        return wordsComplete == wordsTotal;
    },

    goToPageMain: function () {
        router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
    },

    goToPageVictory: function () {
        var params = {};
        params.roundsBundleIdx = this.state.roundsBundleIdx;
        params.roundIdx = this.state.roundIdx;
        params.starsReceived = this.getStarsReceived() || 3;
        params.rewardScore = this.getRewardScore(params.starsReceived) || 0;
        params.rewardCoins = this.getRewardCoins(params.starsReceived) || 0;
        params = this.chooseNextRound(params);

        router.navigate("game", "victory", params);
    },

    centerContent: function () {
        var $pageContent = $(this.refs.pageContent.getDOMNode());
        var $shownWords = $(this.refs.shownWords.getDOMNode());
        //console.log(this.refs.pageContent.getDOMNode().clientHeight);
        //console.log(parseInt($pageContent.css('padding-bottom')));
        var boardMaxHeight = this.refs.pageContent.getDOMNode().clientHeight
            - this.refs.shownWords.getDOMNode().offsetHeight
            - parseInt($shownWords.css('margin-top'))
            - parseInt($pageContent.css('padding-bottom'));


        this.setState({boardMaxHeight: boardMaxHeight});
    },

    componentWillUnmount: function () {
        appManager.getMusicManager().playMusic();
    },

    getBoardData: function (roundData, roundIdx) {
        return roundData.rounds[roundIdx] || {
                time: 1,
                board: {
                    rows: 1,
                    cols: 1
                },
                words: [
                    {
                        letters: [
                            {x: 0, y: 0, letter: ""}
                        ]
                    }
                ]
            };
    },

    shownWordsConverter: function (shownWords, boardData) {
        var shownWordsLetters = [];

        if (shownWords.length == 0) {
            return shownWordsLetters;
        }

        for (var i = 0; i < shownWords.length; i++) {
            var letters = boardData.words[shownWords[i]].letters;
            shownWordsLetters.push(letters);
        }

        return shownWordsLetters;
    },

    setGameStateRoundsBundleField: function (field, newValue, roundsBundleIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }

        return appManager.getGameState().setRoundsBundles(roundsBundleIdx, field, newValue);
    },

    getGameStateRoundsBundleField: function (field, roundsBundleIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }

        return appManager.getGameState().getRoundsBundles(roundsBundleIdx)[field];
    },

    setGameStateRoundField: function (field, newValue, roundsBundleIdx, roundIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }
        if (typeof(roundIdx) == "undefined") {
            roundIdx = this.state.roundIdx;
        }
        if (typeof(field) == "undefined" || typeof(newValue) == "undefined") {
            return false;
        }

        return appManager.getGameState().setRound(roundsBundleIdx, roundIdx, field, newValue);
    },

    getGameStateRoundField: function (field, roundsBundleIdx, roundIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }
        if (typeof(roundIdx) == "undefined") {
            roundIdx = this.state.roundIdx;
        }
        if (typeof(field) == "undefined") {
            return false;
        }

        return appManager.getGameState().getRound(roundsBundleIdx, roundIdx)[field];
    },


    onChipOpenWordClick: function () {
        if (this.chipProcessing) {
            console.log("click denied");
            return;
        }
        this.chipProcessing = true;

        appAnalytics.trackEvent('chips', 'openWord-click', 'click', 1);
        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsOpenWord > coins) {
            appDialogs.getNoMoneyDialog().show();
            this.chipProcessing = false;
            return;
        }

        if (this.refs.board.openWord() !== false) {
            appAnalytics.trackEvent('chips', 'openWord-charged', 'charged', 1);

            var newCoins = coins - this.state.chipsOpenWord;
            appManager.getGameState().setCoins(newCoins);

            if (this.refs.board.checkIfRoundComplete()) {
                //this.goToPageRoundComplete(2000);
                this.goToPageRoundComplete();
                this.chipProcessing = false;
                return;
            }
        }

        this.chipProcessing = false;
    },

    onChipOpenLetterClick: function () {
        if (this.chipProcessing) {
            console.log("click denied");
            return;
        }
        this.chipProcessing = true;

        appAnalytics.trackEvent('chips', 'openLetter-click', 'click', 1);
        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsOpenLetter > coins) {
            appDialogs.getNoMoneyDialog().show();

            this.chipProcessing = false;
            return;
        }

        this.refs.board.openLetter().then(function (result) {
            appAnalytics.trackEvent('chips', 'openLetter-charged', 'charged', 1);
            var newCoins = coins - this.state.chipsOpenLetter;
            appManager.getGameState().setCoins(newCoins);

            if (this.refs.board.checkIfRoundComplete()) {
                //this.goToPageRoundComplete(2000);
                this.goToPageRoundComplete();

                this.chipProcessing = false;
                return;
            }

            this.chipProcessing = false;
        }.bind(this));
    },

    onChipShowWordClick: function () {
        if (this.chipProcessing) {
            console.log("click denied");
            return;
        }
        this.chipProcessing = true;

        appAnalytics.trackEvent('chips', 'showWord-click', 'click', 1);

        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsShowWord > coins) {
            appDialogs.getNoMoneyDialog().show();

            this.chipProcessing = false;
            return;
        }

        var result = this.refs.board.sendWordToShowToPageGame();
        if (result !== false) {
            appAnalytics.trackEvent('chips', 'showWord-charged', 'charged', 1);
            var newCoins = coins - this.state.chipsShowWord;
            appManager.getGameState().setCoins(newCoins);

            this.chipProcessing = false;
            return;
        }

        this.displayNotice(NO_WORDS_TO_SHOW, {letters: []});

        this.chipProcessing = false;
    },


    addToShownWords: function (word, wordIdx) {
        var shownWords = this.state.shownWords;
        var shownWordsLetters = this.state.shownWordsLetters;

        shownWords.push(wordIdx);
        shownWordsLetters.push(word);

        this.setGameStateRoundField('shownWords', shownWords);

        this.setState({
            shownWords: shownWords,
            shownWordsLetters: shownWordsLetters
        })
    },

    removeWordFromShownWords: function (wordIdx) {
        var shownWords = this.state.shownWords;
        var shownWordsLetters = this.state.shownWordsLetters;
        var index = false;

        for (var shownWordIdx = 0; shownWordIdx < shownWords.length; shownWordIdx++) {
            if (shownWords[shownWordIdx] == wordIdx) {
                index = shownWordIdx;
                break;
            }
        }

        if (index === false) {
            return;
        }

        shownWords.splice(index, 1);
        shownWordsLetters.splice(index, 1);

        this.setGameStateRoundField('shownWords', shownWords);

        var shownWordsAnimationLeave = true;
        if (this.checkIfOneWordLeft()) {
            shownWordsAnimationLeave = false;
        }

        this.setState({
            shownWordsAnimationLeave: shownWordsAnimationLeave,
            shownWords: shownWords,
            shownWordsLetters: shownWordsLetters
        })
    },

    checkIfOneWordLeft: function () {
        var boardData = this.state.roundData.rounds[this.state.roundIdx] || {};
        var wordsToFind = boardData.words.length || 100;

        var board = this.getGameStateRoundField("board", this.state.roundsBundleIdx, this.state.roundIdx) || {};
        var wordsFound = 0;
        for (var k in board) {
            if (board[k].openWord) {
                wordsFound++;
            }
        }

        return wordsFound == wordsToFind;
    },


    getStarsReceived: function () {
        return this.getGameStateRoundField('starsReceived', this.state.roundsBundleIdx, this.state.roundIdx) || 3;
    },

    getRewardScore: function (starsReceived) {
        return appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx].rounds[this.state.roundIdx].bonus[starsReceived].score || 0;
    },

    getRewardCoins: function (starsReceived) {
        return appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx].rounds[this.state.roundIdx].bonus[starsReceived].coins || 0;
    },

    addRewardScore: function (rewardScore, roundsBundleIdx) {
        var prevTotalScore = appManager.getGameState().getScore();
        var newTotalScore = prevTotalScore + rewardScore;
        appManager.getGameState().setScore(newTotalScore);

        var prevRoundsBundleScore = appManager.getGameState().getRoundsBundles(roundsBundleIdx).bundleScore;
        var newRoundsBundleScore = prevRoundsBundleScore + rewardScore;
        appManager.getGameState().setRoundsBundles(roundsBundleIdx, 'bundleScore', newRoundsBundleScore);
    },

    addRewards: function () {
        var starsReceived = this.getStarsReceived() || 3;
        var rewardScore = this.getRewardScore(starsReceived) || 0;
        var rewardCoins = this.getRewardCoins(starsReceived) || 0;

        this.addRewardScore(rewardScore, this.state.roundsBundleIdx);
        this.addRewardCoins(rewardCoins);

        appAnalytics.trackEvent(
            'roundResult',
            'bundle-' + this.state.roundsBundleIdx + ' round-' + this.state.roundIdx,
            'remainingTime-' + this.getGameStateRoundsBundleField("secondsRemaining") + ' receivedStars-' + starsReceived,
            1
        );
    },

    setRoundComplete: function () {
        var roundsComplete = this.getGameStateRoundsBundleField("roundsComplete");
        //console.log("setting round complete");
        roundsComplete++;
        this.setGameStateRoundsBundleField("roundsComplete", roundsComplete);
    },

    openNextSlide: function () {
        var numberOfRoundsRequired = this.state.roundsBundlesData[this.state.roundsBundleIdx].numberOfRoundsRequired;

        if (this.state.roundIdx >= numberOfRoundsRequired - 1) {
            var roundsBundleToOpen = this.state.roundsBundleIdx + 1;
            appManager.getGameState().setRoundsBundles(roundsBundleToOpen, 'isUnlocked', true);
        }
    },

    findNextUncompletedRound: function (roundsBundlesGameData, roundsBundleIdx, roundIdx, index) {
        for (var i = index; i < roundsBundlesGameData.length; i++) {
            if (this.checkIfRoundsBundleIsLocked(i) === true) {
                continue;
            }

            var roundsBundleGameState = appManager.getGameState().getRoundsBundles(i);
            if (roundsBundleGameState.roundsComplete < roundsBundlesGameData[i].rounds.length) {
                roundsBundleIdx = i;
                roundIdx = roundsBundleGameState.roundsComplete;

                return {
                    roundsBundleIdx: roundsBundleIdx,
                    roundIdx: roundIdx
                };
            }
        }
        return false;
    },

    chooseNextRound: function (params) {
        var roundsBundlesGameData = appManager.getSettings().getRoundsBundles();
        var roundsBundleIdx = this.state.roundsBundleIdx;
        var roundIdx = this.state.roundIdx + 1;

        var roundAfter = this.findNextUncompletedRound(roundsBundlesGameData, roundsBundleIdx, roundIdx, roundsBundleIdx);
        //var roundAfter = false;
        if (roundAfter !== false) {
            params.nextRoundsBundleIdx = roundAfter.roundsBundleIdx;
            params.nextRoundIdx = roundAfter.roundIdx;
            return params;
        }

        var roundBefore = this.findNextUncompletedRound(roundsBundlesGameData, roundsBundleIdx, roundIdx, 0);
        //var roundBefore = false;
        if (roundBefore !== false) {
            params.nextRoundsBundleIdx = roundBefore.roundsBundleIdx;
            params.nextRoundIdx = roundBefore.roundIdx;
            return params;
        }

        return params;
    },

    goToPageRoundComplete: function (time) {
        this.setRoundComplete();

        if (this.state.roundsBundleIdx < this.state.roundsBundlesData.length - 1) {
            this.openNextSlide();
        }

        this.addRewards();
        this.facebookUpdate();

        time = time || 0;
        setTimeout(function () {
            this.goToPageVictory();
        }.bind(this), time);
    },


    render: function () {
        //console.log("page.game upd@ted");

        //console.log({pageGameScore: appManager.getGameState().getScore()});
        //console.log({pageGameCoins: appManager.getGameState().getCoins()});
        //console.log({pageGameRoundsComplete: this.getGameStateRoundsBundleField("roundsComplete")});

        var pageContentHeight = {
            paddingBottom: appAd.getBottomBannerHeight() + 'px'
        };

        var wallpaper = {
            backgroundImage: this.state.wallpaper
        };

        var BoardType = this.selectBoardType();

        return (
            <div className="page page-game" style={wallpaper}>

                {this.renderNotice()}

                <Counters isDisplayBackButton={true}
                          roundsBundleIdx={this.state.roundsBundleIdx}/>

                {this.renderTimer()}

                <div ref="chips" className="chips">
                    <ChipButton className="open-word"
                                onClick={this.onChipOpenWordClick}
                                value={this.state.chipsOpenWord}
                                icon="open_word">

                        <span>{i18n._('chip.openword')}</span>
                    </ChipButton>
                    <ChipButton className="open-letter"
                                onClick={this.onChipOpenLetterClick}
                                value={this.state.chipsOpenLetter}
                                icon="open_letter">

                        <span>{i18n._('chip.openletter')}</span>
                    </ChipButton>
                    <ChipButton className="show-word"
                                onClick={this.onChipShowWordClick}
                                value={this.state.chipsShowWord}
                                icon="show_word">

                        <span>{i18n._('chip.showword')}</span>
                    </ChipButton>
                </div>

                <div ref="pageContent" className="page-content" style={pageContentHeight}>

                    <div className="container transform-center">
                        {this.state.boardMaxHeight > 0 ? <GameControl
                            ref="board"
                            boardType={BoardType}
                            boardMaxHeight={this.state.boardMaxHeight}
                            boardData={this.state.boardData}
                            board={this.state.board}
                            openedLetters={this.state.openedLetters}
                            shownWords={this.state.shownWords}
                            displayNotice={this.displayNotice}
                            addToShownWords={this.addToShownWords}
                            removeWordFromShownWords={this.removeWordFromShownWords}
                            setGameStateRoundField={this.setGameStateRoundField}
                            goToPageRoundComplete={this.goToPageRoundComplete}
                        /> : ''}


                        <ShownWords ref="shownWords" shownWordsLetters={this.state.shownWordsLetters}
                                    shownWordsAnimationLeave={this.state.shownWordsAnimationLeave}
                        />
                    </div>

                </div>
            </div>
        );
    }

});
module.exports.PageGameMain = React.createClass(PageGameMain);
module.exports.PageGameMain.Class = PageGameMain;