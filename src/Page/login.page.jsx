import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Container from "@mui/material/Container";
import { connect } from "react-redux"; // thu vien ket noi view vao redux
import { signInStart } from "./../redux/user/user.action"; // import action can su dung tren view. ( xu ly side effective: call api, write log ...)
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";

const Login = ({ user, login }) => {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (event) => {
    setUserLogin((preState) => ({
      ...preState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };
  const handleLogin = () => {
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
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button variant="outlined">Register</Button>
          </Grid>
          <Grid item md={12} xs={12}>
            {/*
                currentUser: {
                token: "",
                requestToken: "",
                userName: "",
                role: [],
              },
              err: null,
            */}
            <TextField
              label="Current User"
              value={user.userName}
            ></TextField>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

// Ket noi vao store lay state
const mapStateToProp = createStructuredSelector({
  user: selectCurrentUser,
});

// Push action vao middleware hoac reducer.
const mapDispatchToProp = (dispatch) => ({
  login: (loginInfo) => dispatch(signInStart(loginInfo)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Login);
