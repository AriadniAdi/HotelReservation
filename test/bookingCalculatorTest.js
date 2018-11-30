const assert = require("assert");
const BookingCalculator = require("../src/bookingCalculator");
const Errors = require("../src/errors");
const ClientType = require("../src/clientType");
const Hotel = require("../src/hotel");
const ClientTypePrice = require("../src/clientTypePrice");

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

    context("when hotel is invalid", () => {
      it("throws an error", () => {
        this.repository.hotels = []
        assert.throws(() => {
          this.cheaperPrice()
        }), Errors.invalidHotel();
      });
    });
    context("when not pass a dates", () => {
      it("throws an error", () => {
        assert.throws(() => {
          this.calculator.cheaperPrice("rewards");
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

          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [weekend()])

          assert.equal(result, "C")
        });
      });
      context("and date is on weekday", () => {
        it("returns the cheaper hotel", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 120)),
            new Hotel("B", 5, new ClientTypePrice(50, 60), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(80, 120), new ClientTypePrice(80, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [weekday()])

          assert.equal(result, "B")
        });
      });
      context("and date is weekend and weekday", () => {
        it("returns the cheaper hotel", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(60, 80), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(80, 90), new ClientTypePrice(80, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [weekend(),weekday()])

          assert.equal(result,"B")
        });
      });
      context("and tie of lower hotels values when weekday and weekend", () => {
        it("return the cheaper and with higher rancking", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(60, 80), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(60, 80), new ClientTypePrice(80, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [weekend(),weekday()])

          assert.equal(result,"C")
        })
      })
      context("and tie of lower hotels values weekday", () => {
        it("return the cheaper and with higher rancking", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(60, 210), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(60, 80), new ClientTypePrice(80, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [weekday()])

          assert.equal(result,"C")
        })
      })
      context("and tie of lower hotels values weekend", () => {
        it("return the cheaper and with higher rancking", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(120, 80), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(60, 80), new ClientTypePrice(80, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REGULAR, [weekend()])

          assert.equal(result,"C")
        })
      })
    });
    context("when client type is rewards", () => {
      context("and date is on weekend", () => {
        it("returns the cheaper hotel", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(70, 100), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(60, 80), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(80, 90), new ClientTypePrice(80, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REWARDS, [weekend()])

          assert.equal(result,"B")
        });
      });
      context("and date is on weekday", () => {
        it("returns the cheaper hotel", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(70, 100), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(60, 80), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(80, 90), new ClientTypePrice(10, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REWARDS, [weekday()])

          assert.equal(result,"C")
  
        });
      });
      context("and date is weekend and weekday", () => {
        it("returns the cheaper hotel", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(70, 100), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(60, 80), new ClientTypePrice(50, 40)),
            new Hotel("C", 8, new ClientTypePrice(80, 90), new ClientTypePrice(10, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REWARDS, [weekday(),weekend()])

          assert.equal(result,"C")
        });
      });
      context("and tie of lower hotels values when weekend and weekday", () => {
        it("return the cheaper and with higher rancking", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(80, 100), new ClientTypePrice(60, 120)),
            new Hotel("C", 8, new ClientTypePrice(200, 180), new ClientTypePrice(60, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REWARDS, [weekend(),weekday()])

          assert.equal(result,"C")
        })
      })
      context("and tie of lower hotels values weekday", () => {
        it("return the cheaper and with higher rancking", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 20)),
            new Hotel("B", 5, new ClientTypePrice(160, 210), new ClientTypePrice(80, 40)),
            new Hotel("C", 8, new ClientTypePrice(60, 80), new ClientTypePrice(80, 120))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REWARDS, [weekday()])

          assert.equal(result,"C")
        })
      })
      context("and tie of lower hotels values weekend", () => {
        it("return the cheaper and with higher rancking", () => {
          this.repository.hotels = [
            new Hotel("A", 3, new ClientTypePrice(80, 120), new ClientTypePrice(80, 80)),
            new Hotel("B", 5, new ClientTypePrice(120, 100), new ClientTypePrice(50, 80)),
            new Hotel("C", 8, new ClientTypePrice(60, 80), new ClientTypePrice(80, 100))
          ]

          var result = this.calculator.cheaperPrice(ClientType.REWARDS, [weekend()])

          assert.equal(result,"B")
        })
      })
    });
  });
  function weekday() {
    return new Date(2018,11,28)
  }
  function weekend() {
    return new Date(2018,11,25)
  }
});