import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminManagement from './dashboard/AdminManagement';
import ScreenPlayForm from './forms/ScreenPlayForm';
import LoginPage from './authentication/LoginPage';
import RegisterPage from "./authentication/RegisterPage";
import axios from 'axios';
import {loggedIn} from "./authentication/oauth";

class Admin extends Component {

  url_backend = process.env.REACT_APP_BACKEND_URL + "admin/api/screenplay/";

  constructor() {
    super();
    this.state = {
      data: [],
      accessToken: loggedIn()
    };
    this.deleteScreenPlay = this.deleteScreenPlay.bind(this);
    this.updateScreenPlay = this.updateScreenPlay.bind(this);
    this.saveScreenPlay = this.saveScreenPlay.bind(this);
  }

  async componentDidMount() {
    if(this.state.accessToken){
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.accessToken}`;
      let data = await axios.get(this.url_backend);
      this.setState({
        data: data.data
      });
    } else {
      axios.defaults.headers.common = undefined;
    }
  }

  async deleteScreenPlay(id, position) {
    let response = await axios({
      method: 'delete',
      url: this.url_backend + id
    });
    if (response.data === "SUCCESS") {
      let data = this.state.data;
      data.splice(position, 1);
      this.setState({
        data: data
      });
    }
  }

  async updateScreenPlay(id, data) {
    let response = await axios({
      method: 'put',
      url: this.url_backend + id,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin";
    }
  }

  async saveScreenPlay(data) {
    let response = await axios({
      method: 'post',
      url: this.url_backend,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    });
    if (response.data === "SUCCESS") {
      window.location.href = "/admin";
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          {
            this.state.accessToken
              ? <Route exact path={this.props.match.url}
                       render={(props) => <AdminManagement data={this.state.data}
                                                           delete={this.deleteScreenPlay}{...props}/>}/>
              : <Route exact path={this.props.match.url}
                       render={(props) => <LoginPage {...props}/>}/>
          }
          <Route path={`${this.props.match.url}/login`}
                 render={(props) => <LoginPage {...props}/>}/>
          <Route path={`${this.props.match.url}/register`}
                 render={(props) => <RegisterPage {...props}/>}/>
          <Route path={`${this.props.match.url}/screenplay`}
                 render={(props) => <ScreenPlayForm update={this.updateScreenPlay}
                                                    save={this.saveScreenPlay}{...props}/>}/>
        </Switch>
      </Router>
    );
  }
}

export default Admin;