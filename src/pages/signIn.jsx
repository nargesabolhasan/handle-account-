import { Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import HandleBack from "../components/handleBack";
import PasswordComponent from "../components/password";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //some codes
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-auto w-fit">
      <FormControl className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 items-center">
          <HandleBack />
          <Typography variant="h5" className="grow text-center">
            Sign In
          </Typography>
        </div>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          {...register("email")}
        />
        <TextField
          label="user name"
          type="text"
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
          Sign In
        </Button>
      </FormControl>
    </form>
  );
};

export default SignIn;
