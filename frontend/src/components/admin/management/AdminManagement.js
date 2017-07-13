import React, { Component }  from 'react';
import './AdminManagement.css';
import ScreenPlayRow from './ScreenPlayRow';
import axios from 'axios';

class AdminManagement extends Component{

	url = process.env.REACT_APP_BACKEND_URL + "admin/api/screenplay/";
	constructor(){
		super();
		this.state = {
			data: []
		};
		this.deleteScreenPlay = this.deleteScreenPlay.bind(this);
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData(){
		axios.get(this.url).then(response => {
			this.setState({data: response.data})
		})
	}

	deleteScreenPlay(id, position){
		axios({
			method: 'delete',
			url: this.url+id
			}).then(response => {
				let data = this.state.data;
				data.splice(position, 1);
				this.setState({data: data});
			});
	}

	render(){
		return(
			<div className="container">
				<div className="row">
					<h1 className="screenplay-title">ScreenPlay Management</h1>
				</div>
				<div className="row">
					<div className="col-md-12">
						<a className="btn btn-primary pull-right" href={`${this.props.match.url}/addscreenplay`}>Add new screenplay</a>
					</div>
				</div>
				<div className="table-responsive">
					<table className="table table-hover">
						<thead>
					      <tr>
					        <th>#</th>
					        <th>Name</th>
					        <th>Display Time</th>
					        <th>Screens</th>
					        <th>Apps</th>
					        <th>Action</th>
					      </tr>
					    </thead>
					    <tbody>
					    	{this.state.data.map((element, index) => <ScreenPlayRow key={index} data={element} delete={this.deleteScreenPlay} index={index+1}/>)}
					    </tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default AdminManagement;