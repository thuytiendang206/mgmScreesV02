import React, {Component} from 'react';
import './App.css';
import TogglePages from './TogglePages.js';
import Error from './components/error404/Error';
import axios from 'axios';
class App extends Component {
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
    let ComponentRender=null;
    if (this.state.data && !this.state.errorOccured){
      ComponentRender=<TogglePages url={this.state.data} />;
    }else if (this.state.errorOccured) { 
      ComponentRender=<Error/>;
    }
    return (
      <div className="App">
        {ComponentRender}
      </div>
    );
  }
  componentDidMount() {
    this.fetchData();
  }
}

export default App;
