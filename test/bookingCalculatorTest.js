const assert = require("assert");
const BookingCalculator = require("../bookingCalculator");
const Errors = require("../errors");
const ClientType = require("../clientType");

describe("BookingCalculator", () => {

  beforeEach(() => {
    this.calculator = new BookingCalculator();
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
