import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

export default function About() {
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
        <p>about us</p>
        <TextField id="Name" label="Name" variant="outlined" />
        <TextField id="Email" label="Email" variant="outlined" />
        <TextField id="Message" label="Message" variant="outlined" />
      </Stack>
    </Box>
  );
}
