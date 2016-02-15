import Color from '../src/color';
import { describe, before, beforeEach, it } from 'mocha';
import { expect } from 'chai';

describe('HSB Color', function() {
  describe('from default', function() {
    it('is black');
    it('is its own HSB Value');
    it('is black in RGB color space');
    it('is black in HSL color space');
  });
  describe('sky blue', function() {
    it('corresponds to sky blue in RGB');
    it('corresponds to sky blue in HSL');
    describe('when changed to red', function() {
      it('takes on red hue');
      it('leaves saturation and brightness alone');
    });
  });
});
