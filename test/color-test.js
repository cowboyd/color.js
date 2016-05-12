  import Color from '../src/color';
  import { describe, before, beforeEach, it } from 'mocha';
  import { expect } from 'chai';

describe("Color", function() {
  describe("from default rgb values", function() {
    beforeEach(function() {
      this.color = Color.rgb();
    });
    it("is black", function() {
      expect(this.color.r).to.equal(0);
      expect(this.color.g).to.equal(0);
      expect(this.color.b).to.equal(0);
    });

    it("has a hex value of #000000", function() {
      expect(this.color.hexstring).to.equal('#000000');
    });

    it("is its own rgb value", function() {
      expect(this.color.rgb).to.equal(this.color);
    });

    describe("setting the r value", function() {
      beforeEach(function() {
        this.red = this.color.setRGB({r: 255});
      });
      it("returns a new color", function() {
        expect(this.red).to.not.equal(this.color);
      });
      it("sets the r value on the new color, but leaves the other colors alone", function() {
        expect(this.red.r).to.equal(255);
        expect(this.red.g).to.equal(0);
        expect(this.red.b).to.equal(0);
      });
    });


    describe("converted to an hsl value", function() {
      beforeEach(function() {
        this.hsl = this.color.hsl;
      });

      it("is still black", function() {
        expect(this.hsl.h).to.equal(0);
        expect(this.hsl.s).to.equal(0);
        expect(this.hsl.l).to.equal(0);
      });
    });
  });

  describe("a nice sky-blue from HSL Values", function() {
    beforeEach(function() {
      this.hsl = Color.hsl(200, 1, 0.5);
    });
    it("has a hex value of #00AAFF", function() {
      expect(this.hsl.hexstring).to.equal('#00AAFF');
    });
    it("converts to rgb and back", function() {
      let { r, g, b } = this.hsl.rgb;
      expect(r).to.equal(0);
      expect(g).to.equal(170);
      expect(b).to.equal(255);
    });
    describe('setting to red', function() {
      beforeEach(function() {
        this.red = this.hsl.setHSL({h:0});
      });
      it('takes a red hue', function() {
        expect(this.red.h).to.equal(0);
        expect(this.red.s).to.equal(1);
        expect(this.red.l).to.equal(0.5);
      });
    });
    describe('setting rgb to black', function() {
      beforeEach(function() {
        this.black = this.hsl.rgb.setRGB({r:0, g:0, b:0});
      });
      it('it becomes black', function() {
        expect(this.black.r).to.equal(0);
        expect(this.black.g).to.equal(0);
        expect(this.black.b).to.equal(0);
      });
    });
    describe("darkening by ten percent", function() {
      beforeEach(function() {
        this.darkened = this.hsl.darken(0.1);
      })
      it("lower lightness by ratio", function() {
        expect(this.darkened.l).to.equal(0.45);
      })
    })
    describe("darkening rgb value by ten percent", function() {
      beforeEach(function() {
        this.darkened = this.hsl.rgb.darken(0.1);
      })
      it("lower lightness by ratio", function() {
        expect(this.darkened.l).to.equal(0.45);
      })
    })
    describe("lightening by ten percent", function() {
      beforeEach(function() {
        this.lightened = this.hsl.lighten(0.1);
      })
      it("raises lightness by ratio", function() {
        expect(this.lightened.l).to.equal(0.55);
      })
    })
    describe("lightening rgb value by ten percent", function() {
      beforeEach(function() {
        this.lightened = this.hsl.rgb.lighten(0.1);
      })
      it("raises lightness by ratio", function() {
        expect(this.lightened.l).to.equal(0.55);
      })
    })
  });

});
