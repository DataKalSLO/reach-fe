import React from 'react';
import { useHistory } from 'react-router-dom';
import { ListItemButton } from '../reach-ui/core';
import { RenderProps } from './DrawerNav';

interface Props extends RenderProps {
  title: string;
  icon: JSX.Element;
  route: string;
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function DrawerNavButton(props: Props) {
  const history = useHistory();
  const navigateTo = (route: string) => history.push(route);

  const handleListItemClick = () => {
    localStorage.setItem(props.id, props.route);
    navigateTo(props.route);
  };

  return (
    <ListItemButton
      text={props.title}
      icon={props.icon}
      selected={props.selectedRoute === props.route}
      onClick={() => handleListItemClick()}
    />
  );
}
