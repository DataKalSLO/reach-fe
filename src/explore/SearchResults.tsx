import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BarChartIcon from '@material-ui/icons/BarChart';
import { StyledExploreHeader } from './ExploreLanding';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles({
  a: {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
});

function SearchResults(props: SearchResultProps) {
  const classes = useStyles();

  const makeList = () => {
    console.log(props.hits);
    return props.hits.map(item => {
      return (
        <ListItem key={item._index + item._id}>
          <ListItemAvatar>
            <Avatar>
              {item._index === 'stories' ? <MenuBookIcon /> : <BarChartIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link to={'pmGraph/' + item._id} className={classes.a}>
                {item._source.title}
              </Link>
            }
            secondary={item._index}
          />
        </ListItem>
      );
    });
  };

  return (
    <div>
      <StyledExploreHeader variant="h5">
        Results for &quot;{props.qry}&quot;
      </StyledExploreHeader>
      <List> {makeList()} </List>
    </div>
  );
}

export default SearchResults;
