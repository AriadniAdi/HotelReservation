const Errors = require("./errors");
const ClientType = require("./clientType");
const UserInput = require("./userInput");

class UserInputHandler {
  extractValues(value) {
    if (value == undefined) {
      throw Errors.invalidClientType();
    }
    const values = value.split(":");
    if (values.length != 2) {
      throw Errors.invalidClientType();
    }
    const clientType = values[0].trim();
    if (!ClientType.isValid(clientType)) {
      throw Errors.invalidClientType();
    }
    const dates = values[1]
      .split(",")
      .map(item => this.dateFromString(item.trim()));
    if(dates.includes(undefined)) {
        throw Errors.invalidDates();
    }
    return new UserInput(clientType, dates);
  }

  dateFromString(value) {
    const day = parseInt(value.substring(0, 2));
    if(day === undefined || day === NaN) { 
        
        return undefined
    }
    const month = this.getMonthIndex(value.substring(2, 5));
    if(month === -1) {
        return undefined
    }
    
    const year = value.substring(5, 9);
    if(year == undefined || year == NaN) { 
        return undefined
    }
    return new Date(year, month, day);
  }

  getMonthIndex(month) {
    let months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ]
    for(var i = 0; i < months.length; i++) {
        if(months[i] === month.trim().toLowerCase()) {
            return i
        }
    }
    return -1
  }
}

module.exports = UserInputHandler;