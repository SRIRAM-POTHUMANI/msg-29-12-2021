import React from "react";
import "./Modal.css";
import { Avatar, makeStyles } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));


function Account({ close, name, phone, email }) {

      const classes = useStyles();

  return (
    <>
      <div className="modal">
        <div className="card" style={{}}>
          <div
            className="card text-center"
            style={{ minWidth: "350px", minHeight: "300px" }}
          >
            <div className="card-header text-white bg-primary">About</div>
            <div className="card-body text-start md-3">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ paddingRight: "5px", marginBottom: "8px" }}>
                  <Avatar className={classes.large} />
                </div>
                <div>
                  <h5>{name}</h5> 
                </div>
                <div>
                  <h5>{phone}</h5>
                </div>
                <div>
                  <h5>{email}</h5>
                </div>
              </div>
            </div>
            <div
              onClick={() => close(false)}
              className="card-footer btn btn-primary text-white bg-primary"
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
