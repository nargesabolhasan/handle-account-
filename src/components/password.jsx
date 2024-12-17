import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { forwardRef, useState } from "react";

const PasswordComponent = forwardRef(
  ({ register, name, defaultValue }, ref) => {
    const [visibility, setVisibility] = useState(true);

    const handleChangeVisibility = () => {
      setVisibility((prev) => !prev);
    };

    return (
      <TextField
        defaultValue={defaultValue && defaultValue}
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
        {...register(name, {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              "Password must include uppercase, lowercase, number, and special character",
          },
        })}
      />
    );
  }
);

export default PasswordComponent;
