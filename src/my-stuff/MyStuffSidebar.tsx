import { InsertChart, LibraryBooks, Map, ViewModule } from '@material-ui/icons';
import React from 'react';
import Drawer from '../common/components/Drawer';
import {
  MY_STUFF,
  MY_STUFF_CHARTS,
  MY_STUFF_MAPS,
  MY_STUFF_STORIES
} from '../nav/constants';
import { List, ListItemButton } from '../reach-ui/core';
import useDrawerNav, { Props as DrawerNavProps } from './DrawerNav';
import ListItemTab from './DrawerNavButton';

const SIDEBAR_WIDTH = 190;

const drawerOptions = {
  defaultRoute: MY_STUFF,
  id: 'MyStuffSidebar'
};

const drawerOptions2: DrawerNavProps = {
  defaultRoute: MY_STUFF_MAPS,
  id: 'Right',
  anchor: 'right'
};

export default function MyStuffSidebar() {
  const navButtonProps = useDrawerNav(drawerOptions);
  const navButtonProps2 = useDrawerNav(drawerOptions2);

  return (
    <>
      <Drawer width={SIDEBAR_WIDTH} isCollapsible={true}>
        <List>
          <ListItemTab
            autoFocus
            title="All Items"
            icon={<ViewModule />}
            route={MY_STUFF}
            {...navButtonProps}
          />
          <ListItemTab
            title="Charts"
            icon={<InsertChart />}
            route={MY_STUFF_CHARTS}
            {...navButtonProps}
          />
          <ListItemTab
            title="Maps"
            icon={<Map />}
            route={MY_STUFF_MAPS}
            {...navButtonProps}
          />
          <ListItemTab
            title="Stories"
            icon={<LibraryBooks />}
            route={MY_STUFF_STORIES}
            {...navButtonProps}
          />
        </List>
      </Drawer>
      <Drawer width={SIDEBAR_WIDTH} isCollapsible={true} anchor={'right'}>
        <List>
          <ListItemTab
            autoFocus
            title="All Items"
            icon={<ViewModule />}
            route={MY_STUFF}
            {...navButtonProps2}
          />
          <ListItemTab
            title="Charts"
            icon={<InsertChart />}
            route={MY_STUFF_CHARTS}
            {...navButtonProps2}
          />
          <ListItemTab
            title="Maps"
            icon={<Map />}
            route={MY_STUFF_MAPS}
            {...navButtonProps2}
          />
          <ListItemTab
            title="Stories"
            icon={<LibraryBooks />}
            route={MY_STUFF_STORIES}
            {...navButtonProps2}
          />
          <ListItemButton text="yeee" icon={<LibraryBooks />} />
        </List>
      </Drawer>
    </>
  );
}
