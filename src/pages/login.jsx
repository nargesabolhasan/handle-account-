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
import { Outlet, useLocation, useNavigate } from "react-router";
import HandleBack from "../components/handleBack";
import PasswordComponent from "../components/password";
import { STORAGE_ADMIN_LOGIN } from "../constant";
import { adminLoginFetch } from "../constant/api";
import { ADMIN_PANEL_ROUTE, ADMIN_ROUTE } from "../constant/routes";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inAdmin = location.pathname.includes(ADMIN_ROUTE);
  const { startRequest, loading } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAdminRoute = () => {
    navigate(ADMIN_ROUTE);
  };

  const onSubmit = async (formData) => {
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
          label="Username"
          fullWidth
          margin="normal"
          {...register("username")}
        />
        <PasswordComponent
          name="password"
          register={register}
          {...(errors.password && {
            error: true,
            helperText: errors.password.message,
          })}
        />
        <Button variant="contained" color="primary" type="submit">
          {loading ? <CircularProgress size="30px" color="inherit" /> : "Login"}
        </Button>
        {!inAdmin && <Button onClick={handleAdminRoute}> admin panel</Button>}
      </FormControl>
    </form>
  );
};

export default Login;
