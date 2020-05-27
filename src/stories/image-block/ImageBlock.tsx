import { Paper, styled } from '@material-ui/core';
import React from 'react';
import { Button } from '@material-ui/core';
import { S3 } from 'aws-sdk';

export default function ImageBlock() {
  return (
    <StoryBlockContainer variant="outlined">
      {/* Temporary to get file upload working */}
      {alert("images")}
      <Button variant="contained" onClick={() => uploadPhoto()}>
        Default
      </Button>
    </StoryBlockContainer>
  );
}

function uploadPhoto() {
  const file = 'public/logo192.png';
  const fileName = 'filename';

  const photoKey = 'images/' + fileName;

  // Use S3 ManagedUpload class as it supports multipart uploads
  const upload = new S3.ManagedUpload({
    // replace with env variables
    params: {
      Bucket: 'hourglass-image-upload',
      Key: photoKey,
      Body: file,
      ACL: 'public-read'
    }
  });

  const promise = upload.promise();

  promise.then(
    function(data) {
      alert('Successfully uploaded photo.');
    },
    function(err) {
      return alert('There was an error uploading your photo: ' + err.message);
    }
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '20px',
  margin: '10px 0px 10px 0px'
});
