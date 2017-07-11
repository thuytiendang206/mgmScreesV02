import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

class CalendarGUI extends React.Component {
  constructor(props) {
    super(props);
    BigCalendar.momentLocalizer(moment);
  }

  //adding description for each event
  Event({ event }) {
    // function finding the longest word in a string
    let findLongestWord = function (str) {
      var words = str.split(' ');
      var maxLength = 0;

      for (var i = 0; i < words.length; i++) {
        if (words[i].length > maxLength) {
          maxLength = words[i].length;
        }
      }
      return maxLength;
    }
    // find the max between 2 numbers    
    let maxNumber = function (a, b) {
      return (a > b) ? a : b;
    };
    // find the min between 2 numbers    
    let minNumber = function (a, b) {
      return (a < b) ? a : b;
    };
    // screenValue is the smaller dimession of window
    let screenValue = minNumber(window.innerHeight, window.innerWidth);
    let fontSize = event.end.getHours() - event.start.getHours();
    //if the duration time of event < 3 hours, the description will not be shown
    if (fontSize < 3) {
      event.desc = undefined;
    }
    //need value of time range for calendar screens here (e.g. 11 hours -from 8-19)
    fontSize = maxNumber(screenValue * 0.04, (screenValue * 0.16 * fontSize) / (event['time-range']));
    fontSize = minNumber(window.innerWidth * 0.23 / findLongestWord(event.title), fontSize);
    return (
      // the fontSize of description will smaller than title fontSize of title
      <span>
        <strong style={{ fontSize: fontSize + 'px', fontFamily: '-webkit-body' }} >
          {event.title}
        </strong><br />
        <span style={{ fontSize: fontSize / 2 + 'px' }}>
          {event.desc && (':  ' + event.desc)}
        </span>
      </span>
    )
  }

  //changing the color for each event depending on type
  eventStyleGetter(event) {
    //choosing the background color
    let backgroundColor = event.color;
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      border: '0px',
      color: 'black',
      display: 'block',
      opacity: 0.8
    };
    return {
      style: style
    };
  }

  //render GUI
  render() {
    let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);
    return (
      <div className='calendar-content'>
        <span className="calendar-name">Name: {this.props.name}</span>
        <BigCalendar
          {...this.props}
          events={this.props.events}
          views={allViews}
          defaultDate={new Date()}
          //showing only mon to fri in calendar
          defaultView='work_week'
          toolbar={false}
          //it will receive property for each event in the array auto
          components={{
            event: this.Event,
          }}
          eventPropGetter={(this.eventStyleGetter)}
          //set limit time range for calendar
          max={new Date(1995, 12, 12, this.props.timeMax - 1,59)}
          min={new Date(1995, 12, 12, this.props.timeMin)}
          endAccessor={({ end }) => new Date(end.getTime() - 1)}
        />
      </div>
    )
  }
}
export default CalendarGUI;