interface JSONVal {
  [key: string]: any;
}

export function convertCsvToJson(data: Array<any>) {
  const firstRowOfData = 3;
  const firstCol = 1;
  const typeRow = 1;
  if (data.length < 3) {
    return {};
  }
  let jsonStr = '{"' + data[0][0] + '":[]}';
  const obj = JSON.parse(jsonStr);
  for (let i = firstRowOfData, numRows = data.length; i < numRows; i++) {
    const jsonObj: JSONVal = {};
    for (let j = firstCol, numCols = data[1].length; j < numCols; j++) {
      let insertedVal = data[i][j];
      if (data[typeRow][j] === 'integer') {
        insertedVal = parseInt(insertedVal, 10);
      } else if (data[typeRow][j] === 'decimal') {
        insertedVal = parseFloat(insertedVal);
      }
      jsonObj[data[0][j]] = insertedVal;
    }
    obj[data[0][0]].push(jsonObj);
    jsonStr = JSON.stringify(obj);
  }
  return obj;
}
