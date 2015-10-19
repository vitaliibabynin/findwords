/** @jsx React.DOM */
"use strict";

var classNames = require('classnames');

var PageMain = require('./page/page.main');
var PageGame = require('./page/page.game');
var PageGameVictory = require('./page/page.game.victory.js');


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
            case 'shop':
                //this.renderPage(<PageGame parent={this} />);
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
