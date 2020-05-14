import * as React from 'react';
import { Redirect } from 'react-router';
import { LOGIN } from './constants';
import { getUser } from '../redux/login/selectors';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

interface ProtectedRouteProps {
  componentPage: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const user = useSelector(getUser);
  const redirect = user.email ? (
    props.componentPage
  ) : (
    <Redirect to={{ pathname: LOGIN }} />
  );

  return redirect;
}

ProtectedRoute.propTypes = {
  componentPage: PropTypes.element.isRequired
};

export default ProtectedRoute;
