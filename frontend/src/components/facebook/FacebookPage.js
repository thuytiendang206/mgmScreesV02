import React, { Component } from 'react';
import FacebookItem from './FacebookItem';
import axios from 'axios';
import './Facebook.css';
const NUM_OF_POSTS = 2;
class FacebookPage extends Component {

  constructor() {
    super();
    this.state = ({
      data: []
    });
  }

  componentDidMount() {
    const DEFAULT_URL = `https://graph.facebook.com/${this.props.params.url}`;
    const ACCESS_TOKEN = `EAARPQIxk2QsBAGg0WshexQesN7UvFpTKrsZBPylDzhSuUkmnWZAZBtXlJ4qwdAXWaM62EgPfuHVo1FbTQXC8
                          ZAvGEMz0uk0ZApxK6aXfGN6yu3qe1lnrN7F8Lmvii7ClxUzQb6Jj7UOpauC50iNZCUonsjILVif2wZD`;
    const FIELDS = 'name,description,full_picture,source,message,type,created_time';
    let POST_URL = `${DEFAULT_URL}/posts?access_token=${ACCESS_TOKEN}&fields=${FIELDS}&limit=${NUM_OF_POSTS}`;
    //Check if facebook has time limit or default 
    if (this.props.params['end-day'] && this.props.params['start-day']) {
      const TIME_LIMIT = `since=${this.props.params['start-day']}&until=${this.props.params['end-day']}`;
      POST_URL = `${POST_URL}&${TIME_LIMIT}`;
    }
    axios.get(POST_URL).then(response => {
      this.setState({ data: response.data.data });
    });
  }

  getFacebookPost() {
    return this.state.data.map((item, index) => (
      <FacebookItem key={index} heightSize={this.props.heightSize} item={item} widthSize={this.props.widthSize / 2} />
    ));
  }

  getNavbar() {
    if (this.props.widthSize <= 992) {
      return (
        <div className='navbar-static-top small-navbar col-sm-12'>
          <img src='images/fb-logo.png' alt='' />
          <img src='images/mgm-logo.svg' alt='' />
        </div>
      );
    } else {
      return (
        <div className='col-md-1 big-navbar'>
          <img src='images/fb-logo.png' className='img-responsive' alt='' />
          <img src='images/logo.png' className='img-responsive' alt='' />
        </div>
      );
    }
  }

  render() {
    return (
      <div className='fb-main container-fluid'>
        {this.getNavbar()}
        <div className='col-md-11 col-sm-12' style={{ height: `${this.props.heightSize * 0.9}px` }}>
          {this.getFacebookPost()}
        </div>
      </div>
    );
  }
}

export default FacebookPage;