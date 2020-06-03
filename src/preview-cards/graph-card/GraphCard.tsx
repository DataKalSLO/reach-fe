import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from '@material-ui/core';
import React from 'react';
import { GraphMetaData } from '../../redux/graphs/types';
import { AuthorDate, Description, Title } from '../PreviewMetaData';
import {
  PLACEHOLDER_AUTHOR,
  PLACEHOLDER_DATE,
  PLACEHOLDER_USER_PICTURE
} from '../story-card/StoryCard';
import { StyleProps, usePreviewCardStyles } from '../usePreviewCardStyles';

const styleProps: StyleProps = {
  minWidth: 350,
  maxWidth: 500
};

export default function GraphCard(props: GraphMetaData): JSX.Element {
  const classes = usePreviewCardStyles(styleProps);
  // TODO:
  return (
    <Card className={classes.card} variant="outlined">
      <CardActionArea
        onClick={() => console.log('clicked graph card', props.graphId)}
      >
        <CardMedia
          className={classes.media}
          image={props.snapshotUrl}
          title={props.graphTitle}
        />
        <CardContent>
          <Title text={props.graphTitle} />
          <Description
            text={
              props.graphOptions.subtitle ? props.graphOptions.subtitle : ''
            }
          />
          <AuthorDate
            name={PLACEHOLDER_AUTHOR}
            profilePicture={PLACEHOLDER_USER_PICTURE}
            date={PLACEHOLDER_DATE}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
