import React, {Component} from 'react';
import FacebookItem from './FacebookItem';
import axios from 'axios';
import './Facebook.css';

export default class FacebookPage extends Component {
  constructor(props) {
    super(props);
    this.state = ({ 
      data: [],
      about: [] 
    });
  }

  static getType() {
    return "Facebook";
  }

  componentWillMount() {
    const ACCESS_TOKEN = 'EAARPQIxk2QsBAGg0WshexQesN7UvFpTKrsZBPylDzhSuUkmnWZAZBtXlJ4qwdAXWaM62EgPfuHVo1FbTQXC8ZAvGEMz0uk0ZApxK6aXfGN6yu3qe1lnrN7F8Lmvii7ClxUzQb6Jj7UOpauC50iNZCUonsjILVif2wZD';
    const DEFAULT_URL = 'https://graph.facebook.com/' + this.props.url;
    const POST_URL = `${DEFAULT_URL}posts?access_token=${ACCESS_TOKEN}&fields=name,description,full_picture,source,message,place,properties,status_type,story,type,created_time&limit=2`;
    axios.get(POST_URL).then(response => {
      this.setState({ data: response.data.data });
    })
  }

  renderFacebookItem() {
    return this.state.data.map((item,index) => (
      <FacebookItem key={index} item={item} />
    ));
  }

  render() {
    return (
      <div id="main"> 
        <div className="navbar navbar-blue navbar-static-top">  
          <img src="images/fb-logo.png" className="icons" alt=""/>
        </div>
        <div className="container-fluid" >   
          <div className="row">
            <div className="col-sm-2">
              <div className="panel panel-default">
                <div className="panel-thumbnail"><img src="images/logo.png" className="img-responsive" alt=""/></div>
              </div>        
            </div>
              {this.renderFacebookItem()}
            </div>
        </div>
      </div>
    );
  }
}