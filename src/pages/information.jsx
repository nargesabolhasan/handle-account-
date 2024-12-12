import { Box, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import HandleBack from "../components/handleBack";
import { BASE_URL, productsFetch } from "../constant/api";
import useAxios from "../hooks/useAxios";

const Information = () => {
  const params = useParams();

  const { responseData, startRequest, loading } = useAxios();

  const fetchProducts = async () => {
    await startRequest({
      url: `${productsFetch}/${params.id}`,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading || !responseData ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <HandleBack />
          </Grid>
          <Grid
            size={{ xs: 12, md: 9 }}
            className="m-auto flex flex-col gap-3 justify-around items-center p-4"
          >
            <Box
              component="img"
              sx={{
                height: 233,
                width: { xs: 250, md: 350 },
                objectFit: "contain",
              }}
              src={`${BASE_URL}/${responseData?.imagePath}`}
              alt={responseData?.name}
            />
            <Typography gutterBottom variant="h5" component="div">
              {responseData?.name}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {responseData?.caption}
            </Typography>
            <Typography>{responseData?.moreInfo}</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Information;
