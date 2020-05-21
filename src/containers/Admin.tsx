import React, { useState, useEffect } from 'react';
import FileUpload from '../common/components/FileUpload';
import CSVTemplate from '../admin/CSVTemplate';
import { Paper, Typography, Box, styled } from '@material-ui/core';
import { csv } from 'd3';
import { IDropzoneProps } from 'react-dropzone-uploader';

function Admin() {
  const [csvData, setCsvData]: any = useState([]);
  useEffect(() => {
    csv('./Sample.csv').then(data => setCsvData(data));
  });

  //currently removes files, will be changed later
  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (
    { meta },
    status
  ) => {
    console.log(status, meta);
  };

  return (
    <React.Fragment>
      <UploadBox>
        <Typography variant="h5">Upload Your Data</Typography>
        <FileUpload
          handleChangeStatus={handleChangeStatus}
          handleSubmit={handleSubmit}
          accept=".csv"
        />
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
