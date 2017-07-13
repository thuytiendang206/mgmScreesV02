import React, { Component }  from 'react';

class ScreenPlayRow extends Component{

	render(){
		let appList = [];
		return(
			<tr>
			        <td>{this.props.index}</td>
			        <td>{this.props.data.name}</td>
			        <td>{this.props.data["display-time"]}</td>
			        <td>
				        {this.props.data["screens"].map(function(screen, index){
				        	appList.push(screen.apps);
				        	return(
				        		<div key={index}>
				        			<p>{screen.type}</p>
				        			{
				        				screen.apps.map(function(app, count){
				        					return <br key={count}/>
				        				})
				        			}
				        		</div>		
				        	)
				        })}
			        </td>
			        <td>
			        	{appList.map(function(apps, index){
			        		return(
			        			<div key={index}>
			        				{
			        					apps.map(function(app, count){
			        						return <p key={count}>{app.type}</p>
			        					})
			        				}
			        			</div>
			        		)
			        	})}
			        </td>
			        <td><span className="icon-action-size">
			        		<a href={`admin/editscreenplay/${this.props.data.name}`}><i className="fa fa-pencil-square"></i></a>
			        		<a onClick={()=>this.props.delete(this.props.data.id, (this.props.index - 1))}><i className="fa fa-trash"></i></a>
			        </span></td>
			</tr>
		);
	}
}

export default ScreenPlayRow;