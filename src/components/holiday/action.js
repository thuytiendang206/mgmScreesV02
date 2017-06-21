
var Holidays = require('date-holidays');
var hd = new Holidays();

function isHolidayToday(location, date){
	var obj = {};
	hd.init(location.countryCode, location.cityCode);
	hd.setLanguages("en");
	var holidayToday = hd.isHoliday(date);
	obj.location = location;
	if(holidayToday && holidayToday.type === "public"){
		obj.holidayToday = holidayToday;
		return obj;
	}
	obj.holidayToday = false;
	return obj;
}

function isHolidayUpComming(location, date){
	hd.init(location.countryCode, location.cityCode);
	hd.setLanguages("en");
	var holidayUpComming = hd.isHoliday(date);
	if(holidayUpComming && holidayUpComming.type === "public"){  
		return holidayUpComming;
	}
	return false;
}

export function getHolidayAtCurrentDate(locations, currentDate){
	var results = [];
	for(var i=0; i<locations.length; i++){
		results.push(isHolidayToday(locations[i], currentDate));
	}
	return results;
}

export function getUpCommingHoliday(locations, currentDate){
	var results = [];
	var nextDate = new Date(currentDate);
	for(var i=0; i<13; i++){
		nextDate.setTime(nextDate.getTime() + (24 * 60 * 60 * 1000));
		var obj = {};
		var holidayUpComming = [];
		for(var j=0; j<locations.length; j++){
			holidayUpComming.push(isHolidayUpComming(locations[j], nextDate));
		}
		obj.date = new Date(nextDate);
		obj.holidayUpComming = holidayUpComming;
		results.push(obj);
	}
	return results;
	
}