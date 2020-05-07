import { Divider, Typography } from '@material-ui/core';
import {
  Edit,
  InsertChart,
  InsertPhoto,
  Map,
  Save,
  TextFields,
  Visibility
} from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '../common/components/Drawer';
import { List, ListItemButton } from '../reach-ui/core';
import { createEmptyTextBlock } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import { togglePreview } from '../redux/storybuilder/actions';
import { Story } from '../redux/story/types';
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import {
  StoryBuilderActionType,
  TOGGLE_PREVIEW,
  TogglePreviewAction
} from '../redux/storybuilder/types';
import { areValidMetaFields } from './StoryForm';
import { saveStory } from './StoryAPIConnector';

const STORY_SIDEBAR_WIDTH = 165;
const STORY_CREATION_SUCCESS_MESSAGE = 'Story created!';
const STORY_CREATION_FAILURE_MESSAGE =
  'An Error occurred while saving a Story. Story was not created.';

function sendAndRespondToSaveStory(story: Story): TogglePreviewAction {
  saveStory(story)
    .then(res => {
      console.log(STORY_CREATION_SUCCESS_MESSAGE);
    })
    .catch(e => {
      //TODO: Remove `if` after BEND has changed to return JSON instead of string response
      if (e instanceof SyntaxError) console.log(STORY_CREATION_SUCCESS_MESSAGE);
      else {
        console.log('Error: ' + e);
        alert(STORY_CREATION_FAILURE_MESSAGE);
      }
    });
  return {
    type: TOGGLE_PREVIEW,
    payload: null
  };
}

export default function StorySidebar() {
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;
  const story = useSelector(getStory);
  const dispatch = useDispatch();

  const checkValidMetaFields = (onSuccess: () => StoryBuilderActionType) => {
    if (areValidMetaFields(story.title, story.description)) {
      dispatch(onSuccess());
    } else {
      alert('Please complete the required fields.');
    }
  };

  const handleTogglePreview = () => {
    checkValidMetaFields(togglePreview);
  };

  const handleSave = () => {
    story.userID = 'test1@test.com'; //TODO: Remove authentication API function exist
    checkValidMetaFields(
      (): TogglePreviewAction => sendAndRespondToSaveStory(story)
    );
    //TODO: Add Loading bar while waiting for request.
  };

  return (
    <Drawer width={STORY_SIDEBAR_WIDTH}>
      <Typography variant="subtitle1" align="center">
        <b>Add Block</b>
      </Typography>
      <List>
        <ListItemButton
          text={'Text'}
          icon={<TextFields />}
          onClick={() => dispatch(createEmptyTextBlock())}
        />
        <ListItemButton
          text={'Graph'}
          icon={<InsertChart />}
          onClick={() => alert('Not implemented')}
        />
        <ListItemButton
          text={'Map'}
          icon={<Map />}
          onClick={() => alert('Not implemented')}
        />
        <ListItemButton
          text={'Image'}
          icon={<InsertPhoto />}
          onClick={() => alert('Not implemented')}
        />
      </List>
      <Divider />
      <List>
        <ListItemButton
          text={previewSelected ? 'Edit' : 'Preview'}
          icon={previewSelected ? <Edit /> : <Visibility />}
          onClick={handleTogglePreview}
        />
        <ListItemButton text={'Save'} icon={<Save />} onClick={handleSave} />
      </List>
    </Drawer>
  );
}
