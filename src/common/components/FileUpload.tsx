import React from 'react';
import PropTypes from 'prop-types';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

interface FileUploadProps {
  handleChangeStatus: IDropzoneProps['onChangeStatus'];
  handleSubmit: IDropzoneProps['onSubmit'];
  accept: string;
}

function FileUpload(props: FileUploadProps) {
  return (
    <Dropzone
      onChangeStatus={props.handleChangeStatus}
      onSubmit={props.handleSubmit}
      accept={props.accept}
    />
  );
}

FileUpload.propTypes = {
  handleChangeStatus: PropTypes.element.isRequired,
  handleSubmit: PropTypes.element.isRequired,
  accept: PropTypes.element.isRequired
};

export default FileUpload;
