import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Container from "@mui/material/Container";
import { connect } from "react-redux"; // thu vien ket noi view vao redux
import { signInStart } from "./../redux/user/user.action"; // import action can su dung tren view. ( xu ly side effective: call api, write log ...)
import { createStructuredSelector } from "reselect";
import LinearProgress from "@mui/material/LinearProgress";
import {
  selectCurrentUser,
  selectLoginStatus,
} from "../redux/user/user.selector";
import UserActionTypes from "../redux/user/user.type";

const Login = ({ user, login, status }) => {
  console.log(status);
  /*
    user: chính là key user trong hàm mapStateToProp.
    login: chính là key login trong hàm mapDispatchToProp.
    vì kết nối rồi nên các khai này trở thành prop của Login Page.
  */

  // Tạo state cụ bộ trong login page để lưu thông tin người dùng nhập.
  // Giá trị mặc định là một object có 2 key là userName, password. Dùng key này đặt tên cho TextField bên dưới
  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
  });

  // Tạo hàm xử lý input của người dùng. khi người dùng input thì cập nhật lại state cục bộ đã khai ở trên.
  const handleChange = (event) => {
    setUserLogin((preState) => ({
      ...preState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };
  // Tạo hàm xử lý khi user nhấn nút login.
  const handleLogin = () => {
    // login chỗ này chính là prop ở trên. khi call login này thì chính là
    login(userLogin);
  };

  return (
    <Container>
      <Paper sx={{ padding: "20px" }} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography align="center" variant="h3">
              Login
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="User Name"
              fullWidth
              size="small"
              color="primary"
              name="userName"
              value={userLogin.userName}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
              color="secondary"
              variant="outlined"
              name="password"
              value={userLogin.password}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <Button
              variant="contained"
              sx={{ marginRight: "10px" }}
              disabled={status === UserActionTypes.EMAIL_SIGN_IN_PROCESSING}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button variant="outlined">Register</Button>
          </Grid>
          {status === UserActionTypes.EMAIL_SIGN_IN_PROCESSING ? (
            <Grid item md={12} xs={12}>
              <LinearProgress />
            </Grid>
          ) : null}
          <Grid item md={12} xs={12}>
            <TextField label="Current User" value={user.userName}></TextField>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

// Tạo funtion mapStateToProp lấy các selector từ selector. createStructuredSelector phải được import ở trên
const mapStateToProp = createStructuredSelector({
  //  * user: key của object, tự đặt tên. Tên này sẽ trở thành prop của React component (Login page).
  //  * selectCurrentUser: được tạo và export từ file user.selector.js, phải được import ở trên
  //  * Thực hiện tương tự cho các thông tin khác từ store.
  user: selectCurrentUser,
  status: selectLoginStatus,
});

// Tạo function mapDispatchToProp để dispatch action vào store. dispatch ở đây là một parameter
const mapDispatchToProp = (dispatch) => ({
  // * login: Key của object, tự đặt tên. Tên này sẽ trở thành prop của React component.
  //   login ở đây chính là một function có nhận vào một parameter là loginInfo. Khi gọi login thì hàm này sẽ dispatch action signInStart
  //   vào store.
  // * signInStart: là action đã khai báo ở file user.action.js. Phải được import ở trên để sử dụng
  login: (loginInfo) => dispatch(signInStart(loginInfo)),
});
// dùng kết connect function truyền vào 2 parameter là mapStateToProp, mapDispatchToProp. connect phải được import ở trên.
// connect có thể truyền hoặc không truyền parameter.
// connect(null, mapDispatchToProp): chỉ cần dispatch action mà không cần lấy data từ store.
// connect(mapStateToProp, null): cần lấy data nhưng cần dispatch action vào store.
// connect(null, null): khi rảnh quá không có gì làm :).
export default connect(mapStateToProp, mapDispatchToProp)(Login);
