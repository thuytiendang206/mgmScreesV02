
var Holidays = require('date-holidays');
var hd = new Holidays();

let offices = require('../../static/resources/file/config/offices.json');
let holidayData = []
let size = offices.length;

export function initHolidayData(currentDate){
	holidayData = [];
	let year = currentDate.getFullYear();
	for(let i=0; i<size; i++){
		var holiday = new Holidays(offices[i].countryCode, offices[i].cityCode);
		holiday.setLanguages("en");
		holidayData.push(holiday.getHolidays(year));
	}
}

function inRange(date, start, end) {
	let currentYear = date.getFullYear();
	if(currentYear > start.getFullYear()){
		start.setFullYear(currentYear);
		end.setFullYear(currentYear);
	}
    if(start <= date && date <= end){
    	return true;
    }
    return false;
}

function isHoliday(position, date, type){
	let holiday = holidayData[position];
	for(let i=0; i<holiday.length; i++){
		if(holiday[i].type === type && inRange(date, holiday[i].start, holiday[i].end)){
			return holiday[i];
		}
	}
	return false;
}

export function getHolidayAtCurrentDate(currentDate){
	let results = [];
	for(let i=0; i<size; i++){
		let obj = {
			location: offices[i],
			holidayToday: isHoliday(i, currentDate, "public")
		};
		results.push(obj);
	}
	return results;
}

export function getUpComingHoliday(currentDate){
	var results = [];
	var nextDate = new Date(currentDate);
	for(var i=0; i<13; i++){
		nextDate.setTime(nextDate.getTime() + (24 * 60 * 60 * 1000));
		var obj = {};
		var holidayUpComing = [];
		for(var j=0; j<size; j++){
			holidayUpComing.push(isHoliday(j, nextDate, "public"));
		}
		obj.date = new Date(nextDate);
		obj.holidayUpComing = holidayUpComing;
		results.push(obj);
	}
	return results;
	
}