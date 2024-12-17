import { Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import PasswordComponent from "./password";
import HandleBack from "./handleBack";

const SignInForm = ({
  formTitle,
  passwordDefaultValue,
  usernameDefaultValue,
  emailDefaultValue,
  handleSubmit,
  register,
  errors,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="m-auto w-fit md:w-[500px]">
      <FormControl className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-2 items-center">
          <HandleBack />
          <Typography variant="h5" className="grow text-center">
            {formTitle}
          </Typography>
        </div>
        <TextField
          defaultValue={emailDefaultValue && emailDefaultValue}
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {!!errors?.email?.type && (
          <small className="text-red-500">{errors?.email?.message}</small>
        )}
        <TextField
          label="user name"
          type="text"
          fullWidth
          margin="normal"
          defaultValue={usernameDefaultValue && usernameDefaultValue}
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
        <PasswordComponent
          name="password"
          defaultValue={passwordDefaultValue && passwordDefaultValue}
          register={register}
        />
        {!!errors?.password?.type && (
          <small className="text-red-500 text-wrap">
            {errors?.password?.message}
          </small>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "loading" : "submit"}
        </Button>
      </FormControl>
    </form>
  );
};

export default SignInForm;
