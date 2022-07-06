import UserActionTypes from "./user.type";

/*
    Reducer bao gồm: 
      - Một state cụ thể nào đó cần lưu trong store (một state chung được combine từ nhiều state của nhiều reducer).
      - Nhận action: dựa vào action type, và data nhận vào từ action để thay đổi state cụ thể này.
*/
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
