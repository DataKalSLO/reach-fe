import React, { Fragment } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { useOptionsStyles } from './styles';
import Popover from '@material-ui/core/Popover';
import {
  Close,
  HouseOutlined,
  PeopleAltOutlined,
  AttachMoneyOutlined,
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
import {
  INDUSTRY,
  HOUSING,
  INITIATIVE_DESC,
  DEMOGRAPHICS,
  ASSETS,
  EDUCATION
} from './constants';
import { OptionsProp } from '../../containers/VizBuilder';

function Options({ onClickHandle }: OptionsProp) {
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
    [INDUSTRY, <EmojiTransportation key={'1'} fontSize={'large'} />],
    [DEMOGRAPHICS, <PeopleAltOutlined key={'2'} fontSize={'large'} />],
    [ASSETS, <BusinessCenterOutlined key={'3'} fontSize={'large'} />],
    [EDUCATION, <SchoolOutlined key={'3'} fontSize={'large'} />],
    [HOUSING, <HouseOutlined key={'4'} fontSize={'large'} />]
  ];

  const initiatives = () => {
    return initiaveList.map((initiative, index) => {
      let graphOptions: any = [];
      switch (initiative[0]) {
        case INDUSTRY:
          graphOptions = [
            require('../predefined-graphs/DoD2018.json'),
            require('../predefined-graphs/DoDDrilldown2018.json'),
            require('../predefined-graphs/StateOfBusinesses2016.json')
          ];
          break;
        case DEMOGRAPHICS:
          graphOptions = [
            require('../predefined-graphs/MedianHousehold.json'),
            require('../predefined-graphs/NetMigration.json'),
            require('../predefined-graphs/IncomeInequality.json'),
            require('../predefined-graphs/RealMeanWages.json')
          ];
          break;
        case ASSETS:
          graphOptions = [
            require('../predefined-graphs/MilesTraveled.json'),
            require('../predefined-graphs/Airports.json')
          ];
          break;

        case EDUCATION:
          graphOptions = [
            require('../predefined-graphs/PercentHighschool.json'),
            require('../predefined-graphs/CollegeGraduate.json')
          ];
          break;

        case HOUSING:
          graphOptions = [
            require('../predefined-graphs/MediaListPrice.json'),
            require('../predefined-graphs/MedianSalePrice.json')
          ];
          break;
      }
      console.log(graphOptions);
      return (
        <BottomNavigationAction
          key={index}
          label={initiative[0]}
          icon={initiative[1]}
          onClick={(function(graphOptions) {
            return function() {
              onClickHandle(graphOptions);
            };
          })(graphOptions)}
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
          />
          {initiatives()}
        </BottomNavigation>
      </Drawer>
    </Fragment>
  );
}

export default Options;
