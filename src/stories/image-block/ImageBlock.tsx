import { Paper, styled } from '@material-ui/core';
import React from 'react';
import ImageDropzone from './ImageDropzone';

interface Props {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function ImageBlock(props: Props) {
  const { imageUrl, setImageUrl } = props;

  function uploadAndUpdateUrl(files: [File]) {
    // temporary until backend is connected and we can get actual image url from s3
    const tempUrl = 'https://i.redd.it/ni8dp6vf80xy.jpg';
    setImageUrl(tempUrl);
    alert(
      'files uploaded (not really, needs backend)\nEnjoy this placeholder.'
    );
  }

  return (
    <StoryBlockContainer variant="outlined">
      {imageUrl === '' ? (
        <ImageDropzone onFileDrop={uploadAndUpdateUrl}></ImageDropzone>
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
