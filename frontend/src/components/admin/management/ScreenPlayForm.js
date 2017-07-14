import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import ScreenForm from './ScreenForm';
import axios from 'axios'

class ScreenPlayForm extends Component{

	url = process.env.REACT_APP_BACKEND_URL + "admin/api/screenplay/";
	screenPlay = {
		name: "",
		"display-time": 0,
		screens: []
	};

	screen = {
		type: "Grid-layout",
		"animation-type": "",
		rows: 1,
		cols: 1,
		apps: [{
			type: "",
			parameters: []
		}]
	};
	
	constructor(){
		super();
		
		this.state = {
			activatedScreenForm: false
		}

		this.showScreenForm = this.showScreenForm.bind(this);
		this.saveScreen = this.saveScreen.bind(this);
		this.saveScreenPlay = this.saveScreenPlay.bind(this);
		this.inputChangeListener = this.inputChangeListener.bind(this);
		this.deleteScreen = this.deleteScreen.bind(this);
	}

	componentWillMount(){
		let name = this.props.match.params.name;
		if(name){
			axios.get(this.url+name).then(response => {
				this.screenPlay = response.data;
				this.forceUpdate();
			})
		};
	}

	showScreenForm(value, screen, position){
		this.setState({activatedScreenForm: value,
			screen: screen,
			position: position
		});
	}
	
	saveScreen(screen, position){
		if(position !== -1){
			this.screenPlay.screens[position] = screen;
		}else{
			this.screenPlay.screens.push(screen);	
		}
		this.showScreenForm(false, {});
	}

	saveScreenPlay(){
		this.screenPlay.name = ReactDOM.findDOMNode(this.refs.name).value;
		this.screenPlay["display-time"] = parseInt(ReactDOM.findDOMNode(this.refs.displayTime).value, 10);
		let screenPlayId = this.screenPlay.id;
		if(screenPlayId){
			let location = this.url + screenPlayId;
			this.Axios_Handler("put", location, this.screenPlay);
		}else{
			this.Axios_Handler("post", this.url, this.screenPlay);
		}
	}

	Axios_Handler(method, url, data){
		axios({
			method: method,
			url: url,
			data: JSON.stringify(data),
			headers:{
				"Content-Type": "application/json; charset=utf8"
			}
		}).then(function(response){
			window.location.href = "/admin";
		})
	}

	inputChangeListener(){
		this.screenPlay.name = ReactDOM.findDOMNode(this.refs.name).value;
		this.screenPlay["display-time"] = parseInt(ReactDOM.findDOMNode(this.refs.displayTime).value, 10);
		this.forceUpdate();
	}

	deleteScreen(position){
		this.screenPlay.screens.splice(position, 1);
		this.forceUpdate();
	}


	render(){

		let actionFormScreen = {
			showScreenForm: this.showScreenForm,
			save: this.saveScreen
		}
		let deleteScreen = this.deleteScreen;
		let screenForm = this.state.activatedScreenForm? <ScreenForm actionForm={actionFormScreen} position={this.state.position} {...this.state.screen}/> : "";
		return(
			<div className="full-screen">
				<div className="row">
					<div className="col-md-4">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3>New ScreenPlay</h3>
							</div>
							<div className="panel-body">
								<div className="form-horizontal">
									<div className="form-group">
									    <label className="control-label col-md-2">Name:</label>
									    <div className="col-md-10">
									      <input type="text" className="form-control" placeholder="Enter name" value={this.screenPlay["name"]} onChange={this.inputChangeListener} ref="name"/>
									    </div>
									</div>
									<div className="form-group">
									    <label className="control-label col-md-2">Display Time:</label>
									    <div className="col-md-10">
									      <input type="number" className="form-control" placeholder="Enter Display Time (second)" value={this.screenPlay["display-time"]} onChange={this.inputChangeListener} ref="displayTime"/>
									    </div>
									</div>
									<div className="form-group">
										<label className="control-label col-md-2">Screens:</label> 
										<div className="col-md-10 text-left">
											<div className="tags">
												{this.screenPlay.screens.map(function(element, index){
													return(
														<span className="label label-success" key={index}>
															<strong onClick={() => actionFormScreen.showScreenForm(true, element, index)}>{element.type}</strong>
															<button className="btn btn-success" onClick={()=>deleteScreen(index)}><i className="fa fa-times"></i></button>
														</span>
													)
												})}
											</div>
									    	<button className="btn btn-primary" onClick={() => actionFormScreen.showScreenForm(true, this.screen, -1)}><span><i className="fa fa-plus"></i> Add New Screen</span></button>
									    </div>
									</div>
								</div>
							</div>
							<div className="panel-footer">
								<div className="text-right">
									<a href="/admin" className="btn btn-danger margin15"><span><i className="fa fa-ban"></i> Cancel</span></a> 
									<button className="btn btn-success" onClick={this.saveScreenPlay}><span><i className="fa fa-floppy-o"></i> Save</span></button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-8">
						{screenForm}
					</div>
				</div>
			</div>
		);
	}

}

export default ScreenPlayForm;