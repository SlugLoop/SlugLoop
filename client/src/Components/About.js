import React from 'react';
import {Box, Button, ListItem, List} from '@mui/material';
import {Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        display="flex"
        width="100vw"
        height="100vh"
        component="form"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          justifyContent={'left'}
          paddingLeft={'10vh'}
          paddingRight={'10vh'}
          paddingTop={'1vh'}
        >
          <Typography variant="h4" component="div" paddingBottom={'2vh'}>
            About
          </Typography>

          <Typography variant="h5" component="div" fontWeight={'bold'}>
            What is Slug Loop?
          </Typography>

          <Typography component="div" align="left" paddingBottom={'3vh'}>
            Slug Loop provides UCSC campus bus locations in real time.
          </Typography>

          <Typography variant="h5" component="div" fontWeight={'bold'}>
            Who worked on Slug Loop?
          </Typography>

          <Typography>
            <List
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}
            >
              <ListItem>Bill Zhang (billzhangsc@gmail.com)</ListItem>
              <ListItem>Annie Liu (aliu98@ucsc.edu)</ListItem>
              <ListItem>Alex Liu (liu.alex01@gmail.com)</ListItem>
              <ListItem>Nick Szwed (nsszwed@gmail.com) </ListItem>
            </List>
          </Typography>

          <Typography
            variant="h5"
            align="left"
            paddingBottom={'1.5vh'}
            fontWeight={'bold'}
          >
            Our project stands on the shoulders of giants.
          </Typography>
          <Typography>
            Many thanks to the people who inspired us, including:
            <List
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }}
            >
              <ListItem>Professor Veenstra</ListItem>
              <ListItem>Past contributors of BTS 2.0</ListItem>
            </List>
          </Typography>
        </Box>
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Back to Map
        </Button>
      </Box>
    </div>
  );
}
