import React, { Component } from 'react';
import { handleUpComingHoliday } from './action';

class UpComingItem extends Component {

	render() {
		let date = new Date(this.props.upcoming.date);
		let row = handleUpComingHoliday(this.props.upcoming.holidayUpComing);
		return (
			<div className="col-md-12">
				<div className="row eachItem">
					<div className="col-md-3 text-left text-green">
						<img className="squareNoWidth" alt="" />
						{date.toDateString()}
					</div>
					<div className="col-md-9">
						<img className="square" alt="" />
						{row}
					</div>
				</div>
			</div>
		);
	}
}

export default UpComingItem;