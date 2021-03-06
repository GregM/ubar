(function() {

  var chai = require('chai');
  var moment = require('moment');
  var sinon = require('sinon');
  var should = chai.should();

  var defaultConfig = require('../js/ubar/config');
  var ubarHelpers = require('../js/ubar/helpers');
  var sinonSandbox;

  describe('ubarHelpers ', function () {

    beforeEach(function () {
      sinonSandbox = sinon.sandbox.create();
    });

    afterEach(function () {
      sinonSandbox.restore();
    });

    describe('timing ', function () {

      it('getTimeInMoments should return an Object', function () {
        ubarHelpers.getTimeInMoments("1 minute").should.be.a('Object');
      });

      it('getTimeInMoments should return an Object that is MomentJs', function () {
        var time = ubarHelpers.getTimeInMoments("1 minute");
        time._data.minutes.should.equal(1);
      });

      it('getTimeInSeconds with valid string 1 minute should return 60', function () {
        ubarHelpers.getTimeInSeconds("1 minute").should.equal(60);
      });

      it('getTimeInSeconds with valid string 3 minutes should return 60', function () {
        ubarHelpers.getTimeInSeconds("3 minutes").should.equal(180);
      });

      it('getTimeInSeconds with valid string 2 hours should return 7200', function () {
        ubarHelpers.getTimeInSeconds("2 hours").should.equal(7200);
      });

      it('getTimeInSeconds with bad string should return correct amount', function () {
        ubarHelpers.getTimeInSeconds("2         hours").should.equal(7200);
      });

      it('getTimeInSeconds with bad string should return correct amount', function () {
        ubarHelpers.getTimeInSeconds("    3           hours      ").should.equal(10800);
      });
    });

    describe('underscore helpers ', function () {

      it('isObject should return true if in fact an Object', function () {
        var abc = { ghi : 'def' };
        ubarHelpers.isObject(abc).should.equal(true);
      });

      it('isObject should return false if is not an Object', function () {
        var abc = true;
        ubarHelpers.isObject(abc).should.equal(false);
      });

      it('extend should merge two objects', function () {
        var one = { a: 'b', c: 'd' };
        var two = { e: 'f', g: 'h' };
        var threeFact = { a: 'b', c: 'd', e: 'f', g: 'h' };
        var threeTest = ubarHelpers.extend(one, two);
        threeTest.a.should.equal('b');
        threeTest.c.should.equal('d');
        threeTest.e.should.equal('f');
        threeTest.g.should.equal('h');
      });

      it('extend should merge two objects', function () {
        var one = { a: 'b', c: 'd', e: 'f' };
        var two = { e: 'f', g: 'h', c: 'd' };
        var threeFact = { a: 'b', c: 'd', e: 'f', g: 'h' };
        var threeTest = ubarHelpers.extend(one, two);
        threeTest.a.should.equal('b');
        threeTest.c.should.equal('d');
        threeTest.e.should.equal('f');
        threeTest.g.should.equal('h');
        threeTest.e.length.should.equal(1);
        threeTest.c.length.should.equal(1);
      });
    });
  });

})();
