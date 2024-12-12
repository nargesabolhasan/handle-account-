import { Box } from "@mui/material";
import React from "react";
import notFound from "../assets/images/notFound.png";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-5">
      <Box
        component="img"
        sx={{
          width: 500,
          objectFit: "contain",
        }}
        src={notFound}
        alt="not found"
      />
    </div>
  );
};

export default NotFound;
