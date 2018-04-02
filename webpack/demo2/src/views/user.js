import C from "../components/C";
import common from "../components/common";
import React, { Component } from "react";
import ReactDOM from 'react-dom';

export default class extends Component {
    render() {
        return (
            <div>
                <p>这是模块user</p>
                <C text={common.text} />
            </div>
        );
    }
}
