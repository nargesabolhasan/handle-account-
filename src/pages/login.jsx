import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import HandleBack from "../components/handleBack";
import PasswordComponent from "../components/password";
import { STORAGE_ADMIN_LOGIN } from "../constant";
import { adminLoginFetch, userApi } from "../constant/api";
import {
  ADMIN_PANEL_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  SIGNIN_ROUTE,
} from "../constant/routes";
import useAxios from "../hooks/useAxios";
import { addUserInfo } from "../store/actions/userAction";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inAdmin = location.pathname.includes(ADMIN_ROUTE);
  const { startRequest, loading } = useAxios();
  const { startRequest: startRequestUser, loading: loadingUser } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const handleAdminRoute = () => {
    navigate(ADMIN_ROUTE);
  };

  const onSubmit = async (formData) => {
    if (inAdmin) {
      const response = await startRequest({
        url: adminLoginFetch,
      });
      if (
        response?.username === formData.username &&
        response?.password === formData.password
      ) {
        toast.success("Login was successful.");
        localStorage.setItem(STORAGE_ADMIN_LOGIN, "true");
        navigate(ADMIN_PANEL_ROUTE);
      } else {
        if (response?.username !== formData.username) {
          toast.error("username is not correct!");
        }
        if (response?.password !== formData.password) {
          toast.error("password is not correct!");
        }
      }
    } else {
      startRequestUser({
        url: userApi,
      }).then((response) => {
        console.log(formData.password === response[2].password);

        const findUserAccount = response.findIndex(
          (user) =>
            user.username === formData.username &&
            user.password === formData.password
        );
        if (findUserAccount !== -1) {
          dispatch(addUserInfo(response[findUserAccount]));
          toast.success("welcome back");
          setTimeout(() => {
            navigate(HOME_ROUTE);
          }, 1000);
        } else {
          toast.error("check user and password");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-auto w-fit">
      <FormControl className="flex flex-col gap-3">
        <Outlet />
        <div className="flex flex-row gap-2 items-center">
          <HandleBack />
          <Typography variant="h5" className="grow text-center">
            Login
          </Typography>
        </div>

        <TextField
          label="user name"
          type="text"
          fullWidth
          margin="normal"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Minimum length is 3 characters",
            },
          })}
        />
        {!!errors?.username?.type && (
          <small className="text-red-500">{errors?.username?.message}</small>
        )}
        <PasswordComponent name="password" register={register} />
        {!!errors?.password?.type && (
          <small className="text-red-500 text-wrap">
            {errors?.password?.message}
          </small>
        )}
        <Button variant="contained" color="primary" type="submit">
          {loading || loadingUser ? (
            <CircularProgress size="30px" color="inherit" />
          ) : (
            "Login"
          )}
        </Button>
        {!inAdmin && <Button onClick={handleAdminRoute}> admin panel</Button>}
      </FormControl>
      <Link to={SIGNIN_ROUTE} className="block text-center">
        create new account
      </Link>
    </form>
  );
};

export default Login;
