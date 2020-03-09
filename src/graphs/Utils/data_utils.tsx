const groupArray = require('group-array');

/**
 * Capitalize Name
 *
 * Capitalizes the first character of every word
 * separated by a given delimiter.
 * @param name
 * @param delimiter
 * @returns {string}
 */
export function capitalizeName(name: string, delimiter: string) {
  return name
    .split(delimiter)
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}

/**
 * To Currency
 *
 * Applies the currency format to a number if the given
 * column holds currency values.
 * @param number
 * @param column
 * @returns {string}
 */
export function toCurrency(number: number, column: string) {
  if (column.split('_')[0] === '$') {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  // not a currency
  return number.toLocaleString();
}

/**
 * unGroupBy
 *
 * Undoes the groupby function by concatenating all lists
 * @param data
 * @returns {[]}
 */
export function unGroupArray(data: any) {
  const newArray: any = [];
  Object.keys(data).map(row => newArray.push(...data[row]));
  return newArray;
}

/**
 * Format Data
 *
 * Filters the data by the selected columns that need to be displayed on the graph
 * @param data
 * @param xColumn
 * @param yColumn
 * @param locationColumn
 * @returns {*}
 */
export function formatData(
  data: any,
  xColumn: any,
  yColumn: any,
  locationColumn: any
) {
  return data.map((row: any, index: any) => ({
    id: index + 1,
    category: row[locationColumn],
    name: row[xColumn],
    value: row[yColumn]
  }));
}

/**
 * Get Data Information
 *
 * Gets the region level of the data, the name of the column
 * that represents the location, and the column names for
 * the y and x axis, depending on their type
 * @param row
 * @returns {{locationColumn: string, xColumns: [], yColumns: [], regionLevel: null}}
 */
export function getDataInfo(row: any) {
  const xColumns = [];
  const yColumns = [];
  let regionLevel = null;
  let locationColumn = '';
  for (const column of Object.keys(row)) {
    if (isNaN(row[column])) {
      const regionInfo = getRegionInfo(row[column]);
      regionLevel =
        regionInfo.regionLevel !== null ? regionInfo.regionLevel : regionLevel;
      locationColumn = regionInfo.columnContainsLocation
        ? column
        : locationColumn;
      xColumns.push(column);
    } else {
      yColumns.push(column);
    }
  }
  return {
    regionLevel: regionLevel,
    locationColumn: locationColumn,
    xColumns: xColumns,
    yColumns: yColumns
  };
  // TODO: raise error if regionLevel or locationColumn are null
}
/**
 * Get Region Information
 *
 * Computes whether the given value is a location and if so, returns
 * the corresponding region level
 * @param columnValue
 * @returns {{columnContainsLocation: boolean, regionLevel: string}|
 *          {columnContainsLocation: boolean, regionLevel: null}}
 */
export function getRegionInfo(columnValue: any) {
  const locations = require('../../common/assets/Local Data/Location.json');
  for (const regionLevel of Object.keys(locations)) {
    const subLocations = Object.keys(locations[regionLevel]).map(name =>
      capitalizeName(name, '_')
    );
    if (subLocations.includes(capitalizeName(columnValue, '_'))) {
      return { columnContainsLocation: true, regionLevel: regionLevel };
    }
  }
  return { columnContainsLocation: false, regionLevel: null };
}

/**
 * Process Data
 *
 * Processes the dataset by aggregated and grouping the values
 * by the appropriate region levels.
 * @param data
 * @param locationColumn
 * @param regionLevel
 * @param yColumns
 * @returns {{}}
 */
export function processData(
  data: any,
  locationColumn: any,
  regionLevel: any,
  yColumns: any
) {
  // the keys are the region levels
  const regionLevels: any = Object.keys(
    require('../../common/assets/Local Data/Location.json')
  )
    .sort()
    .reverse();
  const processedData: any = {};
  regionLevels.forEach((level: any, index: any) => {
    if (level === regionLevel) {
      processedData[regionLevel] = groupArray(data, locationColumn);
    } else if (level < regionLevel) {
      const lowerRegionLevel = regionLevels[index - 1]; // need to test this
      processedData[level] = aggregateRegion(
        processedData[lowerRegionLevel],
        locationColumn,
        level,
        lowerRegionLevel,
        yColumns
      );
    }
  });
  return processedData;
}

/**
 * Aggregate Region
 *
 * Aggregates the data by the appropriate region levels.
 * @param dataByLocation
 * @param locationColumn
 * @param currentRegionLevel
 * @param lowerRegionLevel
 * @param yColumns
 * @returns {{}}
 */
export function aggregateRegion(
  dataByLocation: any,
  locationColumn: any,
  currentRegionLevel: any,
  lowerRegionLevel: any,
  yColumns: any
) {
  const locations: any = require('../../common/assets/Local Data/Location.json');
  const regionData: any = {};
  Object.keys(locations[currentRegionLevel]).map(
    regionName => (regionData[regionName] = [])
  );
  for (const location of Object.keys(dataByLocation)) {
    const regionName = locations[lowerRegionLevel][location]['upperLevel'];
    const length = regionData[regionName].length;
    regionData[regionName].push({
      name: location,
      [locationColumn]: regionName
    });
    for (const column of Object.keys(yColumns)) {
      const dataColumn = yColumns[column];
      regionData[regionName][length][dataColumn] = 0;
      for (const row of Object.keys(dataByLocation[location])) {
        regionData[regionName][length][dataColumn] +=
          dataByLocation[location][row][dataColumn];
      }
    }
  }
  return regionData;
}

/**
 * Get Locations in Data
 *
 * Extracts all the locations in the dataset, where the
 * key is the region level.
 * @param processedData
 * @returns {{}}
 */
export function getLocationsInData(processedData: any) {
  const locationsInData: any = {};
  Object.keys(processedData).map(
    level => (locationsInData[level] = Object.keys(processedData[level]))
  );
  return locationsInData;
}
