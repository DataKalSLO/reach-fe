import React from 'react';
import { useGraphCreateFormStyles } from '../container/styles';
import { Box, List, ListItem, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

/**
 * Contains the components for the "Add New Graph" Form.
 */

function GraphCreateForm() {
  const classes = useGraphCreateFormStyles();

  return (
    <Box className={classes.root}>
      <List className={classes.list}>
        <ListItem className={classes.item}>
          <Button
            className={classes.button}
            endIcon={<Add />}
            color="primary"
            size={'large'}
          >
            Add New Series
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}

export default GraphCreateForm;
