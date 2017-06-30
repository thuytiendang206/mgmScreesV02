import React, {Component} from 'react';
import TogglePages from '../togglePages/TogglePages.js';
import Error from '../error404/Error';
import axios from 'axios';
class Location extends Component {
    constructor(props) {
      super(props);
    this.state = {
      errorOccured: false
    }
  }

  fetchData() {
    axios.get(this.geturl())
      .then(res => {
        if (typeof(res.data)==="object"){
          this.setState({
            data: res.data
          });
        }
        else{
          this.setState({errorOccured: true});
        }
      }, () => {this.setState({errorOccured: true});})
  }

  geturl() {
    const defaultScreen= './differentlocationsjson/default.json';
    const url = new URL(window.location.href);
    const substring = "screenplay=";
    if (!url.search) return defaultScreen;
    else {
      if (window.location.href.includes(substring)){
        var params = url.searchParams.get("screenplay");
        params='./differentlocationsjson/'+params+'.json';
        return params;
      }
    }
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
