"use strict";

var classNames = require('classnames');

module.exports = {};

var StartAd = {

    getInitialState: function(){
        return {

        };
    },

    componentDidMount: function() {
        this.updateStartAdBanner();
    },

    updateStartAdBanner: function(){
        appAd.showStartAdBanner(this.refs.startAdLayout.getDOMNode());
    },

    render: function() {
        var classes = classNames('loader', {hide: !this.props.show});

        return (
            <div className={classNames("startad", {"hide": !appAd.canShowStartAdBanner()})}>
                <div className="title">{i18n._("startad.recommendapp")}</div>
                <div className="content" >
                    <div ref="startAdLayout" className="startad-layout"></div>
                </div>
            </div>
        );
    }
}
module.exports.StartAd = React.createClass(StartAd);
module.exports.StartAd.Class = StartAd;
