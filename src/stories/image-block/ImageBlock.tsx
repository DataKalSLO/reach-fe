import { Paper, styled } from '@material-ui/core';
import React, { useState } from 'react';
import ImageDropzone from './ImageDropzone';

export default function ImageBlock() {
  const [imgUrl, setImgUrl] = useState('');

  function logIt(files: [File]) {
    setImgUrl('https://i.redd.it/ni8dp6vf80xy.jpg');
    alert('files uploaded');
  }

  return (
    <StoryBlockContainer variant="outlined">
      {imgUrl === '' ? (
        <ImageDropzone onFileDrop={logIt}></ImageDropzone>
      ) : (
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
