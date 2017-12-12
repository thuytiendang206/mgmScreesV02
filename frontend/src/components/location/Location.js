import React, { Component } from 'react';
import TogglePages from '../togglePages/TogglePages';
import Error from '../error404/Error';
import axios from 'axios';

class Location extends Component {

  DataUrl = process.env.REACT_APP_BACKEND_URL + "api/screenplay/";

  constructor(props) {
    super(props);
    this.state = {
      errorOccured: false
    }
  }

  fetchData() {
    axios.get(this.getUrl())
      .then(res => {
        if (typeof (res.data) === "object") {
          this.setState({
            data: res.data
          });
        }
        else {
          this.setState({ errorOccured: true });
        }
      }, () => { this.setState({ errorOccured: true }); })
  }

  getUrl() {
    console.log(this.DataUrl);
    const defaultScreen = this.DataUrl + 'default';
    const url = window.location.href;
    const substring = "screenplay=";
    if (url.indexOf(substring) == -1) return defaultScreen;
    else {
      var params = this.getQueryVariable("screenplay");
      params = this.DataUrl + params;
      return params;
    }
  }

  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    console.log('Query variable %s not found', variable);
  }

  render() {
    const component = this.state.errorOccured
      ? <Error />
      : this.state.data
        ? <TogglePages url={this.state.data} />
        : undefined;
    return (
      <div className="App">
        {component}
      </div>
    );
  }

  componentDidMount() {
    this.fetchData();
  }
}

export default Location;