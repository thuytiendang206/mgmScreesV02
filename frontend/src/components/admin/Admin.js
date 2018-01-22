import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import App from './containers/App';
import Error from '../error404/Error.js';
import FormPage from './containers/FormPage';
import Dashboard from './containers/DashboardPage';

import { loggedIn } from "./authentication/oauth";
injectTapEventPlugin();
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
    if (this.state.accessToken) {
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
      <div>
        {
          this.state.accessToken
            ? < App >
              <Switch>
                <Route exact path={this.props.match.url} render={(props) => <Dashboard data={this.state.data}
                  delete={this.deleteScreenPlay} {...props} />} />
                <Route path={`${this.props.match.url}/dashboard`}
                  render={(props) => <Dashboard data={this.state.data}
                    delete={this.deleteScreenPlay} {...props} />} />
                <Route path={`${this.props.match.url}/form`}
                  render={(props) => <FormPage updateData={this.updateScreenPlay} save={this.saveScreenPlay} {...props} />} />
                <Route path="*" component={Error} />
              </Switch>
            </App >
            : <Redirect to={`${this.props.match.url}/login`} />
        }
      </div>
    );
  }
}

export default Admin;