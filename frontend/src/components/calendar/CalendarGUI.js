import React from 'react'
import moment from 'moment'
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';


class CalendarGUI extends React.Component {
  constructor (props) {
    super(props);
    BigCalendar.momentLocalizer(moment);
  }

  //adding description for each event
  Event({ event }) {
    return (
      <span>
        <strong>
        {event.title}
        </strong>
        { event.desc && (':  ' + event.desc)}
      </span>
    )
  }

  //changing the color for each event depending on type
  eventStyleGetter(event) {
    //choosing the background color
    var backgroundColor = event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
  }

  //render GUI
    render(){
        let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);
    return (
      <div className='calendar-content'>
        <span className="rbc-toolbar-label">Name: {this.props.name}</span>
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
          event : this.Event,
        }}
        eventPropGetter={(this.eventStyleGetter)}
        />
      </div>
    )
  }
}
export default CalendarGUI;