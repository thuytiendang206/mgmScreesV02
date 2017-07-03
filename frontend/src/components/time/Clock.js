import React from 'react';
import Analog from './Analog'
import moment from 'moment-timezone';

let mergeProperties = (singleClock, multipleClock) => {
    let sources = [singleClock, multipleClock];
    let result = {};
    let copyBySource = (destination, source) => {
        let keys = Object.keys(source);
        keys.forEach((key) => {
            destination[key] = source[key];
        });
    };
    for (let i = 0; i < sources.length; i++) {
        copyBySource(result, sources[i]);
    }
    return result;
}


class Clock extends React.Component{

    constructor(props){
        super(props);
        this.state =({
            time : 0,
            date : 0,
            isChanged: false
        });
        this.resize = this.resize.bind(this);
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

    resize(){
        this.setState({
            isChanged: !this.state.isChanged
        });
    }

    componentWillMount(){
        this.resize();
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.incrementCounter(),1000);
        window.addEventListener("resize", this.resize);
    }
    componentWillUnmount(){
        clearInterval(this.timerID); 
        window.removeEventListener("resize", this.resize);
    }
    
    render(){
        let clockstyle={};
        let analogstyle={
            verticalAlign: 'middle'
        };

        if(window.innerWidth > window.innerHeight){
            clockstyle = {
                display: 'flex',
                flexDirection: 'row',
                minHeight: '99vh',
                width: '100%',
                margin: '0 auto',
                fontSize: '2em',
                left: '0'
            }
            analogstyle = {
                height: '100vh',
            }
        } else {
            clockstyle = {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '99vh',
                width: '100%',
                margin: '0 auto',
                fontSize: '2em',
                left: '0'
            }
            analogstyle = {
                height: '80vh'
            }
        }
        clockstyle  = this.props.keyMultipleClock === 'multipleClock' ?  mergeProperties(clockstyle, this.props.clockStyle): clockstyle;
        analogstyle  = this.props.keyMultipleClock === 'multipleClock' ?  mergeProperties(analogstyle, this.props.analogStyle): analogstyle;
        return(
            <div className="clock" style={clockstyle} >
                <Analog analogStyle={analogstyle}  utcDiff={this.props.utcDiff} city={this.props.city} isChanged={this.state.isChanged} />
                <div className="text">
                        <h2 className="time">{this.state.time}</h2>
                        <h2 className="date">{this.state.date}</h2>
                        <h2 className="date">{this.props.city}</h2>
                </div>               
            </div>   
        );
    }
}

export default Clock;
