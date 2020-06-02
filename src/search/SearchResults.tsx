import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { ElasticSearchResultObject } from '../redux/search/types';

interface SearchResultProps {
  hits: Array<ElasticSearchResultObject>;
  qry: string;
}

// Starter file: will be modified for use in graph blocks
function SearchResults(props: SearchResultProps) {
  const makeList = () => {
    return props.hits.map(item => {
      const primaryText = `${item._source.title} by ${item._source.user_id}`;
      return (
        <ListItem key={item._index + item._id}>
          <ListItemText primary={primaryText} secondary={item._index} />
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
