import { Paper, styled } from '@material-ui/core';
import React, { useState } from 'react';
import ImageDropzone from './ImageDropzone';

export default function ImageBlock() {
  const [imgUrl, setImgUrl] = useState('');

  function logIt(files: [File]) {
    // temporary until backend is connected and we can get actual image url
    setImgUrl('https://i.redd.it/ni8dp6vf80xy.jpg');
    alert(
      'files uploaded (not really, needs backend)\nEnjoy this placeholder.'
    );
  }

  return (
    <StoryBlockContainer variant="outlined">
      {imgUrl === '' ? (
        <ImageDropzone onFileDrop={logIt}></ImageDropzone>
      ) : (
        //todo add delete 'x' on top corner of preview
        <img src={imgUrl} alt="Preview" />
      )}
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
