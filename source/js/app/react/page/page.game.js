"use strict";


//var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var Timer = require('./../component/app.timer').Timer;
var ChipButton = require('./../component/app.button').ChipButton;
var Board = require('./../component/app.board.js').Board;
var Notice = require('./../component/app.notice.js').Notice;
var ShownWords = require('./../component/app.shownWords.js').ShownWords;

var NO_WORDS_TO_SHOW = require('./../component/app.notice.js').NO_WORDS_TO_SHOW;

var PageGameMain = Object.assign({}, {}, {

    //mixins: [GameMixin],
    displayName: 'PageGameMain',

    getInitialState: function () {
        var state = {
            roundsBundleIdx: parseInt(router.getParam('roundsBundleIdx')) || 0,
            roundIdx: parseInt(router.getParam('roundIdx')) || 0,
            shownWordsLetters: [],
            noticeType: "",
            noticeContainerHeight: "",
            noticeWord: {letters: []},
            chipsOpenWord: appManager.getSettings().getChipsCoinsCost().openWord || 0,
            chipsOpenLetter: appManager.getSettings().getChipsCoinsCost().openLetter || 0,
            chipsShowWord: appManager.getSettings().getChipsCoinsCost().showWord || 0,
            shownWordsAnimationLeave: true,
            gameBoardMaxHeight: 0
        };
        state.roundData = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx] || [];
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
        window.appAnalytics.trackView('pageGame');
        appAnalytics.trackEvent('round', 'bundle-'+this.state.roundsBundleIdx+' round-'+this.state.roundIdx, '', 1);

        var roundsTotal = appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx].rounds.length;
        if (typeof roundsTotal == "undefined") {
            return;
        }

        //console.log({roundIdx: this.state.roundIdx});
        //console.log({roundsTotal: roundsTotal});

        if (this.state.roundIdx > roundsTotal) {
            router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
        }


        var $pageContent = $(this.refs.pageContent.getDOMNode());
        //console.log(this.refs.pageContent.getDOMNode().clientHeight);
        //console.log(parseInt($pageContent.css('padding-bottom')));
        var gameBoardMaxHeight = this.refs.pageContent.getDOMNode().clientHeight
            - this.refs.shownWords.getDOMNode().offsetHeight
            - parseInt($pageContent.css('padding-bottom'));


        this.setState({gameBoardMaxHeight: gameBoardMaxHeight});

        //console.log("pageGameComponentDidMount");
    },

    componentWillUnmount: function () {
        appManager.getMusicManager().playMusic();
    },

    //checkIfBoardFitsOnScreen: function (boardHeight) {
    //    //console.log(boardHeight);
    //
    //    if (typeof boardHeight == "undefined") {
    //        return false;
    //    }
    //
    //    var $pageContent = $(this.refs.pageContent.getDOMNode());
    //    //console.log(this.refs.pageContent.getDOMNode().clientHeight);
    //    //console.log(parseInt($pageContent.css('padding-bottom')));
    //    var contentHeight = this.refs.pageContent.getDOMNode().clientHeight
    //                            - this.refs.timer.getDOMNode().clientHeight
    //                            - this.refs.chips.getDOMNode().clientHeight
    //                            - parseInt($pageContent.css('padding-bottom'));
    //
    //    return contentHeight > boardHeight;
    //},

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

        return appManager.getGameState().setRound(roundsBundleIdx, roundIdx, field, newValue);
    },

    getGameStateRoundField: function (field, roundsBundleIdx, roundIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }
        if (typeof(roundIdx) == "undefined") {
            roundIdx = this.state.roundIdx;
        }

        return appManager.getGameState().getRound(roundsBundleIdx, roundIdx)[field];
    },


    onChipOpenWordClick: function () {
        appAnalytics.trackEvent('chips', 'openWord-click', 'click', 1);
        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsOpenWord > coins) {
            appDialogs.getNoMoneyDialog().show();
            return;
        }

        this.refs.board.openWord().then(function (result) {
            appAnalytics.trackEvent('chips', 'openWord-charged', 'charged', 1);
            if (result !== false) {
                var newCoins = coins - this.state.chipsOpenWord;
                appManager.getGameState().setCoins(newCoins);
                this.forceUpdate();

                if (this.refs.board.checkIfRoundComplete()) {
                    //this.goToPageRoundComplete(2000);
                    this.goToPageRoundComplete();
                }
            }
        }.bind(this));
    },

    onChipOpenLetterClick: function () {
        appAnalytics.trackEvent('chips', 'openLetter-click', 'click', 1);
        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsOpenLetter > coins) {
            appDialogs.getNoMoneyDialog().show();
            return;
        }

        var result = this.refs.board.openLetter();
        if (result !== false) {
            appAnalytics.trackEvent('chips', 'openLetter-charged', 'charged', 1);
            var newCoins = coins - this.state.chipsOpenLetter;
            appManager.getGameState().setCoins(newCoins);
            this.forceUpdate();

            if (this.refs.board.checkIfRoundComplete()) {
                //this.goToPageRoundComplete(2000);
                this.goToPageRoundComplete();
            }
        }
    },

    onChipShowWordClick: function () {
        appAnalytics.trackEvent('chips', 'showWord-click', 'click', 1);

        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsShowWord > coins) {
            appDialogs.getNoMoneyDialog().show();
            return;
        }

        var result = this.refs.board.sendWordToShowToPageGame();
        if (result !== false) {
            appAnalytics.trackEvent('chips', 'showWord-charged', 'charged', 1);
            var newCoins = coins - this.state.chipsShowWord;
            appManager.getGameState().setCoins(newCoins);

            return;
        }

        this.displayNotice(NO_WORDS_TO_SHOW, {letters: []});
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
        if(this.isMounted()){
            this.setState({
                noticeType: "",
                noticeWord: {letters: []}
            });

            this.refs.board.emptySelectedLetters();
        }
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

    addRewardCoins: function (rewardCoins) {
        var prevTotalCoins = appManager.getGameState().getCoins();
        var newTotalCoins = prevTotalCoins + rewardCoins;
        appManager.getGameState().setCoins(newTotalCoins);
    },

    addRewards: function () {
        var params = {};
        params.starsReceived = this.getStarsReceived() || 3;
        params.rewardScore = this.getRewardScore(params.starsReceived) || 0;
        params.rewardCoins = this.getRewardCoins(params.starsReceived) || 0;

        this.addRewardScore(params.rewardScore, this.state.roundsBundleIdx);
        this.addRewardCoins(params.rewardCoins);

        appAnalytics.trackEvent(
            'roundResult',
            'bundle-'+this.state.roundsBundleIdx+' round-'+this.state.roundIdx,
            'remainingTime-'+this.getGameStateRoundsBundleField("secondsRemaining")+' receivedStars-'+params.starsReceived,
            1
        );


        return params;
    },

    setRoundComplete: function () {
        var roundsComplete = this.getGameStateRoundsBundleField("roundsComplete");
        roundsComplete++;
        this.setGameStateRoundsBundleField("roundsComplete", roundsComplete);
    },

    goToPageRoundComplete: function (time) {
        this.setRoundComplete();

        var params = this.addRewards();
        params.roundsBundleIdx = this.state.roundsBundleIdx;
        params.roundIdx = this.state.roundIdx;

        time = time || 200;
        setTimeout(function () {
            router.navigate("game", "victory", params);
        }.bind(this), time);
    },


    render: function () {
        //console.log({pageGameScore: appManager.getGameState().getScore()});
        //console.log({pageGameCoins: appManager.getGameState().getCoins()});
        //console.log({pageGameRoundsComplete: this.getGameStateRoundsBundleField("roundsComplete")});

        var pageContentHeight = {
            paddingBottom: appAd.getBottomBannerHeight() + 'px'
        };

        return (
            <div className="page page-game">

                <Notice noticeType={this.state.noticeType}
                        noticeContainerStyle={this.state.noticeContainerStyle}
                        word={this.state.noticeWord}
                        hideNotice={this.hideNotice}
                />

                <Counters isDisplayBackButton={true}
                          roundsBundleIdx={this.state.roundsBundleIdx}/>

                <Timer ref="timer" time={this.state.time}
                setGameStateRoundField={this.setGameStateRoundField}
                getGameStateRoundField={this.getGameStateRoundField}
                />

                <div ref="chips" className="chips">
                    <ChipButton className="open-word"
                    onClick={this.onChipOpenWordClick}
                    value={this.state.chipsOpenWord}
                    icon="open_word">

                        <span>{i18n._('chip.open-word')}</span>
                    </ChipButton>
                    <ChipButton className="open-letter"
                    onClick={this.onChipOpenLetterClick}
                    value={this.state.chipsOpenLetter}
                    icon="open_letter">

                        <span>{i18n._('chip.open-letter')}</span>
                    </ChipButton>
                    <ChipButton className="show-word"
                    onClick={this.onChipShowWordClick}
                    value={this.state.chipsShowWord}
                    icon="show_word">

                        <span>{i18n._('chip.show-word')}</span>
                    </ChipButton>
                </div>

                <div ref="pageContent" className="page-content" style={pageContentHeight}>

                    <div className="container transform-center">
                    {this.state.gameBoardMaxHeight > 0 ? <Board ref="board"
                            boardMaxHeight={this.state.gameBoardMaxHeight}
                            boardData={this.state.boardData}
                            board={this.state.board}
                            openedLetters={this.state.openedLetters}
                            shownWords={this.state.shownWords}
                            displayNotice={this.displayNotice}
                            addToShownWords={this.addToShownWords}
                            removeWordFromShownWords={this.removeWordFromShownWords}
                            setGameStateRoundField={this.setGameStateRoundField}
                            goToPageRoundComplete={this.goToPageRoundComplete}
                            checkIfBoardFitsOnScreen={this.checkIfBoardFitsOnScreen}
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
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;