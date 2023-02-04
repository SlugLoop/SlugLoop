import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Contact() {
  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      component="form"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction="column" spacing={1.3}>
        <Typography variant="h4" component="div">
          Contact Us
        </Typography>
        <Typography variant="h6" component="div">
          let us know what you think
        </Typography>
        <TextField id="Name" label="Name" variant="outlined" />
        <TextField id="Email" label="Email" variant="outlined" />
        <TextField id="Message" label="Message" variant="outlined" />

        <Button
          variant="contained"
          onClick={() => {
            alert("clicked");
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
