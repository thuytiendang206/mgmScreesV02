import React, {Component} from 'react';
import Clock from './components/Clock';
import Hello from './components/Hello.js';
import Website from './components/Website.js';
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

  getPages() {
    let typesContain = [<Hello/>, <Clock/>];
    let types = [];
    let url = this.props.url['screen-apps'];
    for (let i = 0; i < url.length; i++) {
      if (url[i]['type'] === Clock.getType()) {
        types.push(<Clock utcDiff={url[i]['params']['utc-diff']} city={url[i]['params']['city']}/>)
      } else if (url[i]['type'] === Website.getType()) {
          types.push(<Website url={url[i]['params']['url']}/>);
      } else {
        let str = url[i]['type'];
        for (let j = 0; j < typesContain.length; j++) {
          if (str === typesContain[j].type.getType()) {
            types.push(typesContain[j]);
            break;
          }
        }
      }
    }
    return types;
  }

  timer() {
    this.setState({
      screens: [...this.state.screens.slice(1), this.state.screens[0]]
    })
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), this.state.displayTime * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
        this.state.screens[0]
    ) 
  }
}

export default TogglePages;