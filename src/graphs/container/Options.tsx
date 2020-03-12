import React, { Fragment } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { useOptionsStyles } from './styles';
import { addGraphsForInitiativeAction } from '../../redux/graphs/actions';
import { uuid } from 'uuidv4';
import Drawer from '@material-ui/core/Drawer';
import Popover from '@material-ui/core/Popover';
import * as cnst from '../../redux/graphs/constants';
import { INITIATIVE_DESC } from './constants';
import {
  Close,
  HouseOutlined,
  PeopleAltOutlined,
  EmojiTransportation,
  BusinessCenterOutlined,
  SchoolOutlined,
  ArrowUpward
} from '@material-ui/icons';
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography
} from '@material-ui/core';
import { getGraphs } from '../../redux/graphs/selector';

function Options() {
  const dispatch = useDispatch();
  const stat = useSelector(getGraphs);
  const classes = useOptionsStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const popoverIsOpen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const initiaveList = [
    [cnst.INDUSTRY, <EmojiTransportation key={uuid()} fontSize={'large'} />],
    [cnst.DEMOGRAPHICS, <PeopleAltOutlined key={uuid()} fontSize={'large'} />],
    [cnst.ASSETS, <BusinessCenterOutlined key={uuid()} fontSize={'large'} />],
    [cnst.EDUCATION, <SchoolOutlined key={uuid()} fontSize={'large'} />],
    [cnst.HOUSING, <HouseOutlined key={uuid()} fontSize={'large'} />]
  ];

  const initiatives = () => {
    console.log(stat);
    return initiaveList.map((initiative, index) => {
      return (
        <BottomNavigationAction
          key={index}
          className={classes.icon}
          label={initiative[0]}
          icon={initiative[1]}
          onClick={() =>
            dispatch(addGraphsForInitiativeAction(initiative[0] as string))
          }
        />
      );
    });
  };

  return (
    <Fragment>
      <IconButton
        area-describeby={id}
        onClick={handleDrawerOpen}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <ArrowUpward fontSize={'large'} />
      </IconButton>
      <Popover
        className={classes.popover}
        id={id}
        open={popoverIsOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Typography className={classes.typography}>
          {INITIATIVE_DESC}
        </Typography>
      </Popover>
      <Drawer
        className={classes.drawer}
        anchor="bottom"
        variant="persistent"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <BottomNavigation showLabels className={classes.nav}>
          <BottomNavigationAction
            onClick={handleDrawerClose}
            label="Exit"
            icon={<Close fontSize={'large'} />}
            style={{ color: 'red' }}
          />
          {initiatives()}
        </BottomNavigation>
      </Drawer>
    </Fragment>
  );
}

export default Options;
