import productActionType from "./product.type";
const INITIAL_STATE = {
  status: "",
  products: [],
  errors: "",
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionType.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        status: "",
      };
    case productActionType.CREATE_PRODUCT_PROCCESING:
      return {
        ...state,
        status: productActionType.CREATE_PRODUCT_PROCCESING,
      };
    case productActionType.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        status: productActionType.CREATE_PRODUCT_FAIL,
        errors: action.payload
      };

    default:
      return state;
  }
};

export default productReducer;
