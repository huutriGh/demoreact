import { all, call, put, takeLatest } from "redux-saga/effects";

import api from "../../api/client";
import {
  createProductFail,
  createProductProccesing,
  createProductSuccess,
} from "./product.action";
import productActionType from "./product.type";

const callAPICreateProduct = async (productInfo) => {
  console.log(productInfo);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  let formData = new FormData();
  const obj = {
    productId:productInfo.productId,
    productName:productInfo.productName,
    category: productInfo.category,
    price: productInfo.price
  }
  formData.append("productJson", JSON.stringify(obj));
  // Neu chi co mot file/image
  // formData.append("files", "hinh hoac file");

  // TH nhieu file/image thi loop qua array
  for (let index = 0; index < productInfo.images.length; index++) {
    const element = productInfo.images[index];
    // "files" ten parameter o backend
    formData.append("files", element);
  }

  const res = await api.post("/api/UploadFile/UploadFlie", formData, config);
  return res;
};


export function* createProduct({ payload: productInfo }) {
  
  try {
    yield put(createProductProccesing());
    // Call API tao product:
    const res = yield call(callAPICreateProduct, productInfo);
    yield put(createProductSuccess(res.data));
  } catch (error) {
    yield put(createProductFail(error));
  }
}

export function* onCreateProductStart() {
  yield takeLatest(productActionType.CREATE_PRODUCT_START, createProduct);
}

export function* productSagas() {
  yield all([call(onCreateProductStart)]);
}
