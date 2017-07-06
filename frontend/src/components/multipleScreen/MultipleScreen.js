import React, { Component } from 'react';
import Clock from '../time/Clock.js';

class MultipleScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChanged: true
        };
        this.resize = this.resize.bind(this);
    }

    static getType() {
        return "Grid-layout";
    }

    resize() {
        this.setState({
            isChanged: !this.state.isChanged,
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    componentWillMount() {
        this.resize();
    }

    componentDidMount() {

        window.addEventListener("resize", this.resize);
    }
    componentWillUnmount() {

        window.removeEventListener("resize", this.resize);
    }

    getElements() {
        let setting = this.props.setting["content"];
        var cols = this.props.setting["columns"];
        var rows = this.props.setting["rows"];
        let rowList = [];
        let count = 0;
        for (let i = 0; i < rows; i++) {
            rowList.push([]);
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (setting[count]['type'] === Clock.getType()) {
                    rowList[i].push(
                        <Clock key={count} widthSize={this.state.width / cols} heightSize={this.state.height / rows} isChanged={this.state.isChanged} utcDiff={setting[count]['params']['utc-diff']}
                            city={setting[count]['params']['city']} />
                    );
                }
                count++;
            }
        }
        return rowList;
    }

    render() {
        var elements = this.getElements();
        return (
            <div className="cell">
                {elements.map((element, index) => <div key={index} className="rowClock">{element}</div>)}
            </div>
        );
    };
}
export default MultipleScreen;