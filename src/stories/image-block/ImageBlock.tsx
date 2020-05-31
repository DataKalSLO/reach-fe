import { Paper, styled } from '@material-ui/core';
import React from 'react';
import ImageDropzone from './ImageDropzone';

export default function ImageBlock() {
  return (
    <StoryBlockContainer variant="outlined">
      <ImageDropzone onFileDrop={logIt}></ImageDropzone>
    </StoryBlockContainer>
  );
}

function logIt(files: [File]) {
  alert('files uploaded');
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
