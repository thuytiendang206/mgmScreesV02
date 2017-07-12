import React, { Component } from 'react';
let offices = require('../../static/resources/file/config/offices.json');

class UpComingItem extends Component {
		
	handleUpComingHoliday(){
		var row = [];
		var listNameHoliday = [];
		var holidayUpComing = this.props.upcoming.holidayUpComing;
		for(var i=0; i<holidayUpComing.length; i++){
			if(holidayUpComing[i]){
				var index = listNameHoliday.indexOf(holidayUpComing[i].name);
				if(index === -1){
					listNameHoliday.push(holidayUpComing[i].name);
					var holiday = {
						name: holidayUpComing[i].name,
						offices: []
					}
					holiday.offices.push(" "+offices[i].cityName);
					row.push(holiday);
				}else{
					row[index].offices.push(" "+offices[i].cityName)
				}
			}
		}

		return this.convertRowToString(row);
	}

	convertRowToString(row){
		var rowContent = "";
		for(var i=0; i<row.length; i++){
			rowContent += (row[i].name +"("); 
			rowContent += row[i].offices.join();
			rowContent += " )"; 
		}
		return rowContent;
	}

	render(){
		let date = new Date(this.props.upcoming.date);
		let row = this.handleUpComingHoliday();
		return(
			<div className="col-md-12">
				<div className="row eachItem">
					<div className="col-md-3 text-left text-green">
						<img className="squareNoWidth" alt=""/>
						{date.toDateString()}
					</div>
					<div className="col-md-9">
						<img className="square" alt=""/>
						{row}
					</div>
				</div>
			</div>
		);
	}
}

export default UpComingItem;