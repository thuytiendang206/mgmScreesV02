import React from 'react';
import axios from 'axios';
import CalendarGUI from './CalendarGUI.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  //fix the minify problem
  static getType() {
    return "Calendar";
  }

  //get full URL with Google API
  getURl(id) {
    return 'https://www.googleapis.com/calendar/v3/calendars/' + id
      + '/events?key='
      + 'AIzaSyDyWLiA-Jd0WcDsbedpw-7I8dp-rdinktA';
  }

  //transform data
  fetchData(response, color) {
    let items = response.data.items;
    let ret = [];
    let desc = undefined;

    for (let j = 0; j < items.length; j++) {
      let item = items[j];
      // just adding the first line of description
      if (item.description !== undefined) {
        desc = item.description.split('\n')[0];
      }
      let objEvent = {
        'title': item.summary,
        'start': undefined,
        'end': undefined,
        'desc': desc,
        'color': color,
        'allDay': false,
        'time-range': this.props.params['time-max'] - this.props.params['time-min']
      };
      let start = new Date(item.start.dateTime || item.start.date);
      let end = new Date(item.end.dateTime || item.end.date);
      objEvent.allDay = (item.start.dateTime === undefined) || (item.end.dateTime === undefined);
      let datePlus = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, start.getHours());
      let islager2days = end.getDate() >= datePlus.getDate();
      // push event if it is evenr happen all day (without hour star or end )
      if (objEvent.allDay) {
        // set time : minus 1 day
        end.setTime(end.getTime() - 86400000);
        objEvent.start = start;
        objEvent.end = end;
        ret.push(objEvent);
      }
      // if events last than than a day , split event : event for date start, events for the day between day start and day end , envent for date end 
      else if (islager2days) {
        // push if event date start in time range
        if (start.getHours() < this.props.params['time-max'] && start.getHours() > this.props.params['time-min']) {
          objEvent.start = new Date(item.start.dateTime);
          objEvent.end = new Date(start.getFullYear(), start.getMonth(), start.getDate(), this.props.params['time-max']);
          ret.push(objEvent);
        }
        // push if event date end in time range
        if (end.getHours() <= this.props.params['time-max'] && end.getHours() > this.props.params['time-min']) {
          let objEvent2 = {
            'title': item.summary,
            'start': new Date(end.getFullYear(), end.getMonth(), end.getDate(), this.props.params['time-min']),
            'end': new Date(item.end.dateTime),
            'desc': desc,
            'color': color,
            'time-range': this.props.params['time-max'] - this.props.params['time-min']
          }
          ret.push(objEvent2);
        }
        // push all event for the middle days if exist
        while (datePlus.getDate() !== end.getDate()) {
          let objEvent3 = {
            'title': item.summary,
            'start': new Date(datePlus.getFullYear(), datePlus.getMonth(), datePlus.getDate(), this.props.params['time-min']),
            'end': new Date(datePlus.getFullYear(), datePlus.getMonth(), datePlus.getDate(), this.props.params['time-max']),
            'desc': desc,
            'color': color,
            'time-range': this.props.params['time-max'] - this.props.params['time-min']
          }
          ret.push(objEvent3);
          datePlus.setDate(datePlus.getDate() + 1);
        }
      }
      // push event if the start and end in the same day
      else if (end.getDate() === start.getDate()) {
        if (end.getHours()> this.props.params['time-min'] && start.getHours() < this.props.params['time-max']) {
          objEvent.start = start;
          objEvent.end = end;
          ret.push(objEvent);
        }
      }
      desc = undefined;
    }
    return ret;
  }

  componentDidMount() {
    let events = [];
    let arr = [];
    for (let i = 1; i <= this.props.params['number-of-calendars']; i++) {
      let item = {
        'calendar-id': this.props.params['calendar-id-' + i],
        'color': this.props.params['color-' + i],
      }
      arr.push(item);
    }
    arr.map((item) => {
      return axios.get(this.getURl(item['calendar-id']))
        .then(response => {
          events = [...events, ...this.fetchData(response, item['color'])];
          this.setState({ events: events });
        });
    });
  }

  render() {
    return (
      <CalendarGUI events={this.state.events}
        name={this.props.params.name}
        timeMin={this.props.params['time-min']}
        timeMax={this.props.params['time-max']}
      >
      </CalendarGUI>
    )
  }
}
export default Calendar;
