import React from 'react';
import { useHistory } from 'react-router-dom';
import { PersistentDrawerProps } from '../common/components/PersistentDrawer';
import { ADMIN_REVIEW_STORIES, ADMIN_UPLOAD_DATA } from '../nav/constants';
import { ADMIN_SIDEBAR } from '../reach-ui/constants';
import {
  Drawer,
  getPersistentDrawerOptions,
  List,
  ListItemTab
} from '../reach-ui/core';
import { DATA_ICON, STORIES_ICON } from '../reach-ui/icons';

const SIDEBAR_WIDTH = 190;

const drawerOptions: PersistentDrawerProps = {
  defaultTab: 'Data Upload',
  drawerId: ADMIN_SIDEBAR
};

export const UPLOAD_DATA_TAB_TITLE = 'Upload Data';
export const REVIEW_STORIES_TAB_TITLE = 'Review Stories';

export default function AdminSidebar() {
  const history = useHistory();
  const navigateTo = (route: string) => history.push(route);
  const options = getPersistentDrawerOptions(drawerOptions);

  return (
    <Drawer width={SIDEBAR_WIDTH}>
      <List>
        <ListItemTab
          title={UPLOAD_DATA_TAB_TITLE}
          icon={DATA_ICON}
          onClick={() => navigateTo(ADMIN_UPLOAD_DATA)}
          {...options}
        />
        <ListItemTab
          title={REVIEW_STORIES_TAB_TITLE}
          icon={STORIES_ICON}
          onClick={() => navigateTo(ADMIN_REVIEW_STORIES)}
          {...options}
        />
      </List>
    </Drawer>
  );
}
