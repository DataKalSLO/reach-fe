import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled, Box } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

interface ImageDropzoneProps {
  onFileDrop: (files: [File]) => void;
}

export default function ImageDropzone(props: ImageDropzoneProps) {
  const onDrop = useCallback(acceptedFiles => {
    props.onFileDrop(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <StyledBox {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>
          <h3>Drop Image Here...</h3>
          <CloudUploadIcon />
          <p>or click to select files</p>
        </div>
      ) : (
        <div>
          <h3>Drag and Drop an Image Here</h3>
          <CloudUploadIcon />
          <p>or click to select files</p>
        </div>
      )}
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  backgroundColor: 'aliceblue',
  border: '3px dashed lightblue',
  borderRadius: '5px',
  height: '100%',
  textAlign: 'center'
});
