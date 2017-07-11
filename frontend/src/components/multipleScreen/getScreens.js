import React from 'react';
import Clock from '../time/Clock';
import Hello from '../hello/Hello.js';
import Website from '../website/Website.js';
import Holiday from '../holiday/Holiday.js';
import FacebookPage from '../facebook/FacebookPage.js';
import Danang from '../danang/Danang.js';
import Hamburg from '../hamburg/Hamburg.js';
import Weather from '../weather/Weather.js';
import Calendar from '../calendar/Calendar.js'

var row;
var column;
var state;
const components = {
    Calendar: Calendar,
    Hello: Hello,
    Clock: Clock,
    Website: Website,
    Holiday: Holiday,
    Facebook: FacebookPage,
    Danang: Danang,
    Hamburg: Hamburg,
    Weather: Weather
};

function getElements(apps) {
    let rowList = [];
    let count = 0;
    for (let i = 0; i < row; i++) {
        rowList.push([]);
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            rowList[i].push(
                React.cloneElement(getElement(apps[count]), { key: count })
            )
            count++;
        }
    }
    return rowList;
}

function getElement(app) {
    let MyElement = components[app['type']];
    if (MyElement === Clock || MyElement === Weather) {
        return <MyElement widthSize={state.width / column}
            heightSize={state.height / row}
            isChanged={state.isChanged}
            params={app['params']} />
    }
    return <MyElement params={app['params']} />;
}

function isGridLayout() {
    return (column !== 1 || row !== 1);
}

export function View(cols, rows, apps, currentState) {
    row = rows;
    column = cols;
    state = currentState;
    if (!isGridLayout()) { return getElement(apps[0]) }
    else {
        let combineClassName = 'rowClock row-'+row;
        return getElements(apps).map((element, index) => <div key={index} className={combineClassName}>{element}</div>)
    }
}