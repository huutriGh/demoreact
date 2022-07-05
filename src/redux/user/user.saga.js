import { all, call, put, takeLatest } from "redux-saga/effects";
import { signInFailure, signInSuccess } from "./user.action";
import UserActionTypes from "./user.type";

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

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, login);
}

export function* userSaga() {
  yield all([call(onSignInStart)]);
}
