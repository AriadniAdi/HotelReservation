const Errors = require('./errors');
const ClientType = require('./clientType');

class BookingCalculator {
    cheaperPrice(clientType, dates) {
        if(clientType == undefined || !ClientType.isValid(clientType)) {
            throw Errors.invalidClientType();
        } else if (dates === undefined || dates.constructor !== Array) {
            throw Errors.invalidDates()
        }
        throw Errors.invalidClientType();
    }
    
}

module.exports = BookingCalculator;