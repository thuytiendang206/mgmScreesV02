import React, { Component } from 'react';

class TodayItem extends Component {
	
	render(){
		return(
			<div className="col-md-12">
				<div className="row eachItem">
					<div className="col-md-4 text-left">
						<img className="margin15 logoOffices" src={this.props.today.location.imagePath} alt="logo"/>
						{this.props.today.location.cityName}
					</div>
					<div className="col-md-8">
						<img className="square" alt=""/>
						{this.props.today.holidayToday.name}
					</div>
				</div>
			</div>
		);
	}
}

export default TodayItem;