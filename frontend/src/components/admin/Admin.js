import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminManagement from './dashboard/AdminManagement';
import ScreenPlayForm from './forms/ScreenPlayForm';
import axios from 'axios';

class Admin extends Component {

  url_backend = process.env.REACT_APP_BACKEND_URL + "admin/api/screenplay/";

  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.deleteScreenPlay = this.deleteScreenPlay.bind(this);
    this.updateScreenPlay = this.updateScreenPlay.bind(this);
    this.saveScreenPlay = this.saveScreenPlay.bind(this);
  }

  async componentDidMount() {
    let data = await axios.get(this.url_backend);
    this.setState({
      data: data.data
    });
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
          <Route exact path={this.props.match.url}
                 render={(props) => <AdminManagement data={this.state.data}
                                                     delete={this.deleteScreenPlay} {...props}/>}/>
          <Route path={`${this.props.match.url}/screenplay`}
                 render={(props) => <ScreenPlayForm update={this.updateScreenPlay}
                                                    save={this.saveScreenPlay}{...props}/>}/>
        </Switch>
      </Router>
    );
  }
}

export default Admin;