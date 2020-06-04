import { Box, Button, Paper, styled } from '@material-ui/core';
import React, { useState } from 'react';
import ImageDropzone from './ImageDropzone';
import {
  deleteImageBlockImage,
  uploadImageForImageBlocks
} from '../../api/stories/imageBlocks/operations';
import { ImageUploadResponse } from '../../api/stories/imageBlocks/types';
import { HighlightOff } from '@material-ui/icons';
import { IconButton } from '../../reach-ui/core';
import { theme } from '../../theme/theme';

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
        console.log(imageUrl);
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
    deleteImageBlockImage(imageUrl)
      .then((success: boolean) => {
        if (success) {
          setImageUrl('');
        } else {
          alert('Deletion Failed. Please try again later.');
        }
      })
      .catch(err => {
        alert(
          'There was an error deleting your image. Please try again later.'
        );
        console.log(err);
      });
  }

  return (
    <StoryBlockContainer variant="outlined">
      {imageUrl === '' ? (
        <ImageDropzone onFileDrop={uploadAndUpdateUrl}></ImageDropzone>
      ) : (
        <ImageBox>
          <img src={imageUrl} alt="Preview" />
          <CornerIconButton
            aria-label={'remove image'}
            onClick={deleteImage}
            style={{ color: theme.palette.error.main, background: 'white' }}
            icon={<HighlightOff />}
          />
        </ImageBox>
      )}
    </StoryBlockContainer>
  );
}

const ImageBox = styled(Box)({
  position: 'relative'
});

const CornerIconButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
  top: 0
});

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
