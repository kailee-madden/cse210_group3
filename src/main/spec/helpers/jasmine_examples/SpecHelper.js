/* eslint-disable no-var */
/* eslint-disable no-undef */
beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          const player = actual

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          }
        }
      }
    },
    toMatchTripDetails: function () {
      return {
        compare: function (actual, expected) {
          let flag = true
          var keys = Object.keys(actual)
          for (var i = 0; i < keys.length; i++) {
            flag &= actual[keys[i]] === expected[keys[i]]
          }
          return {
            pass: flag
          }
        }
      }
    }
  })
})
