import React from "react";
import { Box, ListItem } from "@mui/material";
import { Typography } from "@mui/material";

export default function About() {
  return (
    <div>
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
        <Box
          justifyContent={"left"}
          paddingLeft={"10vh"}
          paddingRight={"10vh"}
          paddingTop={"1vh"}
        >
          <Typography variant="h4" component="div" paddingBottom={"2vh"}>
            About
          </Typography>

          <Typography variant="h5" component="div" fontWeight={"bold"}>
            What is Slug Loop?
          </Typography>

          <Typography component="div" align="left" paddingBottom={"3vh"}>
            Slug Loop gives users loop bus locations in real time.
          </Typography>

          <Typography variant="h5" component="div" fontWeight={"bold"}>
            Who worked on Slug Loop?
          </Typography>

          <Typography>
            <ul>
              <li>Bill</li>
              <li>Annie</li>
              <li>Alex</li>
              <li>Nick </li>
            </ul>
          </Typography>

          <Typography
            variant="h5"
            align="left"
            paddingBottom={"1.5vh"}
            fontWeight={"bold"}
          >
            Our project stands on the shoulders of giants.
          </Typography>
          <Typography>
            Many thanks to the people who inspired us, including:
            <ul>
              <li>Professor Veenstra</li>
              <li>Past contributors of BTS 2.0</li>
            </ul>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
