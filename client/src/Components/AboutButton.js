import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import HelpOutlineSharpIcon from "@mui/icons-material/HelpOutlineSharp";
import DialogContentText from "@mui/material";

export default function AboutButton(props) {
  return (
    <>
      <Dialog>
        <DialogTitle>Submit?</DialogTitle>
        <DialogContent>Are you sure you want to do this?</DialogContent>
      </Dialog>
      <IconButton
        sx={{
          position: "absolute",
          bottom: "5%",
          left: "5%",
        }}
      >
        <HelpOutlineSharpIcon
          sx={{
            width: "60px",
            height: "60px",
            color: "#003c6c",
          }}
        />
      </IconButton>
    </>
  );
}
