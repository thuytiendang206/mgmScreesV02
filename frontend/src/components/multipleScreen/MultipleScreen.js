import React, { Component } from 'react';
import Clock from '../time/Clock.js';
class MultipleScreen extends Component {
    static getType() {
        return "Grid-layout";
    }

    getElements() {
        let setting = this.props.setting["content"];
        var cols = this.props.setting["columns"];
        var rows = this.props.setting["rows"];
        const clockStyle = rows > 2 ? {
            "height": "100%",
            "boxSizing": "border-box",
            "border": "1px solid green",
            "flexDirection": "row",
            "minHeight":"0",
            "color": "#171e42",
            "margin": "0 auto",
            "display": "flex",
            "flex": " 1",
            "left": "0"
        } : {
            "height": "100%",
            "boxSizing": "border-box",
            "border": "1px solid green",
            "minHeight":"0",
            "flexDirection": "column",
            "color": "#171e42",
            "margin": "0 auto",
            "display": "flex",
            "flex": " 1",
            "left": "0"
        };
        let analogStyle = {"flex": "2", "height": "100%"};
        let rowList = [];
        let count = 0;
        for (let i = 0; i < rows; i++) {
            rowList.push([]);
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (setting[count]['type'] === Clock.getType()) {
                    rowList[i].push(
                        <Clock key={count} keyMultipleClock="multipleClock" clockStyle={clockStyle} analogStyle={analogStyle} utcDiff={setting[count]['params']['utc-diff']}
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
            <div className="cell"  >
                {elements.map((element, index) => <div key={index} className="rowClock">{element}</div>)}
            </div>
        );
    };
}
export default MultipleScreen;