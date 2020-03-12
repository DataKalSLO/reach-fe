import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  InsertChart,
  InsertPhoto,
  Map,
  Save,
  TextFields,
  Visibility
} from '@material-ui/icons';
import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmptyTextBlock } from '../redux/story/actions';
import { StoryActionType } from '../redux/story/types';
import { getStory } from '../redux/story/selectors';
import { Story } from './StoryTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      zIndex: 0, // to place drawer behind appbar
      width: STORY_TOOLBAR_WIDTH,
      paddingTop: 100 // padding to place buttons beneath app bar
    }
  })
);

export function StoryToolbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const story = useSelector(getStory);

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
      <List>
        {getAddButtonContentList().map((contents: ToolbarButtonContents) =>
          generateButton(contents, dispatch)
        )}
      </List>
      <Divider />
      <List>
        {getUtilityButtonContentList(
          story
        ).map((contents: ToolbarButtonContents) =>
          generateButton(contents, dispatch)
        )}
      </List>
    </Drawer>
  );
}

function generateButton(
  contents: ToolbarButtonContents,
  dispatch: Dispatch<StoryActionType>
) {
  const dispatchFunc = contents.onClick as () => StoryActionType;
  const func = contents.onClick;
  return (
    <ListItem
      button
      key={contents.title}
      onClick={() => (contents.useDispatch ? dispatch(dispatchFunc()) : func())}
    >
      {/* TODO: move the hard-coded color into the theme  */}
      <ListItemIcon style={{ color: '#f1b71c' }}>{contents.icon}</ListItemIcon>
      <ListItemText primary={contents.title} />
    </ListItem>
  );
}

const getAddButtonContentList = (): ToolbarButtonContents[] => [
  {
    title: 'Add Text',
    icon: <TextFields />,
    useDispatch: true,
    onClick: createEmptyTextBlock
  },
  {
    title: 'Add Graph',
    icon: <InsertChart />,
    useDispatch: false,
    onClick: () => alert('Not implemented')
  },
  {
    title: 'Add Map',
    icon: <Map />,
    useDispatch: false,
    onClick: () => alert('Not implemented')
  },
  {
    title: 'Add Image',
    icon: <InsertPhoto />,
    useDispatch: false,
    onClick: () => alert('Not implemented')
  }
];

const getUtilityButtonContentList = (story: Story): ToolbarButtonContents[] => [
  {
    title: 'Preview',
    icon: <Visibility />,
    useDispatch: false,
    onClick: () => alert('Not implemented')
  },
  {
    title: 'Save',
    icon: <Save />,
    useDispatch: false,
    onClick: () => alert(JSON.stringify(story, null, 2))
  }
];

interface ToolbarButtonContents {
  title: string;
  icon: JSX.Element;
  useDispatch: boolean; // used for placeholder funcs, flag so dispatch is not used when onClick is called
  onClick: { (): StoryActionType } | { (): void };
}

export const STORY_TOOLBAR_WIDTH = 175;