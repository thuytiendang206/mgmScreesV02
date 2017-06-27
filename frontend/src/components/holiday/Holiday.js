import React, { Component } from 'react';
import { getHolidayAtCurrentDate, getUpCommingHoliday } from './action';

import TodayItem from './TodayItem.js';
import UpCommingItem from './UpCommingItem.js';
import './holiday.css';

let offices = require('../../static/resources/file/config/offices.json');

class Holiday extends Component {

   
  constructor(){
    super();

    //var currentDate = new Date("Dec 26 2017 06:00:00 GMT+0700"); //just use to demo
    var currentDate = new Date();
    this.state = {
      currentDate: currentDate,
      today: getHolidayAtCurrentDate(offices, currentDate),
      upcomming:  getUpCommingHoliday(offices, currentDate)
    }; 
    
  }

  static getType() {
    return "Holiday";
  }

  render() {
    return (
      <div className="holiday-Bg">
        <div className="col-md-12">
          <h1 className="holiday-title">International Holidays</h1>
          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-info">
                <div className="panel-heading"><h3>Today Holiday - {this.state.currentDate.toDateString()}</h3></div>
                <div className="panel-body">
                  <div className="row">
                    {this.state.today.map((element, index) => <TodayItem key={index} today={element}/>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-info">
                <div className="panel-heading"><h3>Up Comming - 2 Weeks</h3></div>
                <div className="panel-body">
                  <div className="row">
                    {this.state.upcomming.map((element, index) => <UpCommingItem key={index} upcomming={element}/>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default Holiday;
