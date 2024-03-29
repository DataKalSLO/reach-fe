import { Box, styled } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React, { useCallback, useState } from 'react';
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone
} from 'react-dropzone';

const MEGABYTE = 1048576; // bytes

interface ImageDropzoneProps {
  onFileDrop: (files: [File]) => void;
}

export default function ImageDropzone(props: ImageDropzoneProps) {
  const [rejectMessage, setRejectMessage] = useState('');

  const onDrop = useCallback(
    acceptedFiles => {
      function rejectFiles(message: string) {
        setRejectMessage(message);
        setTimeout(() => {
          setRejectMessage('');
        }, 5000); // show error for 5 seconds before returning to dropzone
      }

      if (acceptedFiles.length > 1) {
        rejectFiles('Only one file can be uploaded per image block');
        return;
      } else if (acceptedFiles.length === 0) {
        rejectFiles(
          'Filetype not accepted. Accepted types: .jpg, .jpeg, .png .jfif, .pjp, .pjpeg'
        );
        return;
      }
      props.onFileDrop(acceptedFiles);
    },
    [props]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'image/png'],
    maxSize: 25 * MEGABYTE // 25 mb is a common upload limit for image hosting sites
  });

  if (rejectMessage !== '') {
    return showRejection(rejectMessage);
  }
  return showDropzone(isDragActive, getRootProps, getInputProps);
}

function showRejection(message: string) {
  return (
    <RejectionBox>
      <div>
        <h4>Could not upload images!</h4>
        <p>{message}</p>
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
  textAlign: 'center',
  minHeight: '150px'
});

const RejectionBox = styled(DropzoneBox)({
  backgroundColor: 'lightpink',
  border: '3px dashed firebrick'
});
