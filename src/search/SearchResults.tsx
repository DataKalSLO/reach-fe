import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { ElasticSearchResultObject } from '../redux/search/types';

interface SearchResultProps {
  hits: Array<ElasticSearchResultObject>;
  qry: string;
}

// Starter file: will be modified for use in graph blocks
function SearchResults(props: SearchResultProps) {
  const makeList = () => {
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
