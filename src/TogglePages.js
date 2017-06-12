import React from 'react';
import Clock from './components/Clock.js';
import Hello from './components/Hello.js';
class TogglePages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        screens: this.getPages(),
        displayTime: this.getTime()
    }
  }
  getTime() {
    return this.props.url['display-time'];
  }

  //Change string array to component array
  getPages() {
    let typesContain = [Hello, Clock];
    let types = [];
    for (let i = 0; i < this.props.url['screen-apps'].length; i++) {
      let str = this.props.url['screen-apps'][i]['type'];
      for (let j = 0; j < typesContain.length; j++) {
        if (str === typesContain[j].name) {
          types.push(typesContain[j]);
          break;
        }
      }
    }
    return types;
  }
  timer() {
    this.setState({
        screens: [...this.state.screens.slice(1),this.state.screens[0]]
    })
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), this.state.displayTime*1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  render() {
    var Child = this.state.screens[0];
    return (
        <Child/>
    ) 
  }
}

export default TogglePages;