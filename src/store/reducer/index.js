import { combineReducers } from "redux";
import shopReducer from "./shopReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  shopList: shopReducer,
  user: userReducer,
});

export default rootReducer;
