/** @jsx React.DOM */
"use strict";

var classNames = require('classnames');

module.exports = {};

var Loader = {

    getInitialState: function () {
        return {};
    },


    render: function () {
        var classesLoader = classNames('loader', {hide: !this.props.show});

        return (
            <div className={classesLoader}>
                <div id="squaresWaveG">
                    <div id="squaresWaveG_1" class="squaresWaveG"></div>
                    <div id="squaresWaveG_2" class="squaresWaveG"></div>
                    <div id="squaresWaveG_3" class="squaresWaveG"></div>
                    <div id="squaresWaveG_4" class="squaresWaveG"></div>
                    <div id="squaresWaveG_5" class="squaresWaveG"></div>
                    <div id="squaresWaveG_6" class="squaresWaveG"></div>
                    <div id="squaresWaveG_7" class="squaresWaveG"></div>
                    <div id="squaresWaveG_8" class="squaresWaveG"></div>
                </div>
            </div>
        );
    }
}
module.exports.Loader = React.createClass(Loader);
module.exports.Loader.Class = Loader;
