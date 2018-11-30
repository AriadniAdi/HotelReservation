const fs = require('fs');
const path = require("path");

const ClientTypePrice = require('./clientTypePrice');
const Hotel = require('./hotel');

class HotelRepository {
    constructor(databasePath = '../resources/database.json') {
        this.databasePath = databasePath;
    }
    fetchHotels() {
        var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, this.databasePath)));
        if(data.hotels == undefined) {
            return []
        }
        return data.hotels.map((item) => {
            const regular = new ClientTypePrice(item.regular.weekday, item.regular.weekend)
            const rewards = new ClientTypePrice(item.rewards.weekday, item.rewards.weekend)
            return new Hotel(item.name, item.rating, regular, rewards)
        })
    }
}

module.exports = HotelRepository