import { InsertChart, LibraryBooks, Map, ViewModule } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PersistentDrawerProps } from '../common/components/PersistentDrawer';
import {
  MY_STUFF,
  MY_STUFF_CHARTS,
  MY_STUFF_MAPS,
  MY_STUFF_STORIES
} from '../nav/constants';
import { MY_STUFF_SIDEBAR } from '../reach-ui/constants';
import {
  Drawer,
  getPersistentDrawerOptions,
  List,
  ListItemTab
} from '../reach-ui/core';

const SIDEBAR_WIDTH = 190;

const drawerOptions: PersistentDrawerProps = {
  defaultTab: 'All Items',
  drawerId: MY_STUFF_SIDEBAR
};

export default function MyStuffSidebar() {
  const history = useHistory();
  const navigateTo = (route: string) => history.push(route);
  const options = getPersistentDrawerOptions(drawerOptions);

  return (
    <Drawer width={SIDEBAR_WIDTH}>
      <List>
        <ListItemTab
          title="All Items"
          icon={<ViewModule />}
          onClick={() => navigateTo(MY_STUFF)}
          {...options}
        />
        <ListItemTab
          title="Charts"
          icon={<InsertChart />}
          onClick={() => navigateTo(MY_STUFF_CHARTS)}
          {...options}
        />
        <ListItemTab
          title="Maps"
          icon={<Map />}
          onClick={() => navigateTo(MY_STUFF_MAPS)}
          {...options}
        />
        <ListItemTab
          title="Stories"
          icon={<LibraryBooks />}
          onClick={() => navigateTo(MY_STUFF_STORIES)}
          {...options}
        />
      </List>
    </Drawer>
  );
}
