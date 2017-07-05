import React, {Component} from 'react';
import FacebookItem from './FacebookItem';
import axios from 'axios';
import './Facebook.css';

class FacebookPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({ 
      data: []
    });
  }

  static getType() {
    return "Facebook";
  }

  componentWillMount() {
    const DEFAULT_URL = 'https://graph.facebook.com/' + this.props.params.url;
    const ACCESS_TOKEN = 'access_token=EAARPQIxk2QsBAGg0WshexQesN7UvFpTKrsZBPylDzhSuUkmnWZAZBtXlJ4qwdAXWaM62EgPfuHVo1FbTQXC8'+
                      'ZAvGEMz0uk0ZApxK6aXfGN6yu3qe1lnrN7F8Lmvii7ClxUzQb6Jj7UOpauC50iNZCUonsjILVif2wZD';
    const FIELDS = 'fields=name,description,full_picture,source,message,type,created_time';
    let POST_URL = `${DEFAULT_URL}/posts?${ACCESS_TOKEN}&${FIELDS}&limit=2`;
    //Check if facebook has time limit or default 
    if(this.props.params['end-day']) {
      const TIME_LIMIT = `since=${this.props.params['start-day']}&until=${this.props.params['end-day']}`;
      POST_URL = `${POST_URL}&${TIME_LIMIT}`;
    }
    axios.get(POST_URL).then(response => {
      this.setState({ data: response.data.data });
    });
  }

  loadFacebookPost() {
    return this.state.data.map((item,index) => (
      <FacebookItem key={index} item={item} />
    ));
  }

  render() {
    return (
      <div id="main"> 
        <div className="navbar-blue navbar-static-top">  
          <img src="images/fb-logo.png" className="icons" alt=""/>
        </div>
        <div className="container-fluid" >   
          <div className="fb-row">
            <div className="col-sm-2">
              <div className="panel panel-default">
                <img src="images/logo.png" className="img-responsive" alt=""/>
              </div>        
            </div>
              {this.loadFacebookPost()}
            </div>
        </div>
      </div>
    );
  }
}

export default FacebookPage;