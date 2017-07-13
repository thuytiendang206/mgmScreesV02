import React, { Component }  from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AdminManagement from './management/AdminManagement';
import ScreenPlayForm from './management/ScreenPlayForm';


class Admin extends Component {

	render(){
		return(
			<Router>
				<Switch>
					<Route exact path={this.props.match.url} component={AdminManagement}/>
					<Route path={`${this.props.match.url}/addscreenplay`} component={ScreenPlayForm}/>
					<Route path={`${this.props.match.url}/editscreenplay/:name`} component={ScreenPlayForm}/>
				</Switch>
			</Router>
		);
	}
}

export default Admin;