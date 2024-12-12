import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";
import HandleBack from "../components/handleBack";
import { BASE_URL, productsFetch } from "../constant/api";

const Information = () => {
  const params = useParams();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${productsFetch}/${params.id}`);
      setInfo(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error get data", error);
      toast.error("Try again !");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <>loading...</>
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
              src={`${BASE_URL}/${info.imagePath}`}
              alt={info.name}
            />
            <Typography gutterBottom variant="h5" component="div">
              {info.name}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {info.caption}
            </Typography>
            <Typography>{info.moreInfo}</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Information;
