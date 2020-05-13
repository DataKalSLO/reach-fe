import React, { useState } from 'react';
import { default as LibImageUploader } from 'react-images-upload';

// Copied from https://github.com/jakehartnell/react-images-upload#readme

const ImageUploader = (props: any) => {
  const [pictures, setPictures] = useState<File[]>([]);

  const onDrop = (picture: File) => {
    setPictures([...pictures, picture]);
  };

  // Note: .svg files are not accepted due to weird sizing issues
  const acceptedFileTypes = ['.jpg', '.png', '.gif'];

  return (
    <LibImageUploader
      {...props}
      singleImage
      buttonText={'Choose image'}
      withIcon={true}
      label={'Max file size: 5 MB, accepted: ' + acceptedFileTypes.toString()}
      onChange={onDrop}
      imgExtension={acceptedFileTypes}
      maxFileSize={5242880}
    />
  );
};

export { ImageUploader };
