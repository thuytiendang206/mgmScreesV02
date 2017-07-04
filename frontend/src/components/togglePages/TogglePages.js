import React from 'react';
import Clock from '../time/Clock';
import Hello from '../hello/Hello.js';
import Website from '../website/Website.js';
import Holiday from '../holiday/Holiday.js';
import Calendar from '../calendar/Calendar.js';
import FacebookPage from '../facebookComponent/FacebookPage.js';
import Danang from '../danang/Danang.js';
import Hamburg from '../hamburg/Hamburg.js';
import Weather from '../weather/Weather.js';
import {CSSTransitionGroup} from 'react-transition-group';
import MultipleScreen from '../multipleScreen/MultipleScreen.js';

import './TogglePages.css';
class TogglePages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: this.getPages(),
      displayTime: this.getTime(),
      animations: this.getAnimations()
    }
  }

  getTime() {
    return this.props.url['display-time'];
  }

  getPages() {
    let typesContain = [<Hello key="Hello" />, <Holiday key="Holiday" />, <Hamburg key="Hamburg" />, <Danang key="Danang" />];
    let types = [];
    let url = this.props.url['screen-apps'];
    for (let i = 0; i < url.length; i++) {
      if (url[i]['type'] === Clock.getType()) {
        types.push(
          <Clock
		    key={i}
            utcDiff={url[i]['params']['utc-diff']}
            city={url[i]['params']['city']}
          />
          );
      } else if (url[i]['type'] === Website.getType()) {
          types.push(
            <Website
		      key={i}
              url={url[i]['params']['url']}
            />
          );
      } else if (url[i]['type'] === FacebookPage.getType()) {
		  types.push(<FacebookPage key={i}
              params={url[i]['params']}
            />
          );
      } else if (url[i]['type'] === MultipleScreen.getType()) {
          types.push(
            <MultipleScreen
              key={i}
              setting={url[i]["params"]}
              />);
      } else if (url[i]['type'] === Weather.getType()) {
		  types.push(<Weather key={i} city={url[i]['params']['city']} degrees={url[i]['params']['degrees']}/>);
      } else if (url[i]['type'] === Calendar.getType()) {
		      types.push(
            <Calendar 
          key={i}  
              calendars={url[i]['calendars']} 
              name={url[i]['name']}
              />
          );
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

  getAnimations() {
    let animation = [];
    let url = this.props.url['screen-apps'];
    for (let i = 0; i < url.length; i++) {
      animation.push(url[i]['animation-type']);
    }
    return animation;
  }

  timer() {
    this.setState({
      screens: [...this.state.screens.slice(1), this.state.screens[0]],
      animations: [...this.state.animations.slice(1), this.state.animations[0]]
    })
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), this.state.displayTime * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    var Child = this.state.screens[0];
    return (
      <div>
        <CSSTransitionGroup
          className="container"
          component="div"
          transitionName={this.state.animations[0]}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {Child}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default TogglePages;