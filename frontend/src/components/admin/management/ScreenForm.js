import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

import AppForm from './AppForm';

class ScreenForm extends Component{

	table = {
		rows: [],
		cols: []
	};
	constructor(props){
		super(props);

		this.showAppForm = this.showAppForm.bind(this);
		this.cancelForm = this.cancelForm.bind(this);
		this.createAppTable = this.createAppTable.bind(this);
		this.saveForm = this.saveForm.bind(this);
		this.updateView = this.updateView.bind(this);
	}

	componentWillMount(){
		this.initTable();
		this.initScreenFormData();
	}

	initScreenFormData(){
		let appsData = this.props.apps;
		let apps = [];
		for(let i=0; i<appsData.length; i++){
			let app = {
				id: appsData[i].id,
				type: appsData[i].type,
				parameters: appsData[i].parameters
			}
			apps.push(app);
		}
		this.setState({
			type: this.props.type,
			"animation-type": this.props["animation-type"],
			rows: this.props.rows,
			cols: this.props.cols,
			apps: apps
		})
	}

	initTable(){
		let max = this.props.rows> this.props.cols? this.props.rows: this.props.cols;
		for(let i=0; i<max; i++){
			if(i<this.props.rows) this.table.rows.push(1);
			if(i<this.props.cols) this.table.cols.push(1);
		}
	}

	createAppTable(){
		let apps = this.state.apps;
		let rows = parseInt(ReactDOM.findDOMNode(this.refs.rows).value, 10);
		let cols = parseInt(ReactDOM.findDOMNode(this.refs.cols).value, 10);
		let currentSize = apps.length;
		let futrueSize = rows * cols;
		if(futrueSize > currentSize){
			for(let i=currentSize; i< futrueSize; i++){
				let app = {
					type: "",
					parameters: []
				}	
				apps.push(app);
				if(this.table.rows.length < rows) this.table.rows.push(1);
				if(this.table.cols.length < cols) this.table.cols.push(1);
			}
		}
		if(futrueSize < currentSize){
			for(let i=futrueSize; i< currentSize; i++){
				apps.pop();
				if(this.table.rows.length > rows) this.table.rows.pop();
				if(this.table.cols.length > cols) this.table.cols.pop();
			}
		}
		this.setState({
			rows: rows,
			cols: cols,
			apps: apps
		})
	}

	showAppForm(isShow, app){
		if(app.parameters === undefined){
			app.parameters = [];
		}
		this.setState({activatedAppForm: isShow,
				appData: app});
	}

	updateView(){
		this.forceUpdate();
	}

	cancelForm(){
		this.props.actionForm.showScreenForm(false, {});
	}

	saveForm(){
		let screen = {
			type: ReactDOM.findDOMNode(this.refs.type).value,
			"animation-type": ReactDOM.findDOMNode(this.refs.animation).value,
			rows: this.state.rows,
			cols: this.state.cols,
			apps: this.state.apps
		}
		if(this.props.id !== undefined){
			screen.id = this.props.id;
		}
		this.props.actionForm.save(screen, this.props.position);
	}

	render(){
		let table = this.table;
		let apps = this.state.apps;
		let actionAppForm = {
			showAppForm: this.showAppForm,
			updateView: this.updateView
		}
		let appForm = this.state.activatedAppForm? <AppForm actionForm={actionAppForm} data={this.state.appData}/>: "";
		return(
			<div className="row">
				<div className="col-md-6">
					<div className="panel panel-info">
						<div className="panel-heading">
							<h3>New Screen</h3>
						</div>
						<div className="panel-body">
							<div className="form-horizontal">
								<div className="form-group">
								    <label className="control-label col-md-2">Type:</label>
								    <div className="col-md-10">
								      <input type="text" className="form-control" placeholder="Enter Type" defaultValue={this.state.type} ref="type"/>
								    </div>
								</div>
								<div className="form-group">
								    <label className="control-label col-md-2">Animation Type:</label>
								    <div className="col-md-10">
								      <select type="text" className="form-control" defaultValue={this.state["animation-type"]} ref="animation">
								      	<option>slide-right</option>
								      	<option>slide-left</option>
								      	<option>fade</option>
								      </select>
								    </div>
								</div>
								<div className="form-group">
								    <label className="control-label col-md-2">Rows:</label>
								    <div className="col-md-10">
								      <input type="number" className="form-control" placeholder="Enter Rows" ref="rows" value={this.state.rows} max="5" onChange={this.createAppTable}/>
								    </div>
								</div>
								<div className="form-group">
								    <label className="control-label col-md-2">Columns:</label>
								    <div className="col-md-10">
								      <input type="number" className="form-control" placeholder="Enter Columns" ref="cols" value={this.state.cols} max="5" onChange={this.createAppTable}/>
								    </div>
								</div>
								<div className="form-group">
									<label className="control-label col-md-2">Apps:</label> 
									<div className="col-md-10 text-left">
										<table className="table table-bordered">
											<tbody>
												{table.rows.map(function(element, index){
													return(
														<tr key={index}>
															{table.cols.map(function(item, count){
																let num = (count + index*table.cols.length);
																let name = apps[num].type;
																if(name === ""){
																	name = <i className="fa fa-plus-circle"></i>;
																}
																return(
																	<td className="text-center pointer" onClick={() => actionAppForm.showAppForm(true, apps[num])} key={count}>
																		{name}
																	</td>
																)
															})}
														</tr>
													)
												})}
											</tbody>
										</table>
								    </div>
								</div>
							</div>
						</div>
						<div className="panel-footer">
							<div className="text-right">
								<button className="btn btn-danger margin15" onClick={this.cancelForm}><span><i className="fa fa-ban"></i> Cancel</span></button> 
								<button className="btn btn-success" onClick={this.saveForm}><span><i className="fa fa-floppy-o"></i> Save</span></button>
							</div>
						</div>
					</div>
				</div>
				{appForm}
			</div>
		);
	}
}

export default ScreenForm;