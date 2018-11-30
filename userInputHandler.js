const Errors = require("./errors");

class UserInputHandler {
  extractValues(value) {
    const values = value.split(':');
    const clientType = values ;


    throw Errors.invalidClientType();
  }
}

module.exports = UserInputHandler;

/// Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)