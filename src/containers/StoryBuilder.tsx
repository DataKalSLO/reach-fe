import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import RichTextEditor from '../stories/RichTextEditor';
import { SaveStory, Story, GenerateEmptyStory } from '../stories/StoryObjects';
import SaveIcon from '@material-ui/icons/Save';
import StoryBuilderForm from '../stories/StoryBuilderForm';
import SortableList from '../stories/SortableList';
import { Button } from '@material-ui/core';
import uuidv4 from 'uuid/v4';

function StoryBuilder() {
  const tempUserId = uuidv4();
  const [story, setStory] = useState<Story>(GenerateEmptyStory(tempUserId));

  return (
    <Container>
      <h1>StoryBuilder</h1>
      <text>
        Tell us a compelling story using data. Use the toolbar on the right to
        add text blocks, graphs, static images, and dataset snippets to help
        readers follow along with your findings and conclusions. Use the drag
        handles to the left of each component if you want to reorder them.
      </text>
      <RichTextEditor />
      <Button
        variant="contained"
        color="primary"
        onClick={() => SaveStory(story)}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <StoryBuilderForm />
      <SortableList />
    </Container>
  );
}

export default StoryBuilder;
