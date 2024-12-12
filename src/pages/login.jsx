import { Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router";
import HandleBack from "../components/handleBack";
import PasswordComponent from "../components/password";
import { STORAGE_ADMIN_LOGIN } from "../constant";
import { adminLoginFetch } from "../constant/api";
import { ADMIN_PANEL_ROUTE, ADMIN_ROUTE } from "../constant/routes";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inAdmin = location.pathname.includes(ADMIN_ROUTE);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAdminRoute = () => {
    navigate(ADMIN_ROUTE);
  };

  const onSubmit = async (data) => {
    if (inAdmin) {
      try {
        const response = await axios.get(adminLoginFetch);
        if (
          data.password === response.data.password &&
          data.username === response.data.username
        ) {
          toast.success("success in login");
          localStorage.setItem(STORAGE_ADMIN_LOGIN, "true");
          navigate(ADMIN_PANEL_ROUTE);
        }
        if (data.password !== response.data.password) {
          toast.error("password is not correct !");
        }
        if (data.username !== response.data.username) {
          toast.error("username is not correct !");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </Button>
        {!inAdmin && <Button onClick={handleAdminRoute}> admin panel</Button>}
      </FormControl>
    </form>
  );
};

export default Login;
