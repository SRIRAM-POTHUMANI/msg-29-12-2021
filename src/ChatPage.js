import React, { useState, useEffect, useRef } from "react";
import "./ChatPage.css";
import Pusher from "pusher-js";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import SendIcon from "@material-ui/icons/Send";
import { InsertEmoticon } from "@material-ui/icons";
import SimpleDialogDemo from "./SimpleDialogDemo";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "./axios";
import { Link } from "react-router-dom";
import { userName } from "./Login";
import Modal from "./component/Modal";
import { Avatar, makeStyles } from "@material-ui/core";
import Account from "./component/Account";



function ChatPage() {
  // console.log(userName);
  //accounts
  // const tOken =localStorage.getItem("name");
  // const pHone = tOken.existUser.phone;
  // const eMail = tOken.existUser.email;
  // console.log(pHone)
  //chat names
  // const [username, setUsername] = useState("");
  const [recievername, setrecievername] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setuserList] = useState([]);
  //modal
  const [showModal, setShowModal] = useState(true);
  const [select, setselect] = useState();
  const [showAcc, setShowAcc] = useState(false);
  // pusher
  var pusher = new Pusher("7b837337ccb8aebc6007", {
    cluster: "ap2",
  });
  useEffect(() => {
    const channel = pusher.subscribe("mern-msg");
    channel.bind("inserted", function (newMessage) {
      sync();
      // userlist();
    });

    return () => {
      channel.unbind_all();

      scrollToBottom();
    };
  }, [messages]);

  // msg card class
  const [input, setinput] = useState([]);
  const msgsender = "card chat_reciever chat_message ";
  const msgreciever = "card chat_message";
  const existingUser = userName.uname;
  const existingPhone = userName.phone;
  const existingEmail = userName.email;
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
  const classes = useStyles();

  //sync users
  const userlist = async () => {
    await axios.get("/users/userlist").then((res) => {
      setuserList(res.data);
    });
  };
  //filter userLists
  const userLists = userList.filter((u) => existingUser != u.name);
  console.log(userLists)
  //sync msg
  const sync = async () => {
    await axios.get("/messages/sync").then((res) => {
      setMessages(res.data);
    });
  };
  useEffect(async () => {
    await sync();
    await userlist();
    scrollToBottom();
  }, []);

  //scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  };

  const [namess, setnamess] = useState([]);

  // userList.map((u)=>{
  //   setnamess(u.email);
  // })
  // for(var i=0, i<= userList.length,i++)
  // {
  //   setnamess(userList.name[i])
  // }
  // console.log(messages);
  // console.log(userList);

  // console.log(userList);
  const friends = userList.map((user) => user.name);
  // console.log(friends);

  //filter messages
  const privateMessages1 = messages.filter(
    (msg) =>
      (existingUser === msg.name && select === msg.toname) ||
      (existingUser === msg.toname && select === msg.name)
  );

  const sendMessage = async (e) => {
    e.preventDefault();
    scrollToBottom();
    await axios.post("/messages/new", {
      message: input,
      name: existingUser,
      toname: select,
      timestamp: Date(),
      recieved: true,
    });
    setinput("");
    sync();
  };
  console.log(`from ${existingUser} to ${select}`);
  return (
    <div className="card" style={{ height: "100vh", overflow: "hidden" }}>
      {/* header */}
      <div
        className="card-header fixed-top d-block p-2 bg-primary text-white"
        style={{ height: "5vh", backgroundColor: "blue" }}
      >
        <div className="d-flex flex-row bd-highlight mb-3">
          <div className="p-0 bd-highlight fw-bold col-1 order-first ">
            <SpeakerNotesIcon onClick={() => setShowModal(true)} />
            {showModal && (
              <Modal
                close={setShowModal}
                friends={userLists}
                select={setselect}
              />
            )}
          </div>
          <div className="p-0 bd-highlight fw-bold col-10 user-select-none">
            {select}
          </div>

          <div
            className="p-0 bd-highlight fw-bold col-1 order-last"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                className={classes.small}
                onClick={() => setShowAcc(true)}
              />
              {showAcc && (
                <Account
                  close={setShowAcc}
                  name={existingUser}
                  phone={existingPhone}
                  email={existingEmail}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <Link to="/">
                <ExitToAppIcon
                  style={{ color: "white" }}
                  onClick={() => localStorage.removeItem("token")}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
      <div
        className="card-body overflow-auto user-select-none d-flex flex-column"
        style={{
          height: "90vh",
          marginTop: "2rem",
          marginBottom: "2.9rem",
        }}
      >
        {/* message card */}
        {privateMessages1.map((mes) => {
          return (
            <div
              // className="card"
              className={existingUser === mes.name ? msgsender : msgreciever}
              style={{
                marginBottom: "0.3rem",
                marginTop: "0.3rem",
                textAlign: "left",
              }}
            >
              <div className="card-header">{mes.name}</div>
              <div className="card-body" style={{ padding: ".2rem .5rem" }}>
                <blockquote className="blockquote mb-0">
                  <p>{mes.message}</p>
                  <footer
                    className="footer d-flex justify-content-between"
                    style={{ fontSize: "small" }}
                  >
                    <div>day</div>
                    <div ref={messagesEndRef}>
                      {mes.timestamp.split(" ")[4].slice(0, -3)}
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <form>
        <div
          className="card-footer fixed-bottom d-flex justify-content-between p-2 bd-highlight bg-primary text-white"
          style={{ height: "5vh", backgroundColor: "blue" }}
        >
          <InsertEmoticon style={{ marginRight: "5px" }} />
          <div
            className="input-group flex-nowrap"
            style={{ margin: "0px", border: "0px" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter a new message"
              onChange={(e) => setinput(e.target.value)}
              value={input}
              aria-label="newmessage"
              aria-describedby="newmessage"
              style={{ paddingLeft: "3px", margin: "0px", border: "0px" }}
            />
            <button
              onClick={sendMessage}
              style={{ display: "none" }}
              type="submit"
            ></button>
          </div>
          <SendIcon style={{ marginLeft: "5px" }} />
        </div>
      </form>
    </div>
  );
}

export default ChatPage;
