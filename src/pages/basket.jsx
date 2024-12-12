import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../components/cards";
import { addItem, decreaseCount } from "../store/actions/shopAction";

const Basket = () => {
  const shopList = useSelector((state) => state.shopList.item);
  const dispatch = useDispatch();

  const handleDecreaseCount = (e, itemId) => {
    e.stopPropagation();
    dispatch(decreaseCount(itemId));
  };

  const handleShop = (e, cardInfo) => {
    e.stopPropagation();
    dispatch(addItem(cardInfo));
  };
  return (
    <div className="w-full">
      <Typography>shop list :</Typography>
      <div className="flex flex-row gap-3 flex-wrap">
        {shopList.length !== 0 ? (
          shopList.map((item) => (
            <Fragment key={item.id}>
              <CardComponent
                info={item}
                showCaption={false}
                cardBackground={"#add4fa"}
              >
                <Box
                  sx={{
                    margin: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    xsx={{ padding: 2, width: "content" }}
                    variant="contained"
                    onClick={(e) => handleDecreaseCount(e, item.id)}
                  >
                    -
                  </Button>
                  <Typography sx={{ padding: 2 }}>
                    count: {item.reserveCount}
                  </Typography>
                  <Button
                    xsx={{ padding: 2, width: "content" }}
                    variant="contained"
                    onClick={(e) => handleShop(e, item)}
                    disabled={item.reserveCount >= item.count}
                  >
                    +
                  </Button>
                </Box>
                {item.reserveCount >= item.count && (
                  <Typography color="error" variant="caption">
                    Out of stock !
                  </Typography>
                )}
              </CardComponent>
              <Divider />
            </Fragment>
          ))
        ) : (
          <Typography>empty basket!</Typography>
        )}
      </div>
    </div>
  );
};

export default Basket;
