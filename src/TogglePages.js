import React, {Component} from 'react';
import Clock from './components/Clock';
import Hello from './components/Hello.js';
import Website from './components/Website.js';
import Holiday from './components/holiday/Holiday.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
class TogglePages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screens: this.getPages(),
      displayTime: this.getTime()
    }
  }

  getTime() {
    return this.props.url['display-time'];
  }

  isAnimationFade(){
    if(this.props.url['animation-type']==='fade') return true
    else return false
  }

  isAnimationRevertDirection(){
    if(this.props.url['animation-type']==='slide-right') return true
    else return false
  }

  //Change string array to component array
  getPages() {
    let typesContain = [<Hello/>, <Clock/>, <Holiday/>];
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

  render() {
    //default animation is slide-left
    var settings = {
      accessibility: false,
      draggable: false,
      infinite: true,
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: this.state.displayTime * 1000,
      pauseOnHover: false
    }
    if(this.isAnimationFade()){
      settings = {...settings, fade:true}
    }
    if(this.isAnimationRevertDirection()){
      settings = {...settings, rtl:true}
    }
    return (
      <Slider  {...settings}>
        {this.state.screens.map((screen, index) => <div key = {index}>{screen}</div>)}
      </Slider>
    )
  }
}

export default TogglePages;