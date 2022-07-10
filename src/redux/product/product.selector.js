import { createSelector } from "reselect";

// Khai báo funtion để lấy một state trong store.
// state.user là lấy state của user trong store. user chính là key được khai báo trong function combineReducers của file root-reducer.js
const selectProduct= (state) => state.products;

// Tiếp tục lấy những thông tin cần lấy của state user. (User có thể có nhiều thông tin, nhưng chỉ cần lấy một thông tin cụ thể nào đó )
export const selectProducts = createSelector(
  [selectProduct],
  (products) => products.products
);
export const selectProductStatus = createSelector(
  [selectProduct],
  (products) => products.status
);
