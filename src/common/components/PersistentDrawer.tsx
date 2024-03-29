import React from 'react';
import ListItemButton from './ListItemButton';

/*
 * ListItemTab and getPersistentDrawerOptions should be used at the same time.
 * Together they enable tabs like the G-mail sidebar, with the added benefit of persistence.
 *   (Essentially even if the optional onClick function navigates to another page the
 *   currently selected tab won't be forgotten.)
 *
 * usage: see MyStuffSidebar example
 */

// ListItemTab

const LEFT_CORNERS_ROUNDED = '20px 0px 0px 20px';
const RIGHT_CORNERS_ROUNDED = '0px 20px 20px 0px';

interface ListItemTabProps extends PersistentDrawerOptions {
  title: string;
  icon: JSX.Element;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function ListItemTab(props: ListItemTabProps) {
  const handleListItemClick = () => {
    localStorage.setItem(props.drawerId, props.title);
    if (props.onClick !== null) props.onClick();
  };

  // non-standard props filtered out so otherProps can be passed Material UI Drawer component
  const { drawerId, selectedTab, ...otherProps } = props;

  return (
    <ListItemButton
      {...otherProps}
      text={props.title}
      icon={props.icon}
      selected={props.selectedTab === props.title}
      onClick={handleListItemClick}
      style={
        // positions the rounded border radius on the left of right side of the button
        // depending where the drawer is anchored
        props.anchor === undefined || props.anchor === 'left'
          ? { borderRadius: RIGHT_CORNERS_ROUNDED }
          : { borderRadius: LEFT_CORNERS_ROUNDED }
      }
    />
  );
}

/* getPersistentDrawerOptions
 * enables ListItemTab to remain persistently selected.
 * pass the returned PersistentDrawerOptions object as props to the ListItemTab component
 */

export interface PersistentDrawerProps {
  /* drawerId must be unique, it's the key used to lookup the currently selected tab
   * usage: drawerIds should be defined in `reach-ui/constants`
   */
  drawerId: string;
  defaultTab: string;
}

export interface PersistentDrawerOptions
  extends Pick<PersistentDrawerProps, 'drawerId'> {
  selectedTab: string;
}

/* why localStorage:
 *   - selection of a tab persists even after page refresh (not possible with hooks)
 *   - doesn't require the developer to setup Redux
 */
export const getCurrentTab = (drawerId: string) =>
  localStorage.getItem(drawerId);
export const setTab = (drawerId: string, tab: string) => {
  localStorage.setItem(drawerId, tab);
  return tab;
};

export function getPersistentDrawerOptions(
  props: PersistentDrawerProps
): PersistentDrawerOptions {
  // retrieves the current tab from localStorage or sets up the default tab
  const selectedTab =
    getCurrentTab(props.drawerId) || setTab(props.drawerId, props.defaultTab);

  return {
    selectedTab: selectedTab,
    drawerId: props.drawerId
  };
}
