import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as cnst from './constants';
import { useGraphHeaderStyles } from '../container/styles';
import { Share, Clear, LinkedIn, Facebook, Twitter } from '@material-ui/icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton
} from 'react-share';

/*
 * Code for drawer that opens right when "Share" button is clicked.
 */

const useStyles = makeStyles({
  list: {
    width: 250
  },
  item: {
    width: '100%'
  }
});

function GraphShareButton() {
  const classes = useGraphHeaderStyles();
  const listClass = useStyles();
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const graphUrl = 'http://github.com';
  //const graphUrl = `http://inserturlhere.com${location.pathname}`

  const handleDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<Share />}
        onClick={handleDrawerOpen}
      >
        {cnst.SHARE_LABEL}
      </Button>
      <Drawer anchor="right" open={drawerVisible} onClose={handleDrawerClose}>
        <div className={listClass.list} role="presentation">
          <List>
            <FacebookShareButton className={listClass.item} url={graphUrl}>
              <ListItem button key="fb">
                <ListItemIcon>
                  <Facebook />
                </ListItemIcon>
                <ListItemText primary="Share to Facebook" />
              </ListItem>
            </FacebookShareButton>
            <TwitterShareButton
              className={listClass.item}
              url={graphUrl}
              title="REACH Graph Demo"
              via="REACH Development Team"
            >
              <ListItem button key="twt">
                <ListItemIcon>
                  <Twitter />
                </ListItemIcon>
                <ListItemText primary="Share to Twitter" />
              </ListItem>
            </TwitterShareButton>
            <LinkedinShareButton
              className={listClass.item}
              url={graphUrl}
              title="REACH Graph Demo"
              summary="I want to share this to LinkedIn!"
            >
              <ListItem button key="lnkd">
                <ListItemIcon>
                  <LinkedIn />
                </ListItemIcon>
                <ListItemText primary="Share to LinkedIn" />
              </ListItem>
            </LinkedinShareButton>
            <ListItem button key="exit" onClick={handleDrawerClose}>
              <ListItemIcon>
                <Clear />
              </ListItemIcon>
              <ListItemText primary="Exit" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default GraphShareButton;
