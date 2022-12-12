/* eslint-disable no-undef */
// import {somthing} from '../../js/testfileforunittest.js'
// import {somthing} from '../../js/app.js'

describe('app', function () {
  //   beforeEach(function() {
  // app = new app();
  //   });

  it('app test', function () {
    // var dummyElement = document.createElement();
    // document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    // console.log("jasmine")
    // console.log(somthing())
    // console.log(temp.something())
    // console.log(testapp.tostring())
    // console.log(testapp)
    // console.log("smt  " + typeof testapp)
    // console.log("smt  somthing  " + typeof testapp.something)
    expect(true).toEqual(true)
  })

  //   describe('when song has been paused', function() {
  //     beforeEach(function() {
  //       player.play(song);
  //       player.pause();
  //     });

  //     it('should indicate that the song is currently paused', function() {
  //       expect(player.isPlaying).toBeFalsy();

  //       // demonstrates use of 'not' with a custom matcher
  //       expect(player).not.toBePlaying(song);
  //     });

  //     it('should be possible to resume', function() {
  //       player.resume();
  //       expect(player.isPlaying).toBeTruthy();
  //       expect(player.currentlyPlayingSong).toEqual(song);
  //     });
  //   });

  //   // demonstrates use of spies to intercept and test method calls
  //   it('tells the current song if the user has made it a favorite', function() {
  //     spyOn(song, 'persistFavoriteStatus');

  //     player.play(song);
  //     player.makeFavorite();

  //     expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  //   });

  //   //demonstrates use of expected exceptions
  //   describe('#resume', function() {
  //     it('should throw an exception if song is already playing', function() {
  //       player.play(song);

//       expect(function() {
//         player.resume();
//       }).toThrowError('song is already playing');
//     });
//   });
})
