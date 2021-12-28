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

function RegisterUser() {
  //register user
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const addUser = async () => {
    try {
      await axios.post("/users/saveuser", {
        name: name,
        phone: phone,
        email: email,
        password: password,
      });
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <div class="grid bady logapp">
      <Card className="card" style={{ width: "20rem", textAlign: "center" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Register
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <div className="row" style={{ justifyContent: "center" }}>
              <TextField
                style={{ minWidth: "200px", maxWidth: "250px" }}
                id="standard-required"
                label="Name"
                defaultValue={name}
                onChange={(event) => setname(event.target.value)}
              />
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <TextField
                style={{ minWidth: "200px", maxWidth: "250px" }}
                id="standard-required"
                label="Phone"
                defaultValue={phone}
                onChange={(event) => setphone(event.target.value)}
              />
            </div>
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
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(event) => setpassword(event.target.value)}
              />
            </div>
            <div className="row loginBut">
              <Link to="/">
                <Button variant="outlined" onClick={addUser}>
                  Register
                </Button>
              </Link>
            </div>
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/">
            <Button size="large" color="primary">
              Sign-in
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

export default RegisterUser;
