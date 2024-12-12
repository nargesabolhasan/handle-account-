import { Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import HandleBack from "../components/handleBack";
import PasswordComponent from "../components/password";

const SignIn = () => {
  const handleSignIn = () => {
    //some codes
  };

  return (
    <FormControl className="flex flex-col gap-3">
      <div className="flex flex-row gap-2 items-center">
        <HandleBack />
        <Typography variant="h5" className="grow text-center">
          Sign In
        </Typography>
      </div>
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="user name" type="text" fullWidth margin="normal" />
      <PasswordComponent />
      <Button variant="contained" color="primary" onClick={handleSignIn}>
        Sign In
      </Button>
    </FormControl>
  );
};

export default SignIn;
