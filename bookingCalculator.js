const Errors = require('./errors');
const ClientType = require('./clientType');
const HotelRepository = require('./hotelRepository');

class BookingCalculator {
    
    constructor(hotelRepository = new HotelRepository()) {
        this.hotelRepository = hotelRepository
    }

    cheaperPrice(clientType, dates) {
        if(clientType == undefined || !ClientType.isValid(clientType)) {
            throw Errors.invalidClientType();
        } else if (dates === undefined || dates.constructor !== Array) {
            throw Errors.invalidDates()
        }
        let hotels = this.hotelRepository.fetchHotels();
        if(hotels.length == 0) {
            throw Errors.invalidHotel()
        }
        var cheaperHotel = hotels[0];
        let cheaperPrice = this.calculatePrice(hotels[0], clientType, dates);
        for(var i = 1; i < hotels.length; i++) {
            const currentPrice = this.calculatePrice(hotels[i], clientType, dates);
            if(currentPrice < cheaperPrice) {
                cheaperHotel = hotels[i];
                cheaperPrice = currentPrice;
            } else if(currentPrice === cheaperPrice && cheaperHotel.rating < hotels[i].rating) {
                cheaperHotel = hotels[i];
                cheaperPrice = currentPrice;
            }
        }
        return cheaperHotel.name;
    }
    
    calculatePrice(hotel, clientType, dates) {
        let priceType = this.getPrice(hotel, clientType);
        return dates
        .map((date) => priceType.priceForDate(date))
        .reduce( (accum, curr) => accum + curr );
    }
    
    getPrice(hotel, clientType) {
        if(clientType == ClientType.REGULAR) {
            return hotel.regularPrice;
        } else if (clientType == ClientType.REWARD) {
            return hotel.rewardPrice;
        }
    }
}

module.exports = BookingCalculator;