import React, { useState, useEffect, useCallback } from 'react';
import CSVTemplate from '../admin/CSVTemplate';
import { Paper, Typography, Box, styled } from '@material-ui/core';
import { csv } from 'd3';
import CSVReader from 'react-csv-reader';
import { convertCsvToJson } from '../common/util/csvToJson';
import { upload } from '../api/upload';
import Button from '../common/components/Button';

function Admin() {
  const [csvAirportData, setCsvAirportData]: any = useState([]);
  const [csvCommuteData, setCsvCommuteData]: any = useState([]);
  const [csvCovidData, setCsvCovidData]: any = useState([]);
  const [csvIncomeData, setCsvIncomeData]: any = useState([]);
  const [csvWagesData, setCsvWagesData]: any = useState([]);
  const [csvMigrationData, setCsvMigrationData]: any = useState([]);
  const [csvSloAirportsData, setCsvSloAirportsData]: any = useState([]);
  const [csvUniversityData, setCsvUniversityData]: any = useState([]);
  const [jsonData, setJsonData] = useState({});
  const [uploadDisabled, setUploadDisabled] = useState(true);
  enum status {
    success,
    failure,
    undefined
  }
  const [uploadStatus, setUploadStatus] = useState(status.undefined);

  useEffect(() => {
    Promise.all([
      csv('./Airports.csv'),
      csv('./CommuteTimes.csv'),
      csv('./CovidUnemployment.csv'),
      csv('./IncomeInequalitySlo.csv'),
      csv('./MeanRealWages.csv'),
      csv('./NetMigration.csv'),
      csv('./SloAirports.csv'),
      csv('./UniversityInfo.csv')
    ]).then(function(data) {
      setCsvAirportData(data[0]);
      setCsvCommuteData(data[1]);
      setCsvCovidData(data[2]);
      setCsvIncomeData(data[3]);
      setCsvWagesData(data[4]);
      setCsvMigrationData(data[5]);
      setCsvSloAirportsData(data[6]);
      setCsvUniversityData(data[7]);
    });
  }, [setCsvAirportData, setCsvCommuteData, setCsvCovidData]);

  const setJsonFromCsv = useCallback(
    (data: Array<any>) => {
      const jsonObj = convertCsvToJson(data);
      setJsonData(jsonObj);
      setUploadDisabled(false);
    },
    [setJsonData, setUploadDisabled]
  );

  const uploadData = useCallback(() => {
    upload(jsonData)
      .then(() => {
        setUploadStatus(status.success);
      })
      .catch(e => {
        setUploadStatus(status.failure);
      });
  }, [jsonData, setUploadStatus, status.failure, status.success]);

  const uploadMessageColor =
    uploadStatus === status.success ? 'primary' : 'error';

  const uploadMessage =
    uploadStatus === status.success
      ? 'Success! The data was successfully uploaded into the database.'
      : uploadStatus === status.failure
      ? 'Failed...Something went wrong.  Please check the formatting of your csv.'
      : '';

  return (
    <React.Fragment>
      <UploadPaper variant="outlined">
        <Typography variant="h5">Upload Your Data</Typography>
        <UploadBox>
          <CSVReader cssClass="react-csv-input" onFileLoaded={setJsonFromCsv} />
          <Button
            label="Upload Data"
            onClick={uploadData}
            disabled={uploadDisabled}
          />
        </UploadBox>
        <Typography color={uploadMessageColor} variant="caption">
          {uploadMessage}
        </Typography>
      </UploadPaper>
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
        </Box>
      </DownloadPaper>
    </React.Fragment>
  );
}

const UploadPaper = styled(Paper)({
  marginLeft: '300px',
  marginRight: '300px',
  marginTop: '100px'
});

const UploadBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-between'
});

const DownloadPaper = styled(Paper)({
  marginLeft: '300px',
  marginRight: '300px',
  marginTop: '50px'
});

export default Admin;
