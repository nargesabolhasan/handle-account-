import React from "react";
import CardComponent from "../components/cards";
import { Button, CardActions, Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";
import { addItem } from "../store/actions/shopAction";
import { useNavigate } from "react-router";
import { cardList } from "../constant/cardList";
import { INFO_RAW_ROUTE, INFO_ROUTE } from "../constant/routes";

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleShop = (e, cardInfo) => {
    dispatch(addItem(cardInfo));
  };

  return (
    <Grid2 container spacing={2}>
      {cardList.map((item) => (
        <CardComponent info={item} key={item.id}>
          <CardActions>
            <Button
              size="small"
              onClick={(e) => handleShop(e, item)}
              variant="outlined"
            >
              Shop
            </Button>
            <Button
              size="small"
              onClick={(e) => navigate(`${INFO_RAW_ROUTE}/${item.id}`)}
              variant="contained"
            >
              More Information
            </Button>
          </CardActions>
        </CardComponent>
      ))}
    </Grid2>
  );
};

export default Home;
