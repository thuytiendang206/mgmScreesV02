import React, { Component } from 'react';
import { getHolidayAtCurrentDate, getUpComingHoliday, initHolidayData } from './action';
import TodayItem from './TodayItem.js';
import UpComingItem from './UpComingItem.js';
import './holiday.css';


class Holiday extends Component {

  holiday = {
    today: [],
    upcoming: []
  };
   
  constructor(){
    super();
    //var currentDate = new Date("Dec 26 2017 06:00:00 GMT+0700"); //just use to demo
    var currentDate = new Date();
    this.state = {
      currentDate: currentDate
    }; 
    initHolidayData(this.state.currentDate);
  }

  componentWillMount(){
    this.holiday = {
      today: getHolidayAtCurrentDate(this.state.currentDate),
      upcoming:  getUpComingHoliday(this.state.currentDate)
    }
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
                    {this.holiday.today.map((element, index) => <TodayItem key={index} today={element}/>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="panel panel-info">
                <div className="panel-heading"><h3>Up Coming - 2 Weeks</h3></div>
                <div className="panel-body">
                  <div className="row">
                    {this.holiday.upcoming.map((element, index) => <UpComingItem key={index} upcoming={element}/>)}
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
