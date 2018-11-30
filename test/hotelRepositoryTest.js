const assert = require("assert");
const HotelRepository = require("../hotelRepository");

describe("HotelRepository", () => {

  describe("#fetchHotels", () => {
      context("when an invalid json is provided", () => {
        it("returns an empty array", () => {
            const repository = new HotelRepository('test/resources/invalidHotels.json');
            assert.equal(repository.fetchHotels().length, 0)
        })
      });
      context("when a valid json is provided", () => {
        it("returns hotels", () => {
            const repository = new HotelRepository('test/resources/validHotels.json');
            
            const hotels = repository.fetchHotels();
            
            const lakewood = hotels[0];
            const bridgewood = hotels[1];
            const ridgewood = hotels[2];
            assert.equal(lakewood.name, "LakewoodTest")
            assert.equal(lakewood.rating, 3)
            assert.equal(lakewood.regular.weekday, 110)
            assert.equal(lakewood.regular.weekend, 90)
            assert.equal(lakewood.reward.weekday, 80)
            assert.equal(lakewood.reward.weekend, 80)

            assert.equal(bridgewood.name, "BridgewoodTest")
            assert.equal(bridgewood.rating, 4)
            assert.equal(bridgewood.regular.weekday, 160)
            assert.equal(bridgewood.regular.weekend, 60)
            assert.equal(bridgewood.reward.weekday, 110)
            assert.equal(bridgewood.reward.weekend, 50)

            assert.equal(ridgewood.name, "RidgewoodTest")
            assert.equal(ridgewood.rating, 5)
            assert.equal(ridgewood.regular.weekday, 220)
            assert.equal(ridgewood.regular.weekend, 150)
            assert.equal(ridgewood.reward.weekday, 100)
            assert.equal(ridgewood.reward.weekend, 40)

            assert.equal(repository.fetchHotels().length, 3)
        })
      })
    });
  });