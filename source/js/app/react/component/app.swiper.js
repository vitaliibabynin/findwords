/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var libSwiper = require('./../../../app/libs/swiper.jquery');
var Slide = require('./app.slide').Slide;

module.exports = {};


var SwiperClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    componentDidMount: function () {

        if(null == this.swiper){
            this.swiper = new libSwiper (this.refs.swiperConatiner.getDOMNode(), {

                direction: 'horizontal',
                loop: false,
                pagination: '.swiper-pagination',
                slidesPerView: 2,
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 0

            });
        }
    },

    render: function () {

        return (
            <div ref="swiperConatiner" className="swiper-container">

                <div className="swiper-wrapper">
                    <Slide slideNumber="1" />
                    <Slide slideNumber="2" />
                    <Slide slideNumber="3" />
                    <Slide slideNumber="4" />
                    <Slide slideNumber="5" />
                </div>

                <div className="swiper-pagination"></div>

            </div>
        );
    }
});
module.exports.Swiper = React.createClass(SwiperClass);
module.exports.Swiper.Class = SwiperClass;