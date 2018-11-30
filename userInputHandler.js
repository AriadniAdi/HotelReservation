const Errors = require("./errors");

class UserInputHandler {
  extractValues() {
    throw Errors.invalidClientType();
  }
}

module.exports = UserInputHandler;