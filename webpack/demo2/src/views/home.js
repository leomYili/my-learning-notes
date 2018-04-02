import A from "../components/A";
import common from "../components/common";
import React, { Component } from "react";
import ReactDOM from 'react-dom';

export default class extends Component {
    render() {
        return (
            <div>
                <p>这是模块home</p>
                <A text={common.text} />
            </div>
        );
    }
}
