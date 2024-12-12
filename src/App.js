import { Container } from "@mui/material";
import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import HeaderComponent from "./components/header";
import { STORAGE_ADMIN_LOGIN } from "./constant";
import {
  ADMIN_PANEL_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  HOME_ROUTE,
  INFO_ROUTE,
  LOGIN_ROUTE,
  SIGNIN_ROUTE,
} from "./constant/routes";
import Admin from "./pages/admin";
import AdminPanel from "./pages/adminPanel";
import Basket from "./pages/basket";
import Home from "./pages/home";
import Information from "./pages/information";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import SignIn from "./pages/signIn";

function App() {
  const location = useLocation();
  const isLoginSignin =
    location.pathname.includes(LOGIN_ROUTE) ||
    location.pathname.includes(SIGNIN_ROUTE);
  const adminIsLogin = localStorage.getItem(STORAGE_ADMIN_LOGIN);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {!isLoginSignin && <HeaderComponent />}
      <div className="pt-7">
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={BASKET_ROUTE} element={<Basket />} />
          <Route path={LOGIN_ROUTE} element={<Login />}>
            <Route path={ADMIN_ROUTE} element={<Admin />} />
          </Route>
          <Route path={SIGNIN_ROUTE} element={<SignIn />} />
          <Route path={INFO_ROUTE} element={<Information />} />
          <Route
            path={adminIsLogin ? ADMIN_PANEL_ROUTE : LOGIN_ROUTE}
            element={adminIsLogin ? <AdminPanel /> : <Login />}
          />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
