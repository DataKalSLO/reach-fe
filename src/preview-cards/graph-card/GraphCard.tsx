import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from '@material-ui/core';
import React from 'react';
import { GraphMetaData } from '../../redux/graphs/types';
import { AuthorDate, Chips, Description, Title } from '../PreviewMetaData';
import { PLACEHOLDER_USER_PICTURE } from '../story-card/StoryCard';
import { StyleProps, usePreviewCardStyles } from '../usePreviewCardStyles';

const styleProps: StyleProps = {
  minWidth: 350,
  maxWidth: 500
};

interface Props {
  graphMetaData: GraphMetaData;
  onClick: any;
}

export default function GraphCard(props: Props): JSX.Element {
  const classes = usePreviewCardStyles(styleProps);

  const getDatasetNames = () => {
    const datasetNames = props.graphMetaData.dataSources.map(
      source => source.datasetName
    );
    return Array.from(new Set(datasetNames)); // removes duplicates
  };

  return (
    <Card className={classes.card} variant="outlined">
      <CardActionArea onClick={props.onClick}>
        <CardMedia
          className={classes.media}
          image={props.graphMetaData.snapshotUrl}
          title={props.graphMetaData.graphTitle}
        />
        <CardContent>
          <Title text={props.graphMetaData.graphTitle} />
          <Description
            text={
              props.graphMetaData.graphOptions.subtitle
                ? props.graphMetaData.graphOptions.subtitle
                : ''
            }
          />
          <AuthorDate
            name={props.userName}
            profilePicture={PLACEHOLDER_USER_PICTURE}
            date={new Date(props.timeStamp * 1000).toString()}
          />
          <Chips labels={getDatasetNames()} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
