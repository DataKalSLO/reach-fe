import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import 'react-dropzone-uploader/dist/styles.css';
import * as csv from 'csv';
import csv2json from 'csvtojson';

function FileUpload() {
  const handleDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const csvStr = "1,2,3,4,5,6,7,8,9";
        csv2json({
          noheader:true,
          output: "csv"
      })
      .fromString(csvStr)
      .then((csvRow)=>{ 
          console.log(csvRow) // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
      })
    };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  return (
    <Dropzone onDrop={handleDrop} accept=".csv">
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag n drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
  );
}

export default FileUpload;
