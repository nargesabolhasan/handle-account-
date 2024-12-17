export const ADD_USER_INFO = "addUserInfo";

export const addUserInfo = (user) => ({
  type: ADD_USER_INFO,
  payload: user,
});
