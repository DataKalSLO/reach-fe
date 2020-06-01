import React, { useCallback, useState } from 'react';
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps
} from 'react-dropzone';
import { styled, Box } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const MEGABYTE = 1048576; // bytes

interface ImageDropzoneProps {
  onFileDrop: (files: [File]) => void;
}

export default function ImageDropzone(props: ImageDropzoneProps) {
  const [shouldReject, setShouldReject] = useState(false);

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length > 1) {
        setShouldReject(true);
        setTimeout(() => {
          setShouldReject(false);
        }, 1500);
        return;
      }
      props.onFileDrop(acceptedFiles);
    },
    [props]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 25 * MEGABYTE // 25 mb seems to be a common image upload limit for file hosting sites
  });

  if (shouldReject) {
    return showRejectionMessage();
  }
  return showDropzone(isDragActive, getRootProps, getInputProps);
}

function showRejectionMessage() {
  return (
    <RejectionBox>
      <div>
        <br />
        <h4>Only one file is allowed per Image Block</h4>
        <br />
      </div>
    </RejectionBox>
  );
}

function showDropzone(
  isDragActive: boolean,
  getRootProps: (props?: DropzoneInputProps | undefined) => DropzoneRootProps,
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps
) {
  return (
    <DropzoneBox {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>
          <h3>Drop Image Here...</h3>
          <CloudUploadIcon />
          <p>or click to select files</p>
        </div>
      ) : (
        <div>
          <h3>Drag and Drop an Image</h3>
          <CloudUploadIcon />
          <p>or click to select files</p>
        </div>
      )}
    </DropzoneBox>
  );
}

const DropzoneBox = styled(Box)({
  backgroundColor: 'aliceblue',
  border: '3px dashed lightblue',
  borderRadius: '5px',
  height: '100%',
  textAlign: 'center'
});

const RejectionBox = styled(DropzoneBox)({
  backgroundColor: 'indianred',
  border: '3px dashed firebrick'
});
