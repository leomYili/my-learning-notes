import React, { Component } from 'react';

export default class C extends Component{
    render(){
        const {text} = this.props;

        return (
            <div>
                这是c模块,其中使用到的公共模块文字{text}
            </div>
        )
    }
}