import { Box, Button, Paper, styled } from '@material-ui/core';
import React from 'react';
import ImageDropzone from './ImageDropzone';
import {
  deleteImageBlockImage,
  uploadImageForImageBlocks
} from '../../api/stories/imageBlocks/operations';
import { ImageUploadResponse } from '../../api/stories/imageBlocks/types';

interface Props {
  blockId: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function ImageBlock(props: Props) {
  const { blockId, imageUrl, setImageUrl } = props;

  async function uploadAndUpdateUrl(files: [File]) {
    uploadImageForImageBlocks(files[0], blockId)
      .then((response: ImageUploadResponse) => {
        const { imageUrl } = response;
        setImageUrl(imageUrl);
      })
      .catch(err => {
        alert(
          'There was an error uploading your image. Please try again later.'
        );
        console.log(err);
      });
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
        <Box>
          <img src={imageUrl} alt="Preview" />
          <Button
            variant="contained"
            color="default"
            onClick={() => deleteImage()}
          >
            Remove Image
          </Button>
        </Box>
      )}
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
