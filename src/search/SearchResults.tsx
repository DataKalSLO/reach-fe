import React from 'react';
import GraphCard from '../preview-cards/graph-card/GraphCard';
import StoryCard from '../preview-cards/story-card/StoryCard';
import { Gallery } from '../reach-ui/core.js';
import { GraphMetaData } from '../redux/graphs/types';
import {
  ElasticSearchGraphSource,
  ElasticSearchResultObject,
  ElasticSearchStorySource,
  SearchIndexFilter
} from '../redux/search/types';
import { PublicationStatus, Story } from '../redux/story/types';

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
    userName: storySource.user_name,
    userId: storySource.user_id,
    title: storySource.title,
    description: storySource.description,
    publicationStatus: PublicationStatus.PUBLISHED,
    dateCreated: new Date(storySource.date_created),
    dateLastEdited: new Date(storySource.date_last_edited),
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
    userName: graphSource.user_name,
    timeStamp: graphSource.timestamp,
    graphTitle: graphSource.title,
    snapshotUrl: graphSource.snapshot_url,
    dataSources: [],
    graphOptions: {} as any
  };

  return (
    <GraphCard
      onClick={() => console.log('Graph selected')}
      graphMetaData={currentGraph}
    />
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
        return <div />;
      }
    });
  };

  return (
    <div>
      Results for &quot;{props.qry}&quot;
      <Gallery emptyStateMessage="Nothing matched your query.">
        {makeList()}
      </Gallery>
    </div>
  );
}

export default SearchResults;
