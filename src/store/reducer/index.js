import { combineReducers } from "redux";
import shopReducer from "./shopReducer";

const rootReducer = combineReducers({
  shopList: shopReducer,
});

export default rootReducer;
