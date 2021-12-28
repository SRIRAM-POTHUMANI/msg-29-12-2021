import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "./axios";
import jwt from "jwt-decode";

// localStorage.removeItem("token");
var userdet = "";
function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const loginuser = async () => {
    try {
      var response = await axios.post("/users/login", {
        email: email,
        password: password,
      });

      if (response.data) {
        const token = jwt(response.data);
        userdet = {
          uname: token.existUser.name,
          phone: token.existUser.phone,
          email: token.existUser.email,
        };
        localStorage.setItem("token", token);
        userName = userdet;
        // console.log(token);
        // console.log(userName);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="grid bady logapp">
      <Card className="card" style={{ width: "20rem", textAlign: "center" }}>
        <CardContent>
          <h2>Sign-in</h2>
          <div className="row" style={{ justifyContent: "center" }}>
            <TextField
              style={{ minWidth: "200px", maxWidth: "250px" }}
              required
              id="standard-required"
              label="E-mail"
              defaultValue={email}
              onChange={(event) => setemail(event.target.value)}
            />
          </div>
          <div className="row" style={{ justifyContent: "center" }}>
            <TextField
              style={{ minWidth: "200px", maxWidth: "250px" }}
              className="textField"
              required
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(event) => setpassword(event.target.value)}
            />
          </div>
          <div className="row loginBut">
            <Link to="/chat">
              <Button variant="outlined" onClick={loginuser}>
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardActions>
          <Link to={"/reg"}>
            <Button size="large" color="primary">
              Register
            </Button>
          </Link>
          <Button size="large" color="secondary">
            Forgot Password
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
export var userName = userdet;
export default Login;
