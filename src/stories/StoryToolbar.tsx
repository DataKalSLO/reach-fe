import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
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
import { getStory } from '../redux/story/selectors';
import { Story, StoryActionType } from '../redux/story/types';
import { togglePreview } from '../redux/storybuilder/actions';
import { saveStory } from './StoryAPIConnector';

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
      <Typography variant="subtitle1" align="center">
        <b>Add Block</b>
      </Typography>
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
      <ListItemIcon>{contents.icon}</ListItemIcon>
      <ListItemText primary={contents.title} />
    </ListItem>
  );
}

const getAddButtonContentList = (): ToolbarButtonContents[] => [
  {
    title: 'Text',
    icon: <TextFields />,
    useDispatch: true,
    onClick: createEmptyTextBlock
  },
  {
    title: 'Graph',
    icon: <InsertChart />,
    useDispatch: false,
    onClick: () => alert('Not implemented')
  },
  {
    title: 'Map',
    icon: <Map />,
    useDispatch: false,
    onClick: () => alert('Not implemented')
  },
  {
    title: 'Image',
    icon: <InsertPhoto />,
    useDispatch: false,
    onClick: () => alert('Not implemented')
  }
];

const getUtilityButtonContentList = (story: Story): ToolbarButtonContents[] => [
  // TODO: if you're in preview mode, show an edit button instead
  {
    title: 'Preview',
    icon: <Visibility />,
    useDispatch: true,
    onClick: togglePreview
  },
  {
    title: 'Save',
    icon: <Save />,
    useDispatch: false,
    onClick: () => saveStoryButtonAction(story)
  }
];

interface ToolbarButtonContents {
  title: string;
  icon: JSX.Element;
  useDispatch: boolean; // used for placeholder funcs, flag so dispatch is not used when onClick is called
  onClick: { (): StoryActionType } | { (): void };
}

async function saveStoryButtonAction(story: Story) {
  alert(JSON.stringify(story, null, 2));
  story.userID = 'test1@test.com'; //Existing user in database

  await saveStory(story)
    .then(res => {
      console.log('Story Created');
    })
    .catch(e => console.log('Error: ' + e));
}

export const STORY_TOOLBAR_WIDTH = 150;
