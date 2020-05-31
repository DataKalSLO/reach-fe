import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled, Box } from '@material-ui/core';

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
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  background: 'gray',
  height: '100px'
});
