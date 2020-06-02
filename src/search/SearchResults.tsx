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

interface SearchResultProps {
  hits: Array<ElasticSearchResultObject>;
  qry: string;
  index: SearchIndexFilter;
  userID: string;
}

/*
 * This function filters through items according to the page (index) and userID
 * and converts it into a StoryCard.
 */
function convertToStoryCard(
  item: ElasticSearchResultObject,
  index: SearchIndexFilter,
  userID: string
) {
  console.log(userID);
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

  // We only want the published stories for explore page
  // and user's stories from mystuff page
  if (
    index === SearchIndexFilter.stories &&
    storySource.publication_status === 'PUBLISHED'
  ) {
    return <StoryCard key={item._id} story={currentStory} />;
  } else if (
    index === SearchIndexFilter.all &&
    storySource.user_id === userID
  ) {
    return <StoryCard key={item._id} story={currentStory} />;
  } else {
    return '';
  }
}

/*
 * This function filters through items according to the page (index) and userID
 * and converts it into a GraphCard. TODO: Insert Tanner's GraphCard
 */
function convertToGraphCard(
  item: ElasticSearchResultObject,
  index: SearchIndexFilter,
  userID: string
) {
  const graphSource = item._source as ElasticSearchGraphSource;
  const primaryText = `${item._source.title} by ${item._source.user_id}`;

  // If graph blocks page we want all graphs
  // If it's Mystuff page, we want only user graphs
  if (index === SearchIndexFilter.graphs) {
    return (
      <ListItem key={item._index + item._id}>
        <ListItemText primary={primaryText} secondary={item._index} />
      </ListItem>
    );
  } else if (
    index === SearchIndexFilter.all &&
    graphSource.user_id === userID
  ) {
    return (
      <ListItem key={item._index + item._id}>
        <ListItemText primary={primaryText} secondary={item._index} />
      </ListItem>
    );
  } else {
    return '';
  }
}

function SearchResults(props: SearchResultProps) {
  /*
   * Make cards and filter through items. We only want published stories
   * for the explore page, all graphs for the graph blocks, and all items
   * by user for my stuff.
   */
  const makeAndFilterList = () => {
    switch (props.index) {
      case SearchIndexFilter.graphs:
        return props.hits.map(item => {
          return convertToGraphCard(item, props.index, props.userID);
        });
      case SearchIndexFilter.stories:
        return props.hits.map(item => {
          return convertToStoryCard(item, props.index, props.userID);
        });
      default:
        return props.hits.map(item => {
          if (item._index === 'stories') {
            return convertToStoryCard(item, props.index, props.userID);
          } else {
            return convertToGraphCard(item, props.index, props.userID);
          }
        });
    }
  };

  return (
    <div>
      Results for &quot;{props.qry}&quot;
      <List> {makeAndFilterList()} </List>
    </div>
  );
}

export default SearchResults;
