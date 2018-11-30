const fs = require('fs');
const path = require("path");

const ClientTypePrice = require('./clientTypePrice');
const Hotel = require('./hotel');

class HotelRepository {
    constructor(databasePath = './database.json') {
        this.databasePath = databasePath;
    }
    fetchHotels() {
        var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, this.databasePath)));
        if(data.hotels == undefined) {
            return []
        }
        return data.hotels.map((item) => {
            const regular = new ClientTypePrice(item.regular.weekday, item.regular.weekend)
            const reward = new ClientTypePrice(item.reward.weekday, item.reward.weekend)
            return new Hotel(item.name, item.rating, regular, reward)
        })
    }
}

module.exports = HotelRepository