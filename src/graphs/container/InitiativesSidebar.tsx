import { Divider, List } from '@material-ui/core';
import React, { Dispatch, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import {
  getPersistentDrawerOptions,
  PersistentDrawerProps,
  setTab
} from '../../common/components/PersistentDrawer';
import { INITIATIVES_SIDEBAR } from '../../reach-ui/constants';
import { Drawer, ListItemTab } from '../../reach-ui/core';
import {
  ASSETS_ICON,
  DEMOGRAPHICS_ICON,
  EDIT_ICON,
  EDUCATION_ICON,
  GRAPHS_ICON,
  HEALTH_ICON,
  HOUSING_ICON,
  INDUSTRY_ICON
} from '../../reach-ui/icons';
import {
  getAllUserGraphs,
  getDefaultGraphs,
  toggleCreateGraph
} from '../../redux/graphbuilder/actions';
import {
  ASSETS,
  DEMOGRAPHICS,
  EDUCATION,
  HEALTH,
  HOUSING,
  INDUSTRY
} from '../../redux/graphs/constants';
import { getUser } from '../../redux/login/selectors';
import { CREATE_GRAPH_LABEL, MY_GRAPHS_LABEL } from './constants';

/*
 * The sidebar that displays a tab for each initiative.
 * Clicking on an initiative will replace any existing graphs
 * with the set of graphs corresponding to the chosen initiative.
 */

export const sidebarWidth = 75;
const sidebarAnchor = 'right';

const drawerOptions: PersistentDrawerProps = {
  defaultTab: HEALTH,
  drawerId: INITIATIVES_SIDEBAR
};

interface DefaultInitiativeTabProps {
  title: string;
  icon: JSX.Element;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface InitiativeTabProps extends DefaultInitiativeTabProps {
  onClick: (() => void) | ((dispatch: Dispatch<AnyAction>) => Promise<void>);
}

export default function InitiativesSidebar() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const options = getPersistentDrawerOptions(drawerOptions);

  const InitiativeTab = (props: InitiativeTabProps) => {
    return (
      <ListItemTab
        title={props.title}
        icon={props.icon}
        anchor={sidebarAnchor}
        {...options}
        {...props}
      />
    );
  };

  const DefaultInitiativeTab = (props: DefaultInitiativeTabProps) => {
    const handleClick = () => {
      dispatch(getDefaultGraphs(props.title));
      setTab(options.drawerId, props.title);
    };

    return <InitiativeTab onClick={handleClick} {...props} />;
  };

  const MyGraphsTab = () => {
    if (user.email !== '') {
      return (
        <InitiativeTab
          title={MY_GRAPHS_LABEL}
          icon={GRAPHS_ICON}
          onClick={() => dispatch(getAllUserGraphs())}
        />
      );
    } else {
      return <Fragment />;
    }
  };

  return (
    <Drawer width={sidebarWidth} anchor={sidebarAnchor}>
      <List>
        <DefaultInitiativeTab title={INDUSTRY} icon={INDUSTRY_ICON} />
        <DefaultInitiativeTab title={DEMOGRAPHICS} icon={DEMOGRAPHICS_ICON} />
        <DefaultInitiativeTab title={ASSETS} icon={ASSETS_ICON} />
        <DefaultInitiativeTab title={EDUCATION} icon={EDUCATION_ICON} />
        <DefaultInitiativeTab title={HOUSING} icon={HOUSING_ICON} />
        <DefaultInitiativeTab title={HEALTH} icon={HEALTH_ICON} />
      </List>
      <Divider />
      <List>
        <InitiativeTab
          title={CREATE_GRAPH_LABEL}
          icon={EDIT_ICON}
          onClick={() => dispatch(toggleCreateGraph())}
        />
        <MyGraphsTab />
      </List>
    </Drawer>
  );
}
