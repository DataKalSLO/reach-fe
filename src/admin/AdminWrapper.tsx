import { Box, Typography, styled } from '@material-ui/core';
import React from 'react';
import { theme } from '../theme/theme';
import AdminSidebar from './AdminSidebar';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export default function AdminWrapper(props: Props) {
  return (
    <Box display="flex">
      <AdminSidebar />
      <ContentBox>
        <Typography variant="h3" component="h1">
          {props.title}
        </Typography>

        {props.children}
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
