import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia
} from '@material-ui/core';
import React from 'react';
import { isUndefined } from 'util';
import { GraphMetaData } from '../../redux/graphs/types';
import { AuthorDate, Chips, Description, Title } from '../PreviewMetaData';
import { PLACEHOLDER_USER_PICTURE } from '../story-card/StoryCard';
import { StyleProps, usePreviewCardStyles } from '../usePreviewCardStyles';

const styleProps: StyleProps = {
  minWidth: 350,
  maxWidth: 500
};

export const PLACEHOLDER_DATE = new Date();

interface Props {
  graphMetaData: GraphMetaData;
  onClick: () => void;
}

export default function GraphCard(props: Props): JSX.Element {
  const classes = usePreviewCardStyles(styleProps);

  const getDatasetNames = () => {
    const datasetNames = props.graphMetaData.dataSources.map(
      source => source.datasetName
    );
    return Array.from(new Set(datasetNames)); // removes duplicates
  };

  const createGraphDate = (timestamp: number | undefined) => {
    if (!isUndefined(timestamp)) {
      return new Date(props.graphMetaData.timeStamp * 1000);
    } else {
      return timestamp;
    }
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
            name={props.graphMetaData.userName}
            profilePicture={PLACEHOLDER_USER_PICTURE}
            date={createGraphDate(props.graphMetaData.timeStamp)}
          />
          <Chips labels={getDatasetNames()} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
