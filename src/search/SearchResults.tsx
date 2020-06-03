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
import GraphCard from '../preview-cards/graph-card/GraphCard';
import { Gallery } from '../reach-ui/core.js';

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
  const currentGraph: GraphMetaData = {
    graphId: item._id,
    userId: graphSource.user_id,
    timestamp: graphSource.timestamp,
    graphTitle: graphSource.title,
    snapshotUrl: graphSource.snapshot_url,
    dataSources: [],
    graphOptions: {} as any
  };

  return <GraphCard {...currentGraph} />;
}

function SearchResults(props: SearchResultProps) {
  const makeList = () => {
    return props.hits.map(item => {
      if (item._index === 'stories') {
        return convertToStoryCard(item);
      } else if (item._index === 'graphs') {
        return convertToGraphCard(item);
      } else {
        return <div />;
      }
    });
  };

  return (
    <div>
      Results for &quot;{props.qry}&quot;
      <Gallery>{makeList()}</Gallery>
    </div>
  );
}

export default SearchResults;
