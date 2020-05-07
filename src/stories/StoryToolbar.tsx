import { Divider, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
import { List, ListItemButton } from '../reach-ui/core';
import { createEmptyTextBlock } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import { togglePreview } from '../redux/storybuilder/actions';
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import { StoryBuilderActionType } from '../redux/storybuilder/types';
import { areValidMetaFields } from './StoryForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      zIndex: 0, // to place drawer behind appbar
      width: STORY_TOOLBAR_WIDTH,

      backgroundColor: theme.palette.secondary.light,
      paddingTop: 100 // padding to place buttons beneath app bar
    }
  })
);

export function StoryToolbar() {
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;
  const story = useSelector(getStory);
  const dispatch = useDispatch();
  const classes = useStyles();

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
    // TODO: @berto call checkValidMetaFields and pass in your onSuccess func
    // Model this func after handleTogglePreview
    alert('Save Stories is not implemented');
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        // styling for drawer must be done with drawer's child paper element,
        // and cannot be done with styled components
        // https://material-ui.com/guides/interoperability/#deeper-elements-3
        paper: classes.drawerPaper
      }}
    >
      <Typography variant="subtitle1" align="center">
        <b>Add Block</b>
      </Typography>
      <List>
        <ListItemButton
          primarylabel={'Text'}
          aria-label={'Text'}
          icon={<TextFields />}
          onClick={() => dispatch(createEmptyTextBlock())}
        />
        <ListItemButton
          primarylabel={'Graph'}
          aria-label={'Graph'}
          icon={<InsertChart />}
          onClick={() => alert('Not implemented')}
        />
        <ListItemButton
          primarylabel={'Map'}
          aria-label={'Map'}
          icon={<Map />}
          onClick={() => alert('Not implemented')}
        />
        <ListItemButton
          primarylabel={'Image'}
          aria-label={'Image'}
          icon={<InsertPhoto />}
          onClick={() => alert('Not implemented')}
        />
      </List>
      <Divider />
      <List>
        <ListItemButton
          primarylabel={previewSelected ? 'Edit' : 'Preview'}
          aria-label={previewSelected ? 'Edit' : 'Preview'}
          icon={previewSelected ? <Edit /> : <Visibility />}
          onClick={handleTogglePreview}
        />
        <ListItemButton
          primarylabel={'Save'}
          aria-label={'Save'}
          icon={<Save />}
          onClick={handleSave}
        />
      </List>
    </Drawer>
  );
}

export const STORY_TOOLBAR_WIDTH = 150;
