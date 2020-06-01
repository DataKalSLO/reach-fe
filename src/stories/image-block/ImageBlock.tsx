import { Paper, styled } from '@material-ui/core';
import React, { useState } from 'react';
import ImageDropzone from './ImageDropzone';

interface Props {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function ImageBlock(props: Props) {
  // image url is both stored here and in redux
  const [localImageUrl, setLocalImageUrl] = useState(props.imageUrl);
  const setReduxImageUrl = props.setImageUrl;

  function logIt(files: [File]) {
    // temporary until backend is connected and we can get actual image url from s3
    const tempUrl = 'https://i.redd.it/ni8dp6vf80xy.jpg';
    setLocalImageUrl(tempUrl);
    setReduxImageUrl(tempUrl);
    alert(
      'files uploaded (not really, needs backend)\nEnjoy this placeholder.'
    );
  }

  return (
    <StoryBlockContainer variant="outlined">
      {localImageUrl === '' ? (
        <ImageDropzone onFileDrop={logIt}></ImageDropzone>
      ) : (
        //todo add delete 'x' on top corner of preview
        <img src={localImageUrl} alt="Preview" />
      )}
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
