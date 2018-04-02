import React, { Component } from "react";

export default class B extends Component {
    render() {
        const { text } = this.props;

        console.error("I get called from print.js!");

        return <div>这是b模块,其中使用到的公共模块文字{text}</div>;
    }
}