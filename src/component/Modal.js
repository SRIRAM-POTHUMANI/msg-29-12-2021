import React from "react";
import "./Modal.css";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";

function Modal({ close, friends, select }) {
  return (
    <>
      <div className="modal">
        <div className="card" style={{}}>
          <div
            className="card text-center"
            style={{ minWidth: "350px", minHeight: "300px" }}
          >
            <div className="card-header text-white bg-primary">Friends</div>
            <div className="card-body text-start md-3">
              {friends.map((l, index) => (
                <div key={index} style={{ display: "flex" }}>
                  <div style={{ paddingRight: "5px", marginBottom: "8px" }}>
                    <Avatar />
                  </div>
                  <div>
                    <h5
                      className="lists"
                      onClick={() => {
                        select(l.name);
                        close(false);
                      }}
                    >
                      {l.name}
                    </h5>
                  </div>
                </div>
              ))}
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

export default Modal;
