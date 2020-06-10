import React, { useEffect, useState } from 'react';
import { isUndefined } from 'util';
import { getAllGraphsAndHandleResponse } from '../../api/graphs/operationHandlers';
import { getStoriesWithUserId } from '../../api/stories/operations';
import { setTab } from '../../common/components/PersistentDrawer';
import { ALL_ITEMS_TAB_TITLE } from '../../my-stuff/MyStuffSidebar';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import { ContentList } from '../../my-stuff/types';
import {
  byLastUpdated,
  instanceOfGraphMetaData,
  instanceOfStory
} from '../../my-stuff/util';
import GraphCard from '../../preview-cards/graph-card/GraphCard';
import StoryCard from '../../preview-cards/story-card/StoryCard';
import { MY_STUFF_SIDEBAR } from '../../reach-ui/constants';

export default function MyStuff() {
  const [allItems, setAllItems] = useState([] as ContentList);
  const [isLoaded, setIsLoaded] = useState(false);

  // ensures correct tab is selected in the MyStuffSidebar
  setTab(MY_STUFF_SIDEBAR, ALL_ITEMS_TAB_TITLE);

  /* retrieves the user's graphs and maps
   *
   * NOTE: the following code is hacked together
   * because there isn't a single api call to retrieve all items
   * (i.e. Stories and Graphs) sorted by date
   */
  useEffect(() => {
    if (!isLoaded)
      Promise.all([
        getAllGraphsAndHandleResponse(),
        getStoriesWithUserId()
      ]).then(([graphs, stories]) => {
        // waits for both calls to finish
        // (works when the user doesn't have graphs, but does have stories and vice verse)
        if (!isUndefined(stories) && !isUndefined(graphs)) {
          setAllItems(
            allItems
              .concat(graphs)
              .concat(stories)
              .sort(byLastUpdated)
          );
          setIsLoaded(true);
        }
      });
  }, [isLoaded]);

  const makeCards = () => {
    return allItems.map(item => {
      if (instanceOfGraphMetaData(item)) {
        return (
          <GraphCard
            key={item.graphId}
            graphMetaData={item}
            onClick={() => console.log('User clicked a graph.')}
          />
        );
      } else if (instanceOfStory(item)) {
        return (
          <StoryCard key={item.id} story={item} showAuthorActions={true} />
        );
      } else {
        throw Error('unable to render card type');
      }
    });
  };

  return (
    <MyStuffWrapper
      title="My Stuff"
      emptyStateMessage={
        "You don't have any saved graphs or stories yet. Check out the Explore page for inspiration, and then make your first ones using the VizBuilder and StoryBuilder."
      }
    >
      {makeCards()}
    </MyStuffWrapper>
  );
}
