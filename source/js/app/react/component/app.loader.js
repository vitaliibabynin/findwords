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
                <div className="sk-spinner sk-spinner-chasing-dots">
                    <div className='sk-dot1'></div>
                    <div className='sk-dot2'></div>
                </div>
            </div>
        );
    }
}
module.exports.Loader = React.createClass(Loader);
module.exports.Loader.Class = Loader;
