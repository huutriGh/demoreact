import UserActionTypes from "./user.type";
const INITIAL_STATE = {
  currentUser: {
    token: "",
    requestToken: "",
    userName: "",
    roles: [],
  },
  err: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        err: action.payload,
      };

    default:
      return { ...state };
  }
};
export default userReducer;
