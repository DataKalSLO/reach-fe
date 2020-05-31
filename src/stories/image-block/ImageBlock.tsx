import { Paper, styled } from '@material-ui/core';
import React from 'react';
import { Button } from '@material-ui/core';
import ImageDropzone from './ImageDropzone';

export default function ImageBlock() {
  return (
    <StoryBlockContainer variant="outlined">
      <StyledDropzone onFileDrop={logIt}></StyledDropzone>
    </StoryBlockContainer>
  );
}

function logIt(files: [File]) {
  alert("files uploaded!");
}

const StyledDropzone = styled(ImageDropzone)({
  backgroundColor: 'blue',
  outline: 'dashed'
});

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  margin: '10px 0px 10px 0px'
});
