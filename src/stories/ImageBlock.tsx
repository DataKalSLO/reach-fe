import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';

// Copied from https://github.com/jakehartnell/react-images-upload#readme

export default function ImageBlock(props: any) {
  const [pictures, setPictures] = useState<File[]>([]);

  const onDrop = (picture: File) => {
    setPictures([...pictures, picture]);
  };

  return (
    <ImageUploader
      {...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={['.jpg', '.png', '.gif']}
      maxFileSize={5242880}
    />
  );
}
