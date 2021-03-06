import { rgbToHsl, hslToRgb, hsvToRgb, rgbToHsv } from './conversions';

export default class Color {
  static rgb(r, g, b) {
    return new RGBColor(r, g, b);
  }

  static hsl(h, s, l) {
    return new HSLColor(h, s, l);
  }

  static hsb(h, s, b) {
    return new HSBColor(h, s, b);
  }

  get hexstring() {
    return this.rgb.hexstring;
  }

  setRGB(rgb = {}) {
    return this.rgb.setRGB(rgb);
  }

  setHSL(hsl = {}) {
    return this.hsl.setHSL(hsl);
  }

  setHSB(hsb = {}) {
    return this.hsb.setHSB(hsb);
  }

  darken(ratio) {
    return this.hsl.darken(ratio);
  }

  lighten(ratio) {
    return this.hsl.darken(-ratio);
  }
}

class RGBColor extends Color {
  constructor(r = 0, g = 0, b = 0) {
    super();
    this.r = r;
    this.g = g;
    this.b = b;
  }

  get rgb() {
    return this;
  }

  get hsl() {
    let [h, s, l] = rgbToHsl(this.r, this.g, this.b);
    return Color.hsl(h* 360, s, l);
  }

  get hsb() {
    let [h, s, b] = rgbToHsv(this.r, this.g, this.b);
    return Color.hsb(h * 360, s, b);
  }

  get hexstring() {
    return "#" + [this.r,this.g,this.b].map(v => v.toString(16).toUpperCase()).map(s=> {
      return s.length < 2 ? `0${s}` : s;
    }).join('');
  }

  setRGB(rgb = {}) {
    rgb = Object.assign({
      r: this.r,
      g: this.g,
      b: this.b
    }, rgb);
    return Color.rgb(rgb.r, rgb.g, rgb.b);
  }

}

class HSLColor extends Color {
  constructor(h = 0, s = 0, l = 0) {
    super();
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

  get hsb() {
    return this.rgb.hsb;
  }

  setHSL(hsl = {}) {
    hsl = Object.assign({
      h: this.h,
      s: this.s,
      l: this.l
    }, hsl);
    return Color.hsl(hsl.h, hsl.s, hsl.l);
  }

  darken(ratio) {
    return this.setHSL({l: this.l - this.l * ratio});
  }

}

class HSBColor extends Color {
  constructor(h = 0, s = 0, b = 0) {
    super();
    this.h = h;
    this.s = s;
    this.b = b;
  }

  get hsb() {
    return this;
  }

  get hsl() {
    return this.rgb.hsl;
  }

  get rgb() {
    let rgb = hsvToRgb(this.h / 360, this.s, this.b).map(i => Math.round(i));
    return Color.rgb(...rgb);
  }

  setHSB(hsb = {}) {
    hsb = Object.assign({
      h: this.h,
      s: this.s,
      b: this.b
    }, hsb);
    return Color.hsb(hsb.h, hsb.s, hsb.b);
  }

}
