class Errors {
    static invalidClientType() {
        return new Error('Invalid client')
    }

    static invalidDates() {
        return new Error('invalid date')
    }

    static invalidHotel() {
        return new Error('invalid Hotel')
    }

}

module.exports = Errors;