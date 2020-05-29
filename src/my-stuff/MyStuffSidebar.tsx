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
import {
  Drawer,
  getPersistentDrawerOptions,
  List,
  ListItemButton,
  ListItemTab
} from '../reach-ui/core';

const SIDEBAR_WIDTH = 190;

const drawerOptions: PersistentDrawerProps = {
  defaultTab: 'All Items',
  drawerId: 'MyStuffSidebar'
};

const drawerOptions2: PersistentDrawerProps = {
  defaultTab: 'Maps',
  drawerId: 'Right'
};

export default function MyStuffSidebar() {
  const history = useHistory();
  const navigateTo = (route: string) => history.push(route);

  const options = getPersistentDrawerOptions(drawerOptions);
  const options2 = getPersistentDrawerOptions(drawerOptions2);

  return (
    <>
      <Drawer width={SIDEBAR_WIDTH} isCollapsible={true}>
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
      <Drawer width={SIDEBAR_WIDTH} isCollapsible={true} anchor={'right'}>
        <List>
          <ListItemTab
            title="All Items"
            icon={<ViewModule />}
            onClick={() => navigateTo(MY_STUFF)}
            {...options2}
          />
          <ListItemTab
            title="Charts"
            icon={<InsertChart />}
            onClick={() => navigateTo(MY_STUFF_CHARTS)}
            {...options2}
          />
          <ListItemTab
            title="Maps"
            icon={<Map />}
            onClick={() => navigateTo(MY_STUFF_MAPS)}
            {...options2}
          />
          <ListItemTab
            title="Stories"
            icon={<LibraryBooks />}
            onClick={() => navigateTo(MY_STUFF_STORIES)}
            {...options2}
          />
          <ListItemButton text="yeee" icon={<LibraryBooks />} />
        </List>
      </Drawer>
    </>
  );
}
