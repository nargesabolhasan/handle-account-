import { ADD_USER_INFO } from "../actions/userAction";

const initialState = {
  user: {
    username: "",
    email: "",
    password: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return (state.user = action.payload);
    default:
      return state;
  }
};

export default userReducer;
