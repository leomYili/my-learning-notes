import B from "../components/B";
import {common} from "../components/common";
import React, { Component } from "react";
import ReactDOM from 'react-dom';

class About extends Component {
    render() {
        return (
            <div>
                <p>这是模块about</p>
                <B text={common.text} />
            </div>
        );
    }
}

ReactDOM.render(<About />, document.getElementById("root"));