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
import Sidebar from '../common/components/Sidebar';
import { List, ListItemButton } from '../reach-ui/core';
import { createEmptyTextBlock } from '../redux/story/actions';
import { togglePreview } from '../redux/storybuilder/actions';
import { getStoryBuilder } from '../redux/storybuilder/selectors';

export function StoryToolbar() {
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;
  const dispatch = useDispatch();

  const handleTogglePreview = () => {
    // TODO: @kellie add form validation here
    dispatch(togglePreview());
  };

  const handleSave = () => {
    // TODO: @kellie add form validation here
    alert('Save Stories is not implemented');
  };

  return (
    <Sidebar>
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
    </Sidebar>
  );
}

// FIXME: @kellie get rid of this business. prob with storybuilder margin
export const STORY_TOOLBAR_WIDTH = 150;
