import productActionType from "./product.type";

export const createProductStart = (productInfo) => ({
  type: productActionType.CREATE_PRODUCT_START,
  payload: productInfo,
});

export const createProductProccesing = () => ({
  type: productActionType.CREATE_PRODUCT_PROCCESING,
  payload: "",
});
export const createProductSuccess = (products) => ({
  type: productActionType.CREATE_PRODUCT_SUCCESS,
  payload: products,
});
export const createProductFail = (error) => ({
  type: productActionType.CREATE_PRODUCT_FAIL,
  payload: error,
});
