import React from 'react';
import { graphs } from './GraphBlock';
import { styled, Box } from '@material-ui/core';

export const selectedGraph = (graphId: number) => (
  <GraphBlockContainer>{graphs[graphId]}</GraphBlockContainer>
);

export const GraphBlockContainer = styled(Box)({});
