import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import productReducer from "./product/product.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","products"],
};

/*
const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === userActionTypes.SIGN_OUT_START) {
    Object.keys(state).forEach((key) => {
      if (key !== "lang") storage.removeItem(`persist:${key}`);
    });
    const { lang } = state;
    state = { lang };
    return appReducer(state, action);
  }

  return appReducer(state, action);
};
*/

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});
export default persistReducer(persistConfig, rootReducer);
