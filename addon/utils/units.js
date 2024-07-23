class Unit {
  constructor(scale = 1, parent = null) {
    this.scale = scale;
    this.parent = parent; // parent must by a Unit object
  }

  toParent(value) {
    return value * this.scale;
  }
}

// All parent units. Each unit has a parent from this list:
const l = new Unit(); // Litre
const m = new Unit(); // Metre
const g = new Unit(); // Gram
const s = new Unit(); // Second
const k = new Unit(); // Kelvin

const units = {
  // Volume
  kl: new Unit(1000, l),
  hl: new Unit(100, l),
  dal: new Unit(10, l),
  l: new Unit(1, l),
  dl: new Unit(0.1, l),
  cl: new Unit(0.01, l),
  ml: new Unit(0.001, l),
  μl: new Unit(0.000001, l),
  nl: new Unit(0.000000001, l),
  pl: new Unit(0.000000000001, l),
  fl: new Unit(0.000000000000001, l),
  'uk gal': new Unit(4.54609, l),
  'uk fl oz': new Unit(0.0284131, l),
  'us gal': new Unit(3.78541, l),
  'us fl oz': new Unit(0.0295735, l),

  // Distance
  km: new Unit(1000, m),
  hm: new Unit(100, m),
  dam: new Unit(10, m),
  m: new Unit(1, m),
  dm: new Unit(0.1, m),
  cm: new Unit(0.01, m),
  mm: new Unit(0.001, m),
  μm: new Unit(0.000001, m),
  nm: new Unit(0.000000001, m),
  pm: new Unit(0.000000000001, m),
  fm: new Unit(0.000000000000001, m),
  // Imperial units
  in: new Unit(0.0254, m),
  ft: new Unit(0.3048, m),
  yd: new Unit(0.9144, m),
  mi: new Unit(1609.344, m),

  // Weight
  kg: new Unit(1000, g),
  hg: new Unit(100, g),
  dag: new Unit(10, g),
  g: new Unit(1, g),
  dg: new Unit(0.1, g),
  cg: new Unit(0.01, g),
  mg: new Unit(0.001, g),
  μg: new Unit(0.000001, g),
  ng: new Unit(0.000000001, g),
  pg: new Unit(0.000000000001, g),
  fg: new Unit(0.000000000000001, g),

  // Time
  s: new Unit(1, s),
  min: new Unit(60, s),
  h: new Unit(3600, s),
  d: new Unit(86400, s),
  w: new Unit(604800, s),
  y: new Unit(31536000, s),

  // Temperature
  // These values are not useful (yet) as we use a different function to convert them
  c: new Unit(1, k),
  f: new Unit(9 / 5, k),
  k: new Unit(1, k),
};

export { units, k };
