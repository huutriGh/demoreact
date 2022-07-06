import { all, call, put, takeLatest } from "redux-saga/effects";
import { signInFailure, signInSuccess } from "./user.action";
import UserActionTypes from "./user.type";

/*
   Saga là một middleware :
      - Được config đẻ bắt action và có các xử lý tương ứng.
      - Dispatch các action vào store thông qua các function mà lib cung cấp.
*/

const callAPILogin = async () => {
  const res = await fetch("https://localhost:44329/api/User/Login", {
    method: "POST",
    body: JSON.stringify({
      userName: "tri123",
      password: "Tri@mail.com123456",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export function* login() {
  try {
    const res = {
      token: "",
      requestToken: "",
      userName: "huutri",
      roles: ["GUEST", "ADMIN"],
    };

    // const res = yield call(callAPILogin);
    // console.log("saga res: ", res);
    // const currentUser = {
    //   token: res.token,
    //   requestToken: res.requestToken,
    //   userName: res.userName,
    //   role: res.userRoles,
    // };
    yield put(signInSuccess(res));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// Khai báo hàm để bắt action dựa trên action type. dựa vào action type để có xử lý tương ứng.
export function* onSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, login);
}

// Call hàm bắt action
export function* userSaga() {
  yield all([call(onSignInStart)]);
}
