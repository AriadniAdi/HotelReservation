class ClientTypePrice {
    constructor(weekday, weekend) {
        this.weekday = weekday
        this.weekend = weekend;
    }

    priceForDate(date) {
        if(date.getDay() == 0 || date.getDay() == 6)
            return this.weekend;
        else 
            return this.weekday; 
    }
}

module.exports = ClientTypePrice