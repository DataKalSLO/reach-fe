import { Divider, Typography } from '@material-ui/core';
import {
  ChatBubble,
  InsertChart,
  InsertPhoto,
  Save,
  TextFields
} from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveStoryAndHandleResponse,
  submitStoryForReviewAndHandleResponse
} from '../api/stories/operationHandlers';
import { Drawer, List, ListItemButton } from '../reach-ui/core';
import { EDIT_ICON, PREVIEW_ICON } from '../reach-ui/icons';
import {
  createEmptyImageBlock,
  createEmptyTextBlock,
  createGraphBlock,
  updatePublicationStatus
} from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import { PublicationStatus } from '../redux/story/types';
import { togglePreview } from '../redux/storybuilder/actions';
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import { areValidMetaFields } from './StoryEditor';

const STORY_SIDEBAR_WIDTH = 190;

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
    checkValidMetaFields(() => dispatch(togglePreview()));
  };

  const handleSave = async () => {
    await checkValidMetaFields(() => saveStoryAndHandleResponse(story));
    //TODO: Add Loading bar while waiting for request.
  };

  const handleSubmitForReview = () => {
    checkValidMetaFields(async () => {
      if (
        (await saveStoryAndHandleResponse(story)) &&
        (await submitStoryForReviewAndHandleResponse(story))
      ) {
        dispatch(updatePublicationStatus(PublicationStatus.REVIEW));
      }
    });
  };

  return (
    <Drawer width={STORY_SIDEBAR_WIDTH} isCollapsible={true}>
      <Typography variant="subtitle1" align="center">
        <b>Add Block</b>
      </Typography>
      <List>
        <ListItemButton
          disabled={previewSelected}
          text={'Text'}
          icon={<TextFields />}
          onClick={() => dispatch(createEmptyTextBlock())}
        />
        <ListItemButton
          disabled={previewSelected}
          text={'Graph'}
          icon={<InsertChart />}
          onClick={() => dispatch(createGraphBlock())}
        />
        <ListItemButton
          disabled={previewSelected}
          text={'Image'}
          icon={<InsertPhoto />}
          onClick={() => dispatch(createEmptyImageBlock())}
        />
      </List>
      <Divider />
      <List>
        <ListItemButton
          text={previewSelected ? 'Edit' : 'Preview'}
          icon={previewSelected ? EDIT_ICON : PREVIEW_ICON}
          onClick={handleTogglePreview}
        />
      </List>
      <Divider />
      <List>
        <ListItemButton text={'Save'} icon={<Save />} onClick={handleSave} />
        <ListItemButton
          text={'Submit for Review'}
          icon={<ChatBubble />}
          onClick={handleSubmitForReview}
        />
      </List>
    </Drawer>
  );
}
