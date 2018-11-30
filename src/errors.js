class Errors {
    static invalidClientType() {
        return new Error('Cliente inválido')
    }

    static invalidDates() {
        return new Error('Data inválida')
    }

    static invalidHotel() {
        return new Error('Hotel inválido')
    }

}

module.exports = Errors;