import Color from '../src/color';
import { describe, before, beforeEach, it } from 'mocha';
import { expect } from 'chai';

describe('HSB Color', function() {
  describe('from default', function() {
    beforeEach(function() {
      this.hsb = Color.hsb();
    });
    it('is black', function() {
      expect(this.hsb.h).to.equal(0);
      expect(this.hsb.s).to.equal(0);
      expect(this.hsb.b).to.equal(0);
    });
    it('is its own HSB Value', function() {
      expect(this.hsb.hsb).to.equal(this.hsb);
    });
    it('is black in RGB color space', function() {
      expect(this.hsb.rgb.r).to.equal(0);
      expect(this.hsb.rgb.g).to.equal(0);
      expect(this.hsb.rgb.b).to.equal(0);
    });
    it('is black in HSL color space', function() {
      expect(this.hsb.hsl.h).to.equal(0);
      expect(this.hsb.hsl.s).to.equal(0);
      expect(this.hsb.hsl.l).to.equal(0);
    });
  });
  describe('sky blue', function() {
    beforeEach(function() {
      this.skyBlue = Color.hsb(200, 1, 1);
    })
    it('corresponds to sky blue in RGB', function() {
      let {r, g, b} = this.skyBlue.rgb;
      expect(r).to.equal(0);
      expect(g).to.equal(170);
      expect(b).to.equal(255);
    });
    it('corresponds to sky blue in HSL', function() {
      let {h, s, l} = this.skyBlue.hsl;
      expect(h).to.equal(200);
      expect(s).to.equal(1);
      expect(l).to.equal(0.5);
    });
    it('can be converted to HSL and back', function() {
      let {h, s, b} = this.skyBlue.hsl.hsb;
      expect(h).to.equal(200);
      expect(s).to.equal(1);
      expect(b).to.equal(1);
    });
    describe('when changed to red', function() {
      beforeEach(function() {
          this.red = this.skyBlue.setHSB({h:0});
      });
      it('takes on red hue', function() {
        expect(this.red.h).to.equal(0);
      });
      it('leaves saturation and brightness alone', function() {
        expect(this.red.s).to.equal(1);
        expect(this.red.b).to.equal(1);
      });
    });
    describe('when changed to red via RGB', function() {
      beforeEach(function() {
        this.red = this.skyBlue.rgb.setHSB({h:0});
      });
      it('takes on red hue', function() {
        expect(this.red.h).to.equal(0);
      });
    })
  });
});
