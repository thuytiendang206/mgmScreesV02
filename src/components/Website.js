import React, {Component} from 'react';

export default class Website extends Component {
  static getType() {
    return "Website";
  }
  render() {
    return (
        <div >
            <iframe src={this.props.url} scrolling="no" frameBorder="0" style={{border: 0 , 
              overflow: 'hidden', width:100+'%' , height:1800 + 'px'}}  
              allowTransparency="true"/>
        </div>
    )
  }
}