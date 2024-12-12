import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { forwardRef, useState } from "react";

const PasswordComponent = forwardRef(({ register, name, errors = "" }, ref) => {
  const [visibility, setVisibility] = useState(true);

  const handleChangeVisibility = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <TextField
      ref={ref}
      type={visibility ? "text" : "password"}
      label={"Password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleChangeVisibility}
              edge="end"
            >
              {visibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={!!errors[name]}
      helperText={errors[name] ? errors[name].message : ""}
      {...register(name)}
    />
  );
});

export default PasswordComponent;
