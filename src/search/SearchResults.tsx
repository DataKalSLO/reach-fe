import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect } from 'react';
import { ElasticSearchResultObject } from '../redux/search/types';
import { getStoryWithStoryID } from '../api/stories/operations';
import { getGraphById } from '../api/graphs/operations';
import { Story } from '../redux/story/types';
import { GraphMetaData } from '../redux/graphs/types';

interface SearchResultProps {
  hits: Array<ElasticSearchResultObject>;
  qry: string;
}

// TODO: union type for GraphMetaData | Story?
function SearchResults(props: SearchResultProps) {
  const [cards, setCards] = React.useState([] as any);

  // TODO: 400 errors? Is there a specific endpoint for public graphs/stories?
  useEffect(() => {
    console.log(props.hits);
    props.hits.map(item => {
      if (item._index === 'graphs') {
        getGraphById(item._id)
          .then((data: GraphMetaData) => {
            console.log(data);
            setCards((prevArray: any) => [...prevArray, data]);
          })
          .catch(err => {
            console.log('Do something about error');
          });
      } else {
        getStoryWithStoryID(item._id)
          .then((data: Story) => {
            console.log(data);
            setCards((prevArray: any) => [...prevArray, data]);
          })
          .catch(err => {
            console.log('Do something about error');
          });
      }
    });
  }, [props.hits]);

  // TODO: instead of ListItem, use StoryCard/GraphCard
  const makeList = () => {
    console.log(cards);
    return props.hits.map(item => {
      return (
        <ListItem key={item._index + item._id}>
          <ListItemText primary={item._source.title} secondary={item._index} />
        </ListItem>
      );
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
