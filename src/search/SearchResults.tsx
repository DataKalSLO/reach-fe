import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

export type SourceObject = {
  title: string;
};

export type ResultObject = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: SourceObject;
};

export type SearchResultProps = {
  hits: Array<ResultObject>;
  qry: string;
};

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
