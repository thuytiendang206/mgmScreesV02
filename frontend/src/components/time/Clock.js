import React from 'react';
import Analog from './Analog'
import moment from 'moment-timezone';

class Clock extends React.Component{

    constructor(props){
        super(props);
        this.state =({
            time : 0,
            date : 0
        });
    }
    static getType() {
        return "Clock";
    }
    incrementCounter(){
        var formatT = 'HH:mm:ss A';
        var formatD = 'ddd D MMM Y';
        this.setState({
            time : moment().utcOffset(this.props.utcDiff*60).format(formatT),
            date : moment().utcOffset(this.props.utcDiff*60).format(formatD)
        });
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.incrementCounter(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID); 
    }
    
    render(){
        return(
            <div className="clock">
                <Analog utcDiff={this.props.utcDiff} city={this.props.city} />
                <h2 className="time"> {this.state.time} </h2>
                <h2 className="date"> {this.state.date}</h2>
                <h2 className="date"> {this.props.city}</h2>
            </div>   
        );
    }
}

export default Clock;