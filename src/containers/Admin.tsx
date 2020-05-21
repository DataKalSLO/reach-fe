import React, { useState, useEffect, useCallback } from 'react';
import CSVTemplate from '../admin/CSVTemplate';
import { Paper, Typography, Box, styled } from '@material-ui/core';
import { csv } from 'd3';
import CSVReader from 'react-csv-reader';

interface JSONVal {
  [key: string]: any;
}

function Admin() {
  const [csvAirportData, setCsvAirportData]: any = useState([]);
  const [csvCommuteData, setCsvCommuteData]: any = useState([]);
  const [csvCovidData, setCsvCovidData]: any = useState([]);
  const [csvIncomeData, setCsvIncomeData]: any = useState([]);
  const [csvWagesData, setCsvWagesData]: any = useState([]);
  const [csvMigrationData, setCsvMigrationData]: any = useState([]);
  const [csvSloAirportsData, setCsvSloAirportsData]: any = useState([]);
  const [csvUniversityData, setCsvUniversityData]: any = useState([]);
  const [csvWaterData, setCsvWaterData]: any = useState([]);
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
      Promise.all([
        csv('./Airports.csv'),
        csv('./CommuteTimes.csv'),
        csv('./CovidUnemployment.csv'),
        csv('./IncomeInequalitySlo.csv'),
        csv('./MeanRealWages.csv'),
        csv('./NetMigration.csv'),
        csv('./SloAirports.csv'),
        csv('./UniversityInfo.csv'),
        csv('./WaterSources.csv')
      ]).then(function(data) {
        setCsvAirportData(data[0]);
        setCsvCommuteData(data[1]);
        setCsvCovidData(data[2]);;
        setCsvIncomeData(data[3]);
        setCsvWagesData(data[4]);
        setCsvMigrationData(data[5]);
        setCsvSloAirportsData(data[6]);
        setCsvUniversityData(data[7]);
        setCsvWaterData(data[8]);
      });
    },[setCsvAirportData, setCsvCommuteData, setCsvCovidData]
  );

  const convertCsv2Json = useCallback(
    (data: Array<any>) => {
      const firstRowOfData = 3;
      const firstCol = 1;
      let jsonStr = '{"' + data[0][0] + '":[]}';
      const obj = JSON.parse(jsonStr);
      for (let i = firstRowOfData, numRows = data.length; i < numRows; i++) {
        const jsonObj: JSONVal = {};
        for (let j = firstCol, numCols = data[1].length ; j < numCols; j++) {
          let insertedVal = data[i][j];
          if (data[1][j] === 'integer') {
            insertedVal = parseInt(insertedVal, 10);
          } else if (data[1][j] === 'decimal') {
            insertedVal = parseFloat(insertedVal);
          }
          jsonObj[data[0][j]] = insertedVal;
        }
        obj[data[0][0]].push(jsonObj);
        jsonStr = JSON.stringify(obj);
      }
      console.log(obj);
      setJsonData(obj);
    },
    [setJsonData]
  );

  return (
    <React.Fragment>
      <UploadBox>
        <Typography variant="h5">Upload Your Data</Typography>
        <CSVReader cssClass="react-csv-input" onFileLoaded={convertCsv2Json} />
      </UploadBox>
      <DownloadPaper variant="outlined">
        <Typography variant="h5">Download Your CSV Templates</Typography>
        <Box>
          <CSVTemplate
            templateName="Airports.csv"
            csvData={csvAirportData}
            filename="Airports"
          />
          <CSVTemplate
            templateName="CommuteTimes.csv"
            csvData={csvCommuteData}
            filename="CommuteTimes"
          />
          <CSVTemplate
            templateName="CovidUnemployment.csv"
            csvData={csvCovidData}
            filename="CovidUnemployment"
          />
          <CSVTemplate
            templateName="IncomeInequalitySlo.csv"
            csvData={csvIncomeData}
            filename="IncomeInequalitySlo"
          />
          <CSVTemplate
            templateName="MeanRealWages.csv"
            csvData={csvWagesData}
            filename="MeanRealWages"
          />
          <CSVTemplate
            templateName="NetMigration.csv"
            csvData={csvMigrationData}
            filename="NetMigration"
          />
          <CSVTemplate
            templateName="SLOAirports.csv"
            csvData={csvSloAirportsData}
            filename="SLOAirports"
          />
          <CSVTemplate
            templateName="UniversityInfo.csv"
            csvData={csvUniversityData}
            filename="UniversityInfo"
          />
          <CSVTemplate
            templateName="WaterSources.csv"
            csvData={csvWaterData}
            filename="WaterSources"
          />
        </Box>
      </DownloadPaper>
    </React.Fragment>
  );
}

const UploadBox = styled(Box)({
  marginLeft: '300px',
  marginRight: '300px',
  marginTop: '100px'
});
const DownloadPaper = styled(Paper)({
  marginLeft: '300px',
  marginRight: '300px',
  marginTop: '50px'
});

export default Admin;
