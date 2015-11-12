/** @jsx React.DOM */
"use strict";

var classNames = require('classnames');

var PageMain = require('./page/page.main');
var PageGame = require('./page/page.game');
var PageGameVictory = require('./page/page.game.victory');
var PageBonus = require('./page/page.bonus');
var PageShop = require('./page/page.shop');
var PageRankings = require('./page/page.rankings');
var PageRate = require('./page/page.rate');

React.initializeTouchEvents(true);
var AppClass = {

    getInitialState: function(){
        return {

        };
    },

    componentWillMount: function() {

    },

    componentDidMount: function() {
        this.updatePage();
        router.addChangeListener(this.updatePage);
        appManager.addChangeListener(this.onApiSettingsUpdated);
    },

    componentDidUpdate: function(prevProps, prevState) {

    },

    componentWillUnmount: function() {
        router.removeChangeListener(this.updatePage);
        appManager.removeChangeListener(this.onApiSettingsUpdated);
    },

    onApiSettingsUpdated: function(){
        this.forceUpdate();
    },

    renderPage: function(page){
        React.render(
            page,
            this.refs.pageLayoutContent.getDOMNode(),
            function(){
                //setTimeout(function(){
                //    this.refs.pageLayoutContent.getDOMNode().scrollTop = 0;
                //}.bind(this), 10);
            }.bind(this)
        );
    },

    updatePage: function(){
        switch(router.getController()){
            case "shop":
                this.renderPage(<PageShop parent={this} />);
                break;
            case "rankings":
                this.renderPage(<PageRankings parent={this} />);
                break;
            case "rate":
                this.renderPage(<PageRate parent={this} />);
                break;
            case "bonus":
                this.renderPage(<PageBonus parent={this} />);
                break;
            case "game":
                switch(router.getAction()){
                    case "victory":
                        this.renderPage(<PageGameVictory parent={this} />);
                        break;
                    case "main":
                    default:
                        this.renderPage(<PageGame parent={this} />);
                        break;
                }
                break;
            case "cleardb":
                DB.getSettings().del('game_state');
                DB.getSettings().del('dialogRateUs');
                alert("game_state cleared");
                break;
            default:
                this.renderPage(<PageMain parent={this} />);
                break;
        }
    },

    render: function() {
        var pageLayoutClasses = classNames('page-layout', router.getController()+'_'+router.getAction());

        return (

                <div ref="pageLayoutContent" className={pageLayoutClasses}>

                </div>

        );
    }
}

module.exports = React.createClass(AppClass);
module.exports.Class = AppClass;
