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
import StoryBuilderForm from '../stories/StoryBuilderForm';
import SortableList from '../stories/SortableList';
import { Button, LinearProgress } from '@material-ui/core';
import uuidv4 from 'uuid/v4';

function StoryBuilder() {
  const tempUserId = uuidv4();
  const [story, setStory] = useState<Story>(GenerateEmptyStory(tempUserId));

  const setBlocks = (blocks: Array<StoryBlock>) => {
    setStory({
      storyID: story.storyID,
      userID: story.userID,
      title: story.title,
      description: story.description,
      dateCreated: story.dateCreated,
      dateLastEdited: story.dateLastEdited,
      storyBlocks: blocks
    });
  };

  return (
    <Container>
      <h1>StoryBuilder</h1>
      <text>
        Tell us a compelling story using data. Use the toolbar on the right to
        add text blocks, graphs, static images, and dataset snippets to help
        readers follow along with your findings and conclusions. Use the drag
        handles to the left of each component if you want to reorder them.
      </text>
      {/*<RichTextEditor />*/}
      <div>
        <SortableList setBlocks={setBlocks} storyBlocks={story.storyBlocks} />
      </div>
      {/*TODO: Make this cleaner*/}
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          setBlocks(
            story.storyBlocks.concat([
              {
                blockID: uuidv4(),
                editorState: JSON.parse('{}'),
                type: 'Text'
              } as TextBlock
            ] as Array<StoryBlock>)
          )
        }
        startIcon={<AddIcon />}
      >
        Add Story
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => SaveStory(story)}
        startIcon={<SaveIcon />}
      >
        Save Story
      </Button>
    </Container>
  );
}

export default StoryBuilder;
