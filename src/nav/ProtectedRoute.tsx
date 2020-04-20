import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { LOGIN } from './constants';
import { getUser } from '../redux/login/selectors';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

interface ProtectedRouteProps {
  routeConstant: string;
  componentPage: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const user = useSelector(getUser);
  const redirect = user.email ? (
    props.componentPage
  ) : (
    <Redirect to={{ pathname: LOGIN }} />
  );

  return <Route path={props.routeConstant}>{redirect}</Route>;
}

ProtectedRoute.propTypes = {
  routeConstant: PropTypes.element.isRequired,
  componentPage: PropTypes.element.isRequired
};

export default ProtectedRoute;
