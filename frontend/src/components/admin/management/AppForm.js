import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

class AppForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			activatedAppForm: false
		}

		this.addNewParameter = this.addNewParameter.bind(this);
		this.saveParameters = this.saveParameters.bind(this);
		this.saveType = this.saveType.bind(this);
		this.reset = this.reset.bind(this);
	}

	addNewParameter(){
		let parameter = {
			key: "",
			value: ""
		}
		this.props.data.parameters.push(parameter);
		this.forceUpdate();
	}

	saveParameters(position, isKey, evt){
		let app = this.props.data;
		if(isKey){
			app.parameters[position].key = evt.target.value;
		}else{
			app.parameters[position].value = evt.target.value;
		}
		this.forceUpdate();
		
	}

	saveType(){
		let app = this.props.data;
		app.type = ReactDOM.findDOMNode(this.refs.type).value;
		this.props.actionForm.updateView();
	}

	reset(){
		this.props.data.type = "";
		this.props.data.parameters = [];
		this.props.actionForm.showAppForm(false, {});
	}

	render(){
		let content = "";
		let saveParameters = this.saveParameters;
		if(this.props.data.parameters !== null){
			content = <div className="panel panel-default">
						<div className="panel-heading">
							<h3>New App</h3>
						</div>
						<div className="panel-body">
							<div className="form-horizontal">
								<div className="form-group">
								    <label className="control-label col-md-2">Type:</label>
								    <div className="col-md-10">
								      <input type="text" className="form-control" placeholder="Enter Type" value={this.props.data.type} onChange={this.saveType} ref="type" />
								    </div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-2">Parameters:</label> 
									<div className="col-md-10 text-right">
								      <button className="btn btn-primary" onClick={this.addNewParameter}><span><i className="fa fa-plus"></i></span></button>
								    </div>
								</div>
								{this.props.data.parameters.map(function(element, index){
									return(
										<div className="form-group" key={index}>
											<label className="control-label col-md-2">Key:</label> 
											<div className="col-md-4">
										      <input type="text" className="form-control" value={element.key} onChange={evt => saveParameters(index, true, evt)} placeholder="Enter Key" />
										    </div>
										    <label className="control-label col-md-2">Value:</label> 
											<div className="col-md-4">
										      <input type="text" className="form-control" value={element.value} onChange={evt => saveParameters(index, false, evt)} placeholder="Enter Value" />
										    </div>
										</div>
									)
								})}
								
							</div>
						</div>
						<div className="panel-footer">
							<div className="text-right">
								<button className="btn btn-danger margin15" onClick={this.reset}><span><i className="fa fa-refresh"></i> Reset</span></button> 
							</div>
						</div>
					</div>;
		}
		return(
			<div className="col-md-6">
				{content}
			</div>
		);
	}
}

export default AppForm;