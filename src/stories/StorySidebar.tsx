import { Divider, Typography } from '@material-ui/core';
import {
  ChatBubble,
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
import { saveStoryAndHandleResponse } from '../api/stories/operationHandlers';
import { Drawer, List, ListItemButton } from '../reach-ui/core';
import { createEmptyTextBlock } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import { togglePreview } from '../redux/storybuilder/actions';
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import { areValidMetaFields } from './StoryForm';

const STORY_SIDEBAR_WIDTH = 175;

export default function StorySidebar() {
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;
  const story = useSelector(getStory);
  const dispatch = useDispatch();

  function checkValidMetaFields<T>(onSuccess: () => T) {
    if (areValidMetaFields(story.title, story.description)) {
      onSuccess();
    } else {
      alert('Please complete the required fields.');
    }
  }

  const handleTogglePreview = () => {
    checkValidMetaFields(() => dispatch(togglePreview));
  };

  const handleSave = () => {
    story.userID = 'test1@test.com'; //TODO: Remove when API functions access auth token
    checkValidMetaFields(() => saveStoryAndHandleResponse(story));
    //TODO: Add Loading bar while waiting for request.
  };

  return (
    <Drawer width={STORY_SIDEBAR_WIDTH} isCollapsible={true}>
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

        {/* A dirty hack to make the List think it has multiple children, as required.
        Easiest way to keep the styling and spacing consistent. */}
        <></>
      </List>
      <Divider />
      <List>
        <ListItemButton text={'Save'} icon={<Save />} onClick={handleSave} />
        <ListItemButton
          text={'Submit for Review'}
          icon={<ChatBubble />}
          onClick={() => alert('Not yet implemented')}
        />
      </List>
    </Drawer>
  );
}
