"use strict";

var classNames = require('classnames');

module.exports = {};

var StartAd = {

    getInitialState: function(){
        return {
            isHidden: true
        };
    },

    componentDidMount: function() {
        if(appAd.canShowStartAdBanner()){
            var startAd = appAd.getStartAd();

            startAd.setOnLoadListener(this.show);
            startAd.setOnErrorListener(this.hide);
            startAd.setOnAdNotFoundListener(this.show);

            this.updateStartAdBanner();
        }
    },

    hide: function(){
        this.setState({isHidden: true}, this.onUpdate);
    },

    show: function(){
        this.setState({isHidden: false}, this.onUpdate);
    },

    onUpdate: function(){
        if(this.props.onUpdate && typeof this.props.onUpdate == 'function'){
            this.props.onUpdate();
        }
    },

    updateStartAdBanner: function(){
        appAd.showStartAdBanner(this.refs.startAdLayout.getDOMNode());
    },

    render: function() {
        var classes = classNames('loader', {hide: !this.props.show});

        return (
            <div className={classNames("startad", {"hide": this.state.isHidden})}>
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
