import React, { useState, useEffect } from 'react';
import CSVUpload from '../admin/CSVUpload';
import CSVTemplate from '../admin/CSVTemplate';
import { Paper, Typography, Box, styled } from '@material-ui/core';
import { csv, DSVRowArray } from 'd3';

function Admin() {
  const [csvData, setCsvData]: any = useState([]);
  useEffect(() => {
    csv('./Sample.csv').then(data => setCsvData(data));
  });

  return (
    <React.Fragment>
      <UploadBox>
        <Typography variant="h5">Upload Your Data</Typography>
        <CSVUpload />
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
