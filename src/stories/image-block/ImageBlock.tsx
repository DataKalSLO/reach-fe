import { Button, Paper, styled } from '@material-ui/core';
import React from 'react';
import ImageDropzone from './ImageDropzone';
import {
  deleteImageBlockImage,
  uploadImageForImageBlocks
} from '../../api/stories/imageBlocks/operations';

interface Props {
  blockId: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function ImageBlock(props: Props) {
  const { blockId, imageUrl, setImageUrl } = props;

  async function uploadAndUpdateUrl(files: [File]) {
    const { imageUrl } = await uploadImageForImageBlocks(files[0], blockId);
    console.log(imageUrl);
    setImageUrl(imageUrl);
  }

  function deleteImage() {
    setImageUrl('');
    deleteImageBlockImage(imageUrl);
  }

  return (
    <StoryBlockContainer variant="outlined">
      {imageUrl === '' ? (
        <ImageDropzone onFileDrop={uploadAndUpdateUrl}></ImageDropzone>
      ) : (
        <div>
          <img src={imageUrl} alt="Preview" />
          <Button
            variant="contained"
            color="default"
            onClick={() => deleteImage()}
          >
            Delete Image
          </Button>
        </div>
      )}
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
