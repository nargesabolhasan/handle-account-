import { createStore, compose } from "redux";
import rootReducer from "./reducer";
import { STORAGE_SHOP_LIST } from "../constant";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_SHOP_LIST);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (store) => {
  const serializedState = JSON.stringify(store);
  localStorage.setItem(STORAGE_SHOP_LIST, serializedState);
};

const persist = loadState();
const store = createStore(rootReducer, persist, composeEnhancers());

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
