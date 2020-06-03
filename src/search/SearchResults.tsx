import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import {
  ElasticSearchResultObject,
  SearchIndexFilter,
  ElasticSearchStorySource,
  ElasticSearchGraphSource
} from '../redux/search/types';
import StoryCard from '../preview-cards/story-card/StoryCard';
import { Story, PublicationStatus } from '../redux/story/types';
import { GraphMetaData } from '../redux/graphs/types';

interface SearchResultProps {
  hits: Array<ElasticSearchResultObject>;
  qry: string;
  index: SearchIndexFilter;
  userID: string;
}

// Convert ES object to Story and put it in StoryCard
function convertToStoryCard(item: ElasticSearchResultObject) {
  const storySource = item._source as ElasticSearchStorySource;
  const currentStory: Story = {
    id: item._id,
    userID: storySource.user_id,
    title: storySource.title,
    description: storySource.description,
    publicationStatus: PublicationStatus.PUBLISHED,
    dateCreated: storySource.date_created,
    dateLastEdited: storySource.date_last_edited,
    storyBlocks: []
  };

  return <StoryCard key={item._id} story={currentStory} />;
}

// Convert ES object to graph and put it in GraphCard
function convertToGraphCard(item: ElasticSearchResultObject) {
  const graphSource = item._source as ElasticSearchGraphSource;
  const primaryText = `${item._source.title} by ${item._source.user_id}`;
  const currentGraph: GraphMetaData = {
    graphId: item._id,
    userId: graphSource.user_id,
    timestamp: graphSource.timestamp,
    graphTitle: graphSource.title,
    snapshotUrl: graphSource.snapshot_url,
    dataSources: [],
    graphOptions: {} as any
  };

  return (
    <ListItem key={item._index + item._id}>
      <ListItemText primary={primaryText} secondary={item._index} />
    </ListItem>
  );
}

function SearchResults(props: SearchResultProps) {
  const makeList = () => {
    return props.hits.map(item => {
      if (item._index === 'stories') {
        return convertToStoryCard(item);
      } else if (item._index === 'graphs') {
        return convertToGraphCard(item);
      } else {
        return '';
      }
    });
  };

  return (
    <div>
      Results for &quot;{props.qry}&quot;
      <List> {makeList()} </List>
    </div>
  );
}

export default SearchResults;
