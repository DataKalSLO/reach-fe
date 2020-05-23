import React, { useState, useEffect, useCallback } from 'react';
import CSVTemplate from '../admin/CSVTemplate';
import { Paper, Typography, Box, styled } from '@material-ui/core';
import { csv } from 'd3';
import CSVReader from 'react-csv-reader';

interface JSONVal {
  [key: string]: any;
}

function Admin() {
  const [csvData, setCsvData]: any = useState([]);
  const [jsonData, setJsonData] = useState({});
  useEffect(() => {
    csv('./Sample.csv').then(data => setCsvData(data));
  });

  const convertCsv2Json = useCallback(
    (data: Array<any>) => {
      let jsonStr = '{"' + data[0][0] + '":[]}';
      const obj = JSON.parse(jsonStr);
      for (let i = 4, len = data.length; i < len; i++) {
        const jsonObj: JSONVal = {};
        for (let j = 0, len1 = data[1].length; j < len1; j++) {
          let insertedVal = data[i][j];
          if (data[2][j] === 'integer') {
            insertedVal = parseInt(insertedVal, 10);
          } else if (data[2][j] === 'decimal') {
            insertedVal = parseFloat(insertedVal);
          }
          jsonObj[data[1][j]] = insertedVal;
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
            templateName="Universities.csv"
            csvData={csvData}
            filename="Sample"
          />
          <CSVTemplate
            templateName="Population.csv"
            csvData={csvData}
            filename="Sample"
          />
          <CSVTemplate
            templateName="COVID.csv"
            csvData={csvData}
            filename="Sample"
          />
          <CSVTemplate
            templateName="Restaurants.csv"
            csvData={csvData}
            filename="Sample"
          />
          <CSVTemplate
            templateName="Housing.csv"
            csvData={csvData}
            filename="Sample"
          />
          <CSVTemplate
            templateName="ElementarySchools.csv"
            csvData={csvData}
            filename="Sample"
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
