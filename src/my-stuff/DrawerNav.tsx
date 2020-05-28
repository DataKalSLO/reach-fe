import { useState } from 'react';

export interface Props {
  defaultRoute: string;
  id: string;
  anchor?: 'right' | 'left' | undefined;
}

/*
 * Getters and setters for data stored in localStorage.
 * localStorage is used so the selection of a tab persists even after page refresh
 */
const getCurrentRoute = (id: string) => localStorage.getItem(id);
const initializeRoute = (id: string, defaultRoute: string) => {
  localStorage.setItem(id, defaultRoute);
  return defaultRoute;
};

export default function useDrawerNav(props: Props) {
  const [selectedRoute, setSelectedRoute] = useState(
    getCurrentRoute(props.id) || initializeRoute(props.id, props.defaultRoute)
  );

  return {
    selectedRoute: selectedRoute,
    id: props.id,
    anchor: props.anchor
  };
}
