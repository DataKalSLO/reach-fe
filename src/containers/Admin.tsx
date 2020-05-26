import React, { useState, useEffect, useCallback } from 'react';
import CSVTemplate from '../admin/CSVTemplate';
import { Paper, Typography, Box, styled } from '@material-ui/core';
import { csv } from 'd3';
import CSVReader from 'react-csv-reader';
import { convertCsvToJson } from '../common/util/csvToJson';

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
      setCsvCovidData(data[2]);
      setCsvIncomeData(data[3]);
      setCsvWagesData(data[4]);
      setCsvMigrationData(data[5]);
      setCsvSloAirportsData(data[6]);
      setCsvUniversityData(data[7]);
      setCsvWaterData(data[8]);
    });
  }, [setCsvAirportData, setCsvCommuteData, setCsvCovidData]);

  const setJsonFromCsv = useCallback(
    (data: Array<any>) => {
      const jsonObj = convertCsvToJson(data);
      console.log(jsonObj);
      setJsonData(jsonObj);
    },
    [setJsonData]
  );

  return (
    <React.Fragment>
      <UploadBox>
        <Typography variant="h5">Upload Your Data</Typography>
        <CSVReader cssClass="react-csv-input" onFileLoaded={setJsonFromCsv} />
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
