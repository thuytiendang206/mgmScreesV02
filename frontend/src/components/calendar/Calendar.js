import React from 'react'
import CalendarGUI from './CalendarGUI.js'
import axios from 'axios'

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      index: 5
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
  fetchData(response,color) {
    let items = response.data.items;
    let ret = [];
    let desc = undefined;
    let obj = {};
    for (let j = 0;j < items.length; j++){
      let item=items[j];
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
      };
      desc=undefined;
      ret.push(obj);
    }
      return ret;
  }

  componentWillMount() {
    let events = [];
    let arr = this.props.calendars;
    arr.map((item) =>{
      return axios.get(this.getURl(item['calendar-id']))
      .then(response=>{
        events=[...events,...this.fetchData(response,item['color'])];
        this.setState({ events: events });
      });
    });
  }

  render() {
    return (
      <CalendarGUI events={this.state.events} name={this.props.name}></CalendarGUI>
    )

  }
}
export default Calendar;
