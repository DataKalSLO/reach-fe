import React, { useState } from 'react';
import { Props as DrawerProps } from '../common/components/Drawer';
import { Drawer } from '../reach-ui/core';

export interface RenderProps {
  selectedRoute: string;
  id: string;
}

interface Props extends DrawerProps {
  defaultRoute: string;
  render: (props: RenderProps) => void;
  id: string;
}

const getCurrentRoute = (id: string) => localStorage.getItem(id);

const initializeRoute = (id: string, defaultRoute: string) => {
  localStorage.setItem(id, defaultRoute);
  return defaultRoute;
};

export default function DrawerNav(props: Props) {
  const [selectedRoute, setSelectedRoute] = useState(
    getCurrentRoute(props.id) || initializeRoute(props.id, props.defaultRoute)
  );

  return (
    <Drawer {...props}>
      {props.render({
        selectedRoute: selectedRoute,
        id: props.id
      })}
    </Drawer>
  );
}
