import React from 'react';
import Analog from './Analog';
import moment from 'moment-timezone';
import {getHorizontalLayoutStyle, getVerticalLayoutStyle, getBackGroundColor} from './ClockStyle';
import './clock.css';

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      time: moment().utcOffset(this.props.params['utc-diff'] * 60).format('HH:mm:ss A'),
      date: moment().utcOffset(this.props.params['utc-diff'] * 60).format('ddd D MMM Y'),
    });
  }

  incrementCounter() {
    const formatT = 'HH:mm:ss';
    const formatD = 'ddd D MMM YYYY';
    this.setState({
      time: moment().utcOffset(this.props.params['utc-diff'] * 60).format(formatT),
      date: moment().utcOffset(this.props.params['utc-diff'] * 60).format(formatD)
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.incrementCounter(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const styles = this.props.widthSize > this.props.heightSize ? getHorizontalLayoutStyle(this.props.widthSize, this.props.heightSize) : getVerticalLayoutStyle(this.props.widthSize, this.props.heightSize);
    const ClassClockCss = "clock " + getBackGroundColor(moment().utcOffset(this.props.params['utc-diff'] * 60).format("HH"));

    return (
      <div className={ClassClockCss} style={styles.clock}>
        <Analog analogStyle={styles.analog} utcDiff={this.props.params['utc-diff']}/>
        <div style={styles.text}>
          <h2 style={styles.time}>{this.state.time}</h2>
          <h2 style={styles.date}>{this.state.date}</h2>
          <h2 style={styles.city}>{this.props.params.city}</h2>
        </div>
      </div>
    );
  }
}

export default Clock;