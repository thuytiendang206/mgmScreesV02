import React, { Component } from 'react';
let offices = require('../../static/resources/file/config/offices.json');

class UpCommingItem extends Component {
		
	handleUpCommingHoliday(){
		var row = [];
		var listNameHoliday = [];
		var holidayUpComming = this.props.upcomming.holidayUpComming;
		for(var i=0; i<holidayUpComming.length; i++){
			if(holidayUpComming[i]){
				var index = listNameHoliday.indexOf(holidayUpComming[i].name);
				if(index === -1){
					listNameHoliday.push(holidayUpComming[i].name);
					var holiday = {
						name: holidayUpComming[i].name,
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
		let date = new Date(this.props.upcomming.date);
		let row = this.handleUpCommingHoliday();
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

export default UpCommingItem;