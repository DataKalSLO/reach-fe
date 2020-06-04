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
import {
  ALL_ITEMS_ICON,
  CHARTS_ICON,
  MAPS_ICON,
  STORIES_ICON
} from '../reach-ui/icons';

const SIDEBAR_WIDTH = 190;

const drawerOptions: PersistentDrawerProps = {
  defaultTab: 'All Items',
  drawerId: MY_STUFF_SIDEBAR
};

export const ALL_ITEMS_TAB_TITLE = 'All Items';
export const CHARTS_TAB_TITLE = 'Charts';
export const MAPS_TAB_TITLE = 'Maps';
export const STORIES_TAB_TITLE = 'Stories';

export default function MyStuffSidebar() {
  const history = useHistory();
  const navigateTo = (route: string) => history.push(route);
  const options = getPersistentDrawerOptions(drawerOptions);

  return (
    <Drawer width={SIDEBAR_WIDTH}>
      <List>
        <ListItemTab
          title={ALL_ITEMS_TAB_TITLE}
          icon={ALL_ITEMS_ICON}
          onClick={() => navigateTo(MY_STUFF)}
          {...options}
        />
        <ListItemTab
          title={CHARTS_TAB_TITLE}
          icon={CHARTS_ICON}
          onClick={() => navigateTo(MY_STUFF_CHARTS)}
          {...options}
        />
        <ListItemTab
          title={MAPS_TAB_TITLE}
          icon={MAPS_ICON}
          onClick={() => navigateTo(MY_STUFF_MAPS)}
          {...options}
        />
        <ListItemTab
          title={STORIES_TAB_TITLE}
          icon={STORIES_ICON}
          onClick={() => navigateTo(MY_STUFF_STORIES)}
          {...options}
        />
      </List>
    </Drawer>
  );
}
