import { InsertChart, LibraryBooks, Map, ViewModule } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Drawer from '../common/components/Drawer';
import {
  MY_STUFF,
  MY_STUFF_CHARTS,
  MY_STUFF_MAPS,
  MY_STUFF_STORIES
} from '../nav/constants';
import { List, ListItemButton } from '../reach-ui/core';

export enum SidebarListOrder {
  all = 0,
  charts,
  maps,
  stories
}

interface SidebarButtonProps {
  title: string;
  icon: JSX.Element;
  index: number;
  route: string;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const SIDEBAR_WIDTH = 190;

// selection functionality copied from https://material-ui.com/components/lists/#selected-listitem

export default function MyStuffSidebar(props: { selectedIndex: number }) {
  const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);
  const history = useHistory();
  const navigateTo = (route: string) => history.push(route);

  const handleListItemClick = (index: number, route: string) => {
    navigateTo(route);
    setSelectedIndex(index);
  };

  const SidebarButton = (props: SidebarButtonProps) => {
    return (
      <ListItemButton
        text={props.title}
        icon={props.icon}
        selected={selectedIndex === props.index}
        onClick={() => handleListItemClick(props.index, props.route)}
      />
    );
  };

  return (
    <Drawer width={SIDEBAR_WIDTH} isCollapsible={true}>
      <List>
        <SidebarButton
          autoFocus
          title="All Items"
          icon={<ViewModule />}
          index={SidebarListOrder.all}
          route={MY_STUFF}
        />
        <SidebarButton
          title="Charts"
          icon={<InsertChart />}
          index={SidebarListOrder.charts}
          route={MY_STUFF_CHARTS}
        />
        <SidebarButton
          title="Maps"
          icon={<Map />}
          index={SidebarListOrder.maps}
          route={MY_STUFF_MAPS}
        />
        <SidebarButton
          title="Stories"
          icon={<LibraryBooks />}
          index={SidebarListOrder.stories}
          route={MY_STUFF_STORIES}
        />
      </List>
    </Drawer>
  );
}
