import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import RichTextEditor from '../stories/RichTextEditor';
import {
  SaveStory,
  Story,
  GenerateEmptyStory,
  BlockComponent,
  StoryBlock,
  TextBlock
} from '../stories/StoryTypes';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import SortableList from '../stories/SortableList';
import { Button, LinearProgress } from '@material-ui/core';
import uuidv4 from 'uuid/v4';
import StoryForm from '../stories/StoryForm';

function StoryBuilder() {
  return (
    <Container>
      <h1>StoryBuilder</h1>
      <text>
        Tell us a compelling story using data. Use the toolbar on the right to
        add text blocks, graphs, static images, and dataset snippets to help
        readers follow along with your findings and conclusions. Use the drag
        handles to the left of each component if you want to reorder them.
      </text>
      <StoryForm />
    </Container>
  );
}

export default StoryBuilder;
