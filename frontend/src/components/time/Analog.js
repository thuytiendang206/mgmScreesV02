import React from 'react';
import moment from 'moment-timezone';
import './clock.css';

class Analog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: setInterval(this.setDate.bind(this), 1000),
      secondDegrees: (this.getTime('ss') / 60) * 360 + 90,
      minuteDegrees: (this.getTime('mm') / 60) * 360 + 90,
      hourDegrees: (this.getTime('HH') / 12) * 360 + 90
    }
  }

  getTime(format) {
    return moment().utcOffset(this.props.utcDiff * 60).format(format);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  setDate() {
    this.setState({
      secondDegrees: (this.getTime('ss') / 60) * 360 + 90,
      minuteDegrees: (this.getTime('mm') / 60) * 360 + 90,
      hourDegrees: (this.getTime('HH') / 12) * 360 + 90
    });
  }

  render() {
    let width = parseInt(this.props.analogStyle.width);
    let minHeight = parseInt(this.props.analogStyle.minHeight);
    let size = (width < minHeight) ? width * 0.95 : minHeight * 0.95;
    return (
      <div className="clock-container" style={this.props.analogStyle}>
        <div className="analog-clock" style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `${0.03 * size}px solid white`
        }}>
          <div className="dot"/>
          <div className="hand hour-hand" style={{
            transform: `rotate(${this.state.hourDegrees}deg)`
          }}/>
          <div className="hand min-hand" style={{
            transform: `rotate(${this.state.minuteDegrees}deg)`
          }}/>
          <div className="hand second-hand" style={{
            transform: `rotate(${this.state.secondDegrees}deg)`
          }}/>
        </div>
      </div>
    );
  }
}

export default Analog;