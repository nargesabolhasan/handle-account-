export const ADD_ITEM = "ADD_ITEM";
export const DECREASE_COUNT = "DECREASE_COUNT";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const decreaseCount = (itemId) => ({
  type: DECREASE_COUNT,
  payload: itemId,
});
