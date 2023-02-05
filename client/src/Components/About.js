import React from "react";
import { Box, Button, ListItem, List } from "@mui/material";
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
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              <ListItem>Bill</ListItem>
              <ListItem>Annie</ListItem>
              <ListItem>Alex</ListItem>
              <ListItem>Nick </ListItem>
            </List>
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
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              <ListItem>Professor Veenstra</ListItem>
              <ListItem>Past contributors of BTS 2.0</ListItem>
            </List>
          </Typography>
        </Box>
        <Button>Back to Map</Button>
      </Box>
    </div>
  );
}
