import { Paper, styled } from '@material-ui/core';
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

  return (
    <StoryBlockContainer variant="outlined">
      {imageUrl === '' ? (
        <ImageDropzone onFileDrop={uploadAndUpdateUrl}></ImageDropzone>
      ) : (
        <img src={imageUrl} alt="Preview" />
      )}
    </StoryBlockContainer>
  );
}

export function deleteImageFromBlock(url: string) {
  deleteImageBlockImage(url)
    .then((success: boolean) => {
      return success;
    })
    .catch(err => {
      console.log(
        'There was an error deleting your image. Please try again later.'
      );
      console.log(err);
    });
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '10px',
  margin: '10px 0px 10px 0px'
});
