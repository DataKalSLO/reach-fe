import * as React from 'react';
import { Redirect } from 'react-router';
import { HOME, ADMIN_USER } from './constants';
import { getUser } from '../redux/login/selectors';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

interface ProtectedRouteProps {
  componentPage: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const user = useSelector(getUser);
  const redirect =
    user.role === ADMIN_USER ? (
      props.componentPage
    ) : (
      <Redirect to={{ pathname: HOME }} />
    );

  return redirect;
}

ProtectedRoute.propTypes = {
  componentPage: PropTypes.element.isRequired
};

export default ProtectedRoute;
