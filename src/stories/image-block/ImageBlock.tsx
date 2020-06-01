import { Paper, styled } from '@material-ui/core';
import React, { useState } from 'react';
import ImageDropzone from './ImageDropzone';

interface Props {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function ImageBlock(props: Props) {
  const { imageUrl, setImageUrl } = props; // this is NOT a hook, the state is being managed in StoryBlock

  function logIt(files: [File]) {
    // temporary until backend is connected and we can get actual image url from s3
    setImageUrl('https://i.redd.it/ni8dp6vf80xy.jpg');
    console.log('url is');
    alert(
      'files uploaded (not really, needs backend)\nEnjoy this placeholder.'
    );
  }

  return (
    <StoryBlockContainer variant="outlined">
      {imageUrl === '' ? (
        <ImageDropzone onFileDrop={logIt}></ImageDropzone>
      ) : (
        //todo add delete 'x' on top corner of preview
        <img src={imageUrl} alt="Preview" />
      )}
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
