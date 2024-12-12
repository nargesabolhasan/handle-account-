import React from "react";
import { Navigate } from "react-router";
import { STORAGE_ADMIN_LOGIN } from "../../constant";
import { LOGIN_ROUTE } from "../../constant/routes";

const withPrivateRoute = (WrappedComponent) => {
  const adminIsLogin = localStorage.getItem(STORAGE_ADMIN_LOGIN)
    ? JSON.parse(localStorage.getItem(STORAGE_ADMIN_LOGIN))
    : false;

  return adminIsLogin ? (
    <WrappedComponent />
  ) : (
    <Navigate to={LOGIN_ROUTE} replace />
  );
};

export default withPrivateRoute;
