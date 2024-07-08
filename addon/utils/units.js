const volumeUnits = {
  name: 'volume',
  units: {
    kl: 1000,
    hl: 100,
    dal: 10,
    l: 1,
    dl: 0.1,
    cl: 0.01,
    ml: 0.001,
    μl: 0.000001,
    nl: 0.000000001,
    pl: 0.000000000001,
    fl: 0.000000000000001,
  },
};

const distanceUnits = {
  name: 'distance',
  units: {
    km: 1000,
    hm: 100,
    dam: 10,
    m: 1,
    dm: 0.1,
    cm: 0.01,
    mm: 0.001,
    μm: 0.000001,
    nm: 0.000000001,
    pm: 0.000000000001,
    fm: 0.000000000000001,
  },
};

const weightUnits = {
  name: 'weight',
  units: {
    kg: 1000,
    hg: 100,
    dag: 10,
    g: 1,
    dg: 0.1,
    cg: 0.01,
    mg: 0.001,
    μg: 0.000001,
    ng: 0.000000001,
    pg: 0.000000000001,
    fg: 0.000000000000001,
  },
};

const timeUnits = {
  name: 'time',
  units: {
    s: 1,
    min: 60,
    h: 3600,
    d: 86400,
    w: 604800,
    y: 31536000,
  },
};

// For temperature, the values are not useful. We just need the name
const temperatureUnits = {
  name: 'temperature',
  units: {
    c: 1,
    f: 1.8,
    k: 274.15,
  },
};

const unitsTypes = [
  volumeUnits,
  distanceUnits,
  weightUnits,
  timeUnits,
  temperatureUnits,
];

/**
 * Get the unit type of a unit.
 * @param {string} unit - The unit to get the type from
 * @returns {Object} The unit type within this list: volumeUnits, distanceUnits, weightUnits, timeUnits, temperatureUnits
 */
function getUnitType(unit) {
  let selectedUnitType = null;
  unitsTypes.forEach((unitType) => {
    if (Object.hasOwn(unitType.units, unit)) {
      selectedUnitType = unitType;
    }
  });

  return selectedUnitType;
}

export { volumeUnits, distanceUnits, weightUnits, timeUnits, getUnitType };
