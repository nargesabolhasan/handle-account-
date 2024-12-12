import { Button, CardActions, Grid2 } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CardComponent from "../components/cards";
import { productsFetch } from "../constant/api";
import { INFO_RAW_ROUTE } from "../constant/routes";
import { addItem } from "../store/actions/shopAction";

const Home = () => {
  const [cardList, setCardList] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShop = (e, cardInfo) => {
    dispatch(addItem(cardInfo));
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(productsFetch);
      setCardList([...response.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("error:", error);
      toast.error("try again !");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Grid2 container spacing={2}>
      {loading ? (
        <>loading...</>
      ) : (
        <>
          {cardList.length !== 0 ? (
            <>
              {cardList.map((item) => (
                <CardComponent info={item} key={item.id}>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={(e) => handleShop(e, item)}
                      variant="outlined"
                      data_id_item={item.id}
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
            </>
          ) : (
            <>empty list !!</>
          )}
        </>
      )}
      <Toaster />
    </Grid2>
  );
};

export default Home;
