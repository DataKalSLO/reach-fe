import React from 'react';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

function CSVUpload() {
  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = (
    { meta },
    status
  ) => {
    console.log(status, meta);
  };

  //currently removes files, will be changed later
  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept=".csv"
    />
  );
}

export default CSVUpload;
