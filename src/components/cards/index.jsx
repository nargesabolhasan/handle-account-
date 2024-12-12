import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { BASE_URL } from "../../constant/api";
const CardComponent = ({
  info,
  showCaption = true,
  children,
  cardBackground = "#fff",
}) => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        sx={{
          maxWidth: 345,
          padding: 2,
          backgroundColor: cardBackground,
          margin: "auto",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: { xs: 250, md: 350 },
            objectFit: "contain",
          }}
          src={`${BASE_URL}/${info.imagePath}`}
          alt={info.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.name}
          </Typography>
          {showCaption && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {info.caption}
            </Typography>
          )}
        </CardContent>
        {children}
      </Card>
    </Grid>
  );
};

export default CardComponent;
