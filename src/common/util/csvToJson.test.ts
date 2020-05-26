import { convertCsvToJson } from './csvToJson';

describe('validateInputEmail', () => {
  const covidDataArray = [
    ['covidUnemployment', 'weekEnd', 'unemploymentClaims'],
    ['', 'date (YYYY-MM-DD)', 'integer'],
    ['', 'ex: 2020-05-15', 'ex: 150'],
    ['', '2020-05-16', '6'],
    ['', '2020-05-17', '7'],
    ['', '2020-05-18', '8']
  ];

  const covidDataJson = {
    covidUnemployment: [
      { weekEnd: '2020-05-16', unemploymentClaims: 6 },
      { weekEnd: '2020-05-17', unemploymentClaims: 7 },
      { weekEnd: '2020-05-18', unemploymentClaims: 8 }
    ]
  };

  const airportDataArray = [
    ['airports', 'code', 'latitude', 'longitude', 'name'],
    ['', 'text', 'decimal', 'decimal', 'text'],
    [
      '',
      'ex: SBA',
      'ex: 34.463319',
      'ex: 119.8435899',
      'ex: Santa Barbara Airport'
    ],
    [
      '',
      'SBP',
      '35.2375',
      '120.6409',
      'San Luis Obispo County Regional Airport'
    ],
    ['', 'SMX', '34.9008', '120.4567', 'Santa Maria Airport']
  ];

  const airportDataJson = {
    airports: [
      {
        code: 'SBP',
        latitude: 35.2375,
        longitude: 120.6409,
        name: 'San Luis Obispo County Regional Airport'
      },
      {
        code: 'SMX',
        latitude: 34.9008,
        longitude: 120.4567,
        name: 'Santa Maria Airport'
      }
    ]
  };

  const covidEmptyArray = [
    ['covidUnemployment', 'weekEnd', 'unemploymentClaims'],
    ['', 'date (YYYY-MM-DD)', 'integer'],
    ['', 'ex: 2020-05-15', 'ex: 150']
  ];

  const covidEmptyJson = { covidUnemployment: [] };

  const emptyArray: Array<any> = [];
  const emptyJson = {};

  it('convert airport data', () => {
    expect(convertCsvToJson(airportDataArray)).toEqual(airportDataJson);
  });

  it('convert covid data', () => {
    expect(convertCsvToJson(covidDataArray)).toEqual(covidDataJson);
  });

  it('convert covid empty template', () => {
    expect(convertCsvToJson(covidEmptyArray)).toEqual(covidEmptyJson);
  });

  it('convert empty array', () => {
    expect(convertCsvToJson(emptyArray)).toEqual(emptyJson);
  });
});
