import { InsertChart, LibraryBooks, Map, ViewModule } from '@material-ui/icons';
import React from 'react';
import {
  MY_STUFF,
  MY_STUFF_CHARTS,
  MY_STUFF_MAPS,
  MY_STUFF_STORIES
} from '../nav/constants';
import { List } from '../reach-ui/core';
import DrawerNav, { RenderProps } from './DrawerNav';
import DrawerNavButton from './DrawerNavButton';

const SIDEBAR_WIDTH = 190;

export default function MyStuffSidebar() {
  return (
    <DrawerNav
      id={'MyStuffSidebar'}
      width={SIDEBAR_WIDTH}
      isCollapsible={true}
      defaultRoute={MY_STUFF}
      render={(props: RenderProps) => (
        <List>
          <DrawerNavButton
            autoFocus
            title="All Items"
            icon={<ViewModule />}
            route={MY_STUFF}
            {...props}
          />
          <DrawerNavButton
            title="Charts"
            icon={<InsertChart />}
            route={MY_STUFF_CHARTS}
            {...props}
          />
          <DrawerNavButton
            title="Maps"
            icon={<Map />}
            route={MY_STUFF_MAPS}
            {...props}
          />
          <DrawerNavButton
            title="Stories"
            icon={<LibraryBooks />}
            route={MY_STUFF_STORIES}
            {...props}
          />
        </List>
      )}
    />
  );
}
