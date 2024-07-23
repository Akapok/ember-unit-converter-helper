# ember-unit-converter-helper

This helper allow you to convert a number from a unit to another.
Like meters in decimeters, litres to millilitres, seconds to hours...

## Table of Contents

- [Compatibility](#compatibility)
- [Installation](#installation)
  - [Via Ember-CLI](#via-ember-cli)
  - [Via NPM](#via-npm)
- [Usage](#usage)
  - [Arguments](#arguments)
  - [Basic Use](#basic-use)
  - [Without the unit abbrevation](#without-the-unit-abbrevation)
  - [With a limited amount of digits](#with-a-limited-amount-of-digits)
- [Supported units](#supported-units)
  - [Distance](#distance)
  - [Weight](#weight)
  - [Volume](#volume)
  - [Time](#time)
- [Contributing](#contributing)
- [License](#license)

## Compatibility

- Ember.js v4.4 or above
- Ember CLI v4.4 or above
- Node.js v16 or above

## Installation

#### Via NPM

```bash
npm install @akapok/ember-unit-converter-helper
```

#### Via Ember-CLI

```bash
ember install @akapok/ember-unit-converter-helper
```

## Usage

### Arguments

This addon provides a single helper called `convert`. It accepts 5 arguments
| Arguments | Type | Description | Mandatory ? | Default |
| :--- | :----: | :----: | :--- | :--- |
| value | Number | The value you want to convert | Yes | N/A |
| from | String | The abbrevation of the unit you convert from | Yes | N/A |
| to | String | The abbrevation of the unit you convert to | Yes | N/A |
| withUnit | Boolean | Do you want the result to be displayed with the unit abbrevation ? | No | Yes |
| digit | Number | The amount of digit you want to keep | No | No limit set |

### Basic Use

In your code:

```hbs
<!-- We want to convert 1 meters into millimeters-->
{{convert value=1 from="m" to="mm" withUnit=false}}
```

The result:

```text
1000mm
```

### Without the unit abbrevation

In your code:

```hbs
{{convert value=1 from="m" to="mm" withUnit=false}}
```

The result:

```text
1000
```

### With a limited amount of digits

In your code:

```hbs
{{convert value=134.678 from="m" to="km" digits=2}}
```

The result:

```
0.13km (instead of 0.134678km)
```

> :warning: **Warning:** The `digit` option also round your result. For example 0.146 with 2 digits returns 0.15

## Supported units

### Distance

| Name          | Abbrevation |
| :------------ | ----------: |
| Femtometer    |          fm |
| Picometer     |          pm |
| Nanometer     |          nm |
| Micrometer    |          μm |
| Millimeter    |          mm |
| Centimeter    |          cm |
| Decimeter     |          dm |
| Meter         |           m |
| Decameter     |         dam |
| Hectometer    |          hm |
| Kilometer     |          km |
| Inch          |          in |
| Foot          |          ft |
| Yard          |          yd |
| Mile          |          mi |
| Nautical Mile |         nmi |

### Weight

| Name      | Abbrevation |
| :-------- | ----------: |
| Femtogram |          fg |
| Picogram  |          pg |
| Nanogram  |          ng |
| Microgram |          μg |
| Milligram |          mg |
| Centigram |          cg |
| Decigram  |          dg |
| Gram      |           g |
| Decagram  |         dag |
| Hectogram |          hg |
| Kilogram  |          kg |
| Pound     |          lb |
| Ounce     |          oz |

### Volume

| Name             | Abbrevation |
| :--------------- | ----------: |
| Femtolitre       |          fl |
| Picolitre        |          pl |
| Nanolitre        |          nl |
| Microlitre       |          μl |
| Millilitre       |          ml |
| Centilitre       |          cl |
| Decilitre        |          dl |
| Litre            |           l |
| Decalitre        |         dal |
| Hectolitre       |          hl |
| Kilolitre        |          kl |
| Gallon (UK)      |      UK gal |
| Gallon (US)      |      US gal |
| Fluid ounce (UK) |    UK fl oz |
| Fluid ounce (US) |    US fl oz |

### Time

| Name   | Abbrevation |
| :----- | ----------: |
| Second |           s |
| Minute |         min |
| Hour   |           h |
| Day    |           d |
| Week   |           w |
| Year   |           y |

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
