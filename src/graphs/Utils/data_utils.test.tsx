import {
  capitalizeName,
  toCurrency,
  formatData,
  getDataInfo,
  getRegionInfo,
  processData,
  getLocationsInData
} from './data_utils';

/**
 * data_utils tests
 *
 * Tests the capitalizeName, toCurrency, formatData, getDataInfo, getRegionInfo
 * from the data_utils file
 */

describe('test suite', () => {
  it('should return a capitalized name', () => {
    const expectedValue = 'Mohamed Aichouri';

    expect(capitalizeName('mohamed aichouri', ' ')).toEqual(expectedValue);
  });

  it('shoudl return formated number with $ symbol', () => {
    const expectedValue = '$1,000.00';

    expect(toCurrency(1000, '$_award_value')).toEqual(expectedValue);
  });

  it('should format our data', () => {
    const expectedValue = [
      {
        id: 1,
        category: 'San Luis Obispo',
        name: 'Amazon',
        value: 90000
      },
      {
        id: 2,
        category: 'San Luis Obispo',
        name: 'MindBody',
        value: 80000
      }
    ];
    const Input = [
      {
        salary: 90000,
        name: 'Amazon',
        city: 'San Luis Obispo'
      },
      {
        salary: 80000,
        name: 'MindBody',
        city: 'San Luis Obispo'
      }
    ];
    expect(formatData(Input, 'name', 'salary', 'city')).toEqual(expectedValue);
  });

  it('should get data info', () => {
    const InputHeader = {
      City: 'San Luis Obispo',
      Company: 'amazon',
      Salary: 100000,
      Year: '2020'
    };
    const expected = {
      regionLevel: '3',
      locationColumn: 'City',
      xColumns: ['City', 'Company'],
      yColumns: ['Salary', 'Year']
    };
    expect(getDataInfo(InputHeader)).toEqual(expected);
  });

  it('should return region Info', () => {
    const expectedValue = { columnContainsLocation: true, regionLevel: '3' };

    expect(getRegionInfo('San Luis Obispo')).toEqual(expectedValue);
  });

  it('should return region Info', () => {
    const expectedValue = { columnContainsLocation: false, regionLevel: null };

    expect(getRegionInfo('Casablanca')).toEqual(expectedValue);
  });

  it('should return region Info', () => {
    const expectedValue = { columnContainsLocation: false, regionLevel: null };

    expect(getRegionInfo('Santa Barbara')).toEqual(expectedValue);
  });

  it('should get location in processed data', () => {
    const expectedValue = {
      1: ['full_region'],
      2: ['san_luis_obispo_county', 'north_santa_barbara_county'],
      3: [
        'lompoc',
        'paso_robles',
        'san_luis_obispo',
        'morro_bay',
        'santa_maria',
        'san_miguel',
        'grover_beach',
        'pismo_beach',
        'los_osos',
        'atascadero',
        'nipomo'
      ]
    };

    const dataset = 'dod_contracts';
    const dat: any = {
      dod_contracts: require('../../common/assets/Local Data/dod_contracts_2018.json')
    };
    const dataInfo = getDataInfo(dat[dataset][0]);
    const processedData = processData(
      dat[dataset],
      dataInfo.locationColumn,
      dataInfo.regionLevel,
      dataInfo.yColumns
    );

    expect(getLocationsInData(processedData)).toEqual(expectedValue);
  });
});
