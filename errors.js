class Errors {
    static invalidClientType() {
        return new Error('Invalid client')
    }

    static invalidDates() {
        return new Error('invalid date')
    }
}

module.exports = Errors;