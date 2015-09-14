"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var GroceryListClass = Object.assign({}, {}, {

    handleClick: function (i) {
        console.log('You clicked: ' + this.props.items[i]);
    },

    render: function () {
        return (
            <div>
                {this.props.items.map(function (item, i) {
                    return (
                        <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
                    );
                }, this)}
            </div>
        );
    }

});
module.exports.GroceryList = React.createClass(GroceryListClass);
module.exports.GroceryList.Class = GroceryListClass;

//<GroceryList items={['Apple', 'Banana', 'Cranberry']} />


var ChildClass = Object.assign({}, {}, {
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
            value: ''
        };
    },
    changeHandler: function (e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value);
        }
    },
    render: function () {
        return (
            <input type="text" value={this.props.value} onChange={this.changeHandler}/>
        );
    }
});
var Child = React.createClass(ChildClass);


var ParentClass = Object.assign({}, {}, {

    getInitialState: function () {
        return {
            value: 'foo'
        }
    },

    changeHandler: function (value) {
        this.setState({
            value: value
        });
    },

    render: function () {
        return (
            <div>
                <Child value={this.state.value} onChange={this.changeHandler}/>
                <span>{this.state.value}</span>
            </div>
        );
    }
});
module.exports.Parent = React.createClass(ParentClass);
module.exports.Parent.Class = ParentClass;