import React, { useState, useEffect, useCallback } from 'react';
import FileUpload from '../common/components/FileUpload';
import CSVTemplate from '../admin/CSVTemplate';
import { Paper, Typography, Box, styled } from '@material-ui/core';
import { csv } from 'd3';
import { IDropzoneProps } from 'react-dropzone-uploader';
import csv2json from 'csvtojson';
import CSVReader from 'react-csv-reader';
import Dropzone from 'react-dropzone';

function Admin() {
  const [csvData, setCsvData]: any = useState([]);
  useEffect(() => {
    csv('./Sample.csv').then(data => setCsvData(data));
  });

  //currently removes files, will be changed later
  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files, allFiles);
  };

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (
    { meta },
    status
  ) => {
    //console.log(status, meta);
  };

  const handleForce = (data : Array<any>) => {
    console.log(data.toString());
    console.log(data);
    console.log(JSON.stringify(data));
    csv2json({
      noheader: true,
      output: "json"
    })
    .fromString("1 2 3, 3 4 5")
    .then((jsonObj)=>{
      console.log(jsonObj);
  })
  };

  const handleDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr: string = reader.result as string;
        /*csv2json({
          noheader: true,
          output: "csv"
        })
        .fromString(binaryStr)
        .then((csvRow)=>{ 
          console.log(csvRow)
      })*/
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  return (
    <React.Fragment>
      <UploadBox>
        <Typography variant="h5">Upload Your Data</Typography>
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={handleForce}
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
