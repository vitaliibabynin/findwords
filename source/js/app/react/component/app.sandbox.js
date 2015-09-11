"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var GroceryListClass = Object.assign({}, {}, {

    handleClick: function(i) {
        console.log('You clicked: ' + this.props.items[i]);
    },

    render: function() {
        return (
            <div>
                {this.props.items.map(function(item, i) {
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