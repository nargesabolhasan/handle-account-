import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React, { Fragment } from "react";
import { NavLink } from "react-router";
import {
  ADMIN_PANEL_ROUTE,
  BASKET_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGNIN_ROUTE,
} from "../../constant/routes";
import BadgeCompoenet from "./badge";
import { STORAGE_ADMIN_LOGIN } from "../../constant";
export default function HeaderComponent() {
  const adminIsLogin = localStorage.getItem(STORAGE_ADMIN_LOGIN)
    ? JSON.parse(localStorage.getItem(STORAGE_ADMIN_LOGIN))
    : false;

  const headerItems = [
    {
      id: 1,
      name: "Home",
      to: HOME_ROUTE,
      show: true,
    },
    {
      id: 2,
      name: "Login",
      to: LOGIN_ROUTE,
      show: !adminIsLogin,
    },
    {
      id: 3,
      name: "admin panel",
      to: ADMIN_PANEL_ROUTE,
      show: adminIsLogin,
    },
    {
      id: 4,
      name: "Sign",
      to: SIGNIN_ROUTE,
      show: true,
    },
    {
      id: 5,
      name: <BadgeCompoenet />,
      to: BASKET_ROUTE,
      show: true,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, width: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex justify-between items-between w-full">
          {headerItems.map((item) => (
            <Fragment key={item.id}>
              {item.show && (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "bg-sky-300 rounded-full p-1 text-gray-600" : ""
                  }
                >
                  {item.name}
                </NavLink>
              )}
            </Fragment>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
