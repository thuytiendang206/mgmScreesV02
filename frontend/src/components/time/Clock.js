import React from 'react';
import Analog from './Analog'
import moment from 'moment-timezone';
import { getHorizontalLayoutStyle, getVerticalLayoutStyle } from './ClockStyle';

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            time: 0,
            date: 0,
        });
    }
    incrementCounter() {
        var formatT = 'HH:mm:ss A';
        var formatD = 'ddd D MMM Y';
        this.setState({
            time: moment().utcOffset(this.props.params.utcDiff * 60).format(formatT),
            date: moment().utcOffset(this.props.params.utcDiff * 60).format(formatD)
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
        return (
            <div className="clock" style={styles.clock}>
                <Analog analogStyle={styles.analog} utcDiff={this.props.params.utcDiff} city={this.props.params.city} isChanged={this.props.isChanged} />
                <div style={styles.text}>
                    <h2 style={styles.time}>{this.state.time}</h2>
                    <h2 style={styles.date}>{this.state.date}</h2>
                    <h2 style={styles.date}>{this.props.params.city}</h2>
                </div>
            </div>
        );
    }
}

export default Clock;