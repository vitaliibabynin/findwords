"use strict";
var React = window.React || require("react");
var SwitchButton = React.createClass({
    displayName: "Switch Button",
    version: "1.0.4",
    propTypes: {
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        title: React.PropTypes.string,
        label: React.PropTypes.string,
        label_right: React.PropTypes.string,
        labelRight: React.PropTypes.string,
        defaultChecked: React.PropTypes.string,
        theme: React.PropTypes.string,
        checked: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
            id: "",
            name: "switch-button",
            title: "",
            label: "",
            label_right: "",
            labelRight: "",
            defaultChecked: "",
            theme: "rsbc-switch-button-flat-round",
            checked: null,
            onChange: this.handleChange
        }
    },
    handleChange: function () {
    },
    render: function () {
        var id, label, labelRight;
        if (this.props.id == "" && this.props.name != "") {
            id = this.props.name
        }
        if (this.props.label != "") {
            label = React.createElement("label", {htmlFor: id}, this.props.label)
        }
        if ("undefined" !== this.props.label_right || this.props.label_right != "") {
            this.props.labelRight = this.props.label_right
        }
        if (this.props.labelRight != "") {
            labelRight = React.createElement("label", {htmlFor: id}, this.props.labelRight)
        }
        return React.createElement("div", {className: "rsbc-switch-button " + this.props.theme}, label, React.createElement("input", {
            onChange: this.props.onChange,
            checked: this.props.checked,
            defaultChecked: this.props.defaultChecked,
            id: id,
            name: this.props.name,
            type: "checkbox",
            value: "1"
        }), React.createElement("label", {htmlFor: id}), labelRight)
    }
});
module.exports = SwitchButton;