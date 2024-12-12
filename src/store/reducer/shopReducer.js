import { ADD_ITEM, DECREASE_COUNT } from "../actions/shopAction";

const initialState = {
  item: [],
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const indexOfItem = state.item.findIndex(
        (card) => card.id === action.payload.id
      );

      if (indexOfItem !== -1) {
        const updateCount = state.item.map((card, index) =>
          index === indexOfItem ? { ...card, count: card.count + 1 } : card
        );
        return {
          ...state,
          item: [...updateCount],
        };
      } else {
        return {
          ...state,
          item: [{ ...action.payload, count: 1 }, ...state.item],
        };
      }
    case DECREASE_COUNT: {
      return {
        ...state,
        item: state.item
          .map((card) => {
            if (card.id === action.payload && card.count > 0) {
              return { ...card, count: card.count - 1 };
            } else {
              return card;
            }
          })
          .filter((card) => card.count !== 0),
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
