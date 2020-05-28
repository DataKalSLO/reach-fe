import React from 'react';
import { useHistory } from 'react-router-dom';
import { ListItemButton } from '../reach-ui/core';

interface Props {
  title: string;
  icon: JSX.Element;
  route: string;
  selectedRoute: string;
  id: string;
  anchor?: 'left' | 'right';
  // This extra parameter is necessary to allow other props to be passed through
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function ListItemTab(props: Props) {
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
      onClick={handleListItemClick}
      style={
        props.anchor === undefined || props.anchor === 'left'
          ? { borderRadius: '0px 20px 20px 0px' }
          : { borderRadius: '20px 0px 0px 20px' }
      }
    />
  );
}
