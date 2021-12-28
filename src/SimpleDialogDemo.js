import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

// const emails = ["username1@gmail.com", "username2@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, uSers } = props;
  // console.log(uSers)
  const handleClose = () => {
    onClose(selectedValue);
    console.log(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    // localStorage.setItem("ToName", selectedValue);
    // console.log(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Friends</DialogTitle>
      <List>
        {uSers.map((uSer) => (
          <ListItem
            button
            onClick={() => handleListItemClick(uSer.name)}
            key={uSer._id}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={uSer.name} />
          </ListItem>
        ))}

        
      </List>
    </Dialog>
  );
}



export default function SimpleDialogDemo({ userS }) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(userS[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (selectedValue) => {
    setOpen(false);
    setSelectedValue(selectedValue);
    localStorage.setItem("ToName", selectedValue);
  };
  console.log(`value: ${selectedValue}`);
  return (
    <div>
      {/* <Typography variant="subtitle1">{selectedValue}</Typography> */}
      {/* <br /> */}
      <SpeakerNotesIcon onClick={handleClickOpen} style={{ padding: "0px" }} />
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        uSers={userS}
      />
    </div>
  );
}
