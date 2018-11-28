const assert = require("assert");
const BookingCalculator = require("../bookingCalculator");
const Errors = require("../errors");
const ClientType = require("../clientType");
const Hotel = require("../hotel");
const ClientTypePrice = require("../clientTypePrice");

class HotelRepositoryMock {
  constructor() {
    this.hotels = []
  }

  fetchHotels() {
      return this.hotels
  }
}

describe("BookingCalculator", () => {

  beforeEach(() => {
    this.repository = new HotelRepositoryMock()
    this.calculator = new BookingCalculator(this.repository);
  })

  describe("#cheaperPrice", () => {
    context("when not pass a client type", () => {
      it("throws an error", () => {
        assert.throws(() => {
          this.calculator.cheaperPrice([Date()]);
        }, Errors.invalidClientType());
      });
    });
    context("when client type is invalid", () => {
      it("throws an error", () => {
        assert.throws(() => {
          this.calculator.cheaperPrice("invalid", [Date()]);
        }, Errors.invalidClientType());
      });
    });
    context("when not pass a dates", () => {
      it("throws an error", () => {
        assert.throws(() => {
          this.calculator.cheaperPrice("reward");
        }, Errors.invalidDates());
      });
    });
    context("when client type is regular", () => {
      context("and date is on weekend", () => {
        it("returns the cheaper hotel", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 120)),
            new Hotel("B", 5, new ClientTypePrice(80, 120), new ClientTypePrice(80, 120)),
            new Hotel("C", 8, new ClientTypePrice(80, 120), new ClientTypePrice(80, 120))
          ]
          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [new Date(2018,11,25)])
          assert.equal(result, "B")
        });
      });
      context("and date is on weekday", () => {
        it("returns the cheaper hotel", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 120)),
            new Hotel("B", 5, new ClientTypePrice(60, 60), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(80, 120), new ClientTypePrice(80, 120))
          ]
          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [new Date(2018,11,28)])
          assert.equal(result, "B")
        });
      });
      context("and date is weekend and weekday", () => {
        it("returns the cheaper hotel", () => {
  
        });
      });
    });
    context("when client type is reward", () => {
      context("and date is on weekend", () => {
        it("returns the cheaper hotel", () => {
  
        });
      });
      context("and date is on weekday", () => {
        it("returns the cheaper hotel", () => {
  
        });
      });
      context("and date is weekend and weekday", () => {
        it("returns the cheaper hotel", () => {
  
        });
      });
    });
  });
});
