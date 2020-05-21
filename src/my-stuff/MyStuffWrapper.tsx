import { Box, styled, Typography } from '@material-ui/core';
import React from 'react';
import Gallery, { GalleryProps } from '../common/components/Gallery';
import { theme } from '../theme/theme';
import MyStuffSidebar from './MyStuffSidebar';

interface Props extends GalleryProps {
  title: string;
  selectedIndex: number;
}

export default function MyStuffWrapper(props: Props) {
  return (
    <Box display="flex">
      <MyStuffSidebar selectedIndex={props.selectedIndex} />
      <ContentBox>
        <Typography variant="h3" component="h1">
          {props.title}
        </Typography>

        {/* TODO: the create new button, search bar, filter button, and sort button should all go here  */}

        <Gallery>{props.children}</Gallery>
      </ContentBox>
    </Box>
  );
}

const ContentBox = styled(Box)({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12)
});
