import { rgbToHsl, hslToRgb } from './conversions';

export default class Color {
  static rgb(r, g, b) {
    return new RGBColor(r, g, b);
  }

  static hsl(h, s, l) {
    return new HSLColor(h, s, l);
  }
}

class RGBColor {
  constructor(r = 0, g = 0, b = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  get rgb() {
    return this;
  }

  get hsl() {
    return Color.hsl(...rgbToHsl(this.r, this.g, this.b));
  }

  setRGB(rgb = {}) {
    return Color.rgb(rgb.r || this.r, rgb.g || this.g, rgb.b || this.b);
  }

  setHSL(hsl = {}) {
    return this.hsl.setHSL(hsl);
  }

  darken(ratio) {
    let hsl = this.hsl;
    return this.setHSL({l: this.hsl.l - this.hsl.l * ratio});
  }
}

class HSLColor {
  constructor(h = 0, s = 0, l = 0) {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  get hsl() {
    return this;
  }

  get rgb() {
    let rgb = hslToRgb(this.h / 360, this.s, this.l).map(i => Math.round(i));
    return Color.rgb(...rgb);
  }

  setRGB(rgb = {}) {
    return this.rgb.setRGB(rgb);
  }

  setHSL(hsl = {}) {
    return Color.hsl(hsl.h || this.h, hsl.s || this.s, hsl.l || this.l);
  }

  darken(ratio) {
    return this.setHSL({l: this.l - this.l * ratio});
  }
}
