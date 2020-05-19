import { Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { updateDescription, updateTitle } from '../redux/story/actions';
import { getStory } from '../redux/story/selectors';
import {
  Story,
  UpdateDescriptionAction,
  UpdateTitleAction
} from '../redux/story/types';
import { getStoryBuilder } from '../redux/storybuilder/selectors';
import SortableList from '../stories/SortableList';
import { MetaField } from './MetaField';
import { convertStoryToJSX } from './StoryConverter';

const TITLE_CHAR_LIMIT = 100;
const DESCRIPTION_CHAR_LIMIT = 150;

const metaSchema = object().shape({
  title: string()
    .required()
    .trim()
    .max(TITLE_CHAR_LIMIT),
  description: string()
    .required()
    .trim()
    .max(DESCRIPTION_CHAR_LIMIT)
});

const areValidMetaFields = (title: string, description: string) => {
  return metaSchema.isValidSync({ title: title, description: description });
};

interface Props {
  story: Story;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => UpdateTitleAction | UpdateDescriptionAction;
}

export default function StoryForm() {
  const dispatch = useDispatch();
  const story = useSelector(getStory);
  const storyBuilderState = useSelector(getStoryBuilder);
  const previewSelected = storyBuilderState.isPreviewSelected;

  const TitleField = (props: Props) => {
    return (
      <MetaField
        content={props.story.title}
        id="story-title"
        label="Title"
        maxLength={TITLE_CHAR_LIMIT}
        {...props}
      />
    );
  };

  const DescriptionField = (props: Props) => {
    return (
      <MetaField
        content={props.story.description}
        id="story-description"
        label="Description"
        maxLength={DESCRIPTION_CHAR_LIMIT}
        multiline
        {...props}
      />
    );
  };

  if (previewSelected) {
    return <div>{convertStoryToJSX(story)}</div>;
  } else {
    return (
      <div>
        <Typography variant="h3">StoryBuilder</Typography>
        <p>
          Tell us a compelling story using data. Use the toolbar on the left to
          add text blocks, graphs, images, and dataset snippets to help readers
          follow along with your findings and conclusions. Use the drag handles
          to the left of each component if you want to reorder them.
        </p>

        <TitleField
          story={story}
          onChange={event => dispatch(updateTitle(event.target.value))}
        />

        <DescriptionField
          story={story}
          onChange={event => dispatch(updateDescription(event.target.value))}
        />

        <SortableList storyBlocks={story.storyBlocks} />
      </div>
    );
  }
}

export { areValidMetaFields };
