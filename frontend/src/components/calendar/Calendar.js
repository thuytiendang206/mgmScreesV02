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
    let obj = {};
    for (let j = 0; j < items.length; j++) {
      let item = items[j];
      // just adding the first line of description
      if (item.description !== undefined) {
        desc = item.description.split('\n')[0];
      }
      obj = {
        'title': item.summary,
        'start': new Date(item.start.dateTime),
        'end': new Date(item.end.dateTime),
        'desc': desc,
        'color': color,
        'time-range': this.props.params['time-max'] - this.props.params['time-min'],
      };
      desc = undefined;
      ret.push(obj);
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