import React from 'react';
import { ListItemButton } from '../reach-ui/core';

interface ListItemTabProps {
  title: string;
  icon: JSX.Element;
  selectedTab: string;
  id: string;
  onClick: any;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function ListItemTab(props: ListItemTabProps) {
  const handleListItemClick = () => {
    localStorage.setItem(props.id, props.title);
    props.onClick();
  };

  return (
    <ListItemButton
      text={props.title}
      icon={props.icon}
      selected={props.selectedTab === props.title}
      onClick={handleListItemClick}
      style={
        // positions the rounded border radius on the left of right side of the button
        // depending where the drawer is anchored
        props.anchor === undefined || props.anchor === 'left'
          ? { borderRadius: '0px 20px 20px 0px' }
          : { borderRadius: '20px 0px 0px 20px' }
      }
    />
  );
}

export interface PersistentDrawerProps {
  defaultTab: string;
  drawerId: string; // every drawer must have a unique id, because it's the key to lookup the currently selected tab
  anchor?: 'left' | 'right'; // convenience prop so you don't need to manually pass anchor to every ListItemTab
}

/* This function is designed to return an options object that should to be passed
 * to `ListItemTab` inside a `Drawer`. It enables the `ListItemTab` to check
 * whether it is the currently selected tab.
 */
export function getPersistentDrawerOptions(props: PersistentDrawerProps) {
  /*
   * Getters and setters for data stored in localStorage.
   * localStorage is necessary so the selection of a tab persists even after page refresh
   */
  const getCurrentTab = () => localStorage.getItem(props.drawerId);
  const setDefaultTab = () => {
    localStorage.setItem(props.drawerId, props.defaultTab);
    return props.defaultTab;
  };

  // Retrieves the current tab from localStorage or sets up the default tab
  const selectedTab = getCurrentTab() || setDefaultTab();

  return {
    selectedTab: selectedTab,
    id: props.drawerId
  };
}
