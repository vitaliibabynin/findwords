/** @jsx React.DOM */
"use strict";

var classNames = require('classnames');

module.exports = {};

var Loader = {

    getInitialState: function(){
        return {

        };
    },


    render: function() {
        var classesLoader = classNames('loader', {hide: !this.props.show});

        return (
            <div className={classesLoader}>
                <div id="floatBarsG">
                    <div id="floatBarsG_1" class="floatBarsG"></div>
                    <div id="floatBarsG_2" class="floatBarsG"></div>
                    <div id="floatBarsG_3" class="floatBarsG"></div>
                    <div id="floatBarsG_4" class="floatBarsG"></div>
                    <div id="floatBarsG_5" class="floatBarsG"></div>
                    <div id="floatBarsG_6" class="floatBarsG"></div>
                    <div id="floatBarsG_7" class="floatBarsG"></div>
                    <div id="floatBarsG_8" class="floatBarsG"></div>
                </div>
            </div>
        );
    }
}
module.exports.Loader = React.createClass(Loader);
module.exports.Loader.Class = Loader;
