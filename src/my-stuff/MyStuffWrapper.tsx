import { Box, Typography } from '@material-ui/core';
import React from 'react';
import Gallery, { GalleryProps } from '../common/components/Gallery';
import { SidebarContentBox } from '../reach-ui/core';
import MyStuffSidebar from './MyStuffSidebar';

interface Props extends GalleryProps {
  title: string;
}

export default function MyStuffWrapper(props: Props) {
  return (
    <Box display="flex">
      <MyStuffSidebar />
      <SidebarContentBox>
        <Typography variant="h3" component="h1">
          {props.title}
        </Typography>

        {/* TODO: the create new button, search bar, filter button, and sort button should all go here  */}

        <Gallery>{props.children}</Gallery>
      </SidebarContentBox>
    </Box>
  );
}
