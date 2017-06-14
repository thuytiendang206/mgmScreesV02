import React from 'react';

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time : Date().toString()
        }
    }
    static getType() {
        return "Clock";
    }
    render(){
        return (
            <p className="App-clock">
                The time is {this.state.time}
            </p>
        );
    }
    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(),1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick(){
        this.setState({
            time : new Date().toString()
        });
    }
}

export default Clock;