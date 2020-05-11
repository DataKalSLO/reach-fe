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
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import { StoryBuilderActionType } from '../redux/storybuilder/types';
import { areValidMetaFields } from './StoryForm';
import { saveStoryAndHandleResponse } from '../api/stories/operationHandlers';

const STORY_SIDEBAR_WIDTH = 165;

// To test the API funcitonality please change the .env file path to: http://localhost:5000/
// And run the command `dotnet run` in hourglass-be/HourglassServer folder with the BEND
// branch: story-include-refactor-2
export default function StorySidebar() {
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;
  const story = useSelector(getStory);
  const dispatch = useDispatch();

  const metaFieldsAreValid = () => {
    return areValidMetaFields(story.title, story.description);
  };

  const checkValidMetaFields = (onSuccess: () => StoryBuilderActionType) => {
    if (metaFieldsAreValid()) {
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
    if (metaFieldsAreValid()) saveStoryAndHandleResponse(story);
    else alert('Please complete the required fields.');
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
