import {Dialog, DialogTitle, IconButton} from '@mui/material'
import React, {useState} from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import Button from '@mui/material/Button'
//import makeStyles from "@mui/styles/makeStyles";

//import ListItemButton from "@mui/material";

export default function SettingsButton(props) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            position: 'absolute',
            bottom: '30px',
            right: '20px',
            paddingBottom: '10px',
          },
        }}
      >
        <DialogTitle position="center">Settings</DialogTitle>
        <Button
          onClick={() => {
            props.toggleDisplayTime()
            setOpen(false)
          }}
        >
          Toggle Time
        </Button>
        <Button
          onClick={() => {
            props.handleDarkToggle()
            setOpen(false)
          }}
        >
          {props.darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Dialog>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'absolute',
          bottom: '30px',
          right: '20px',
        }}
      >
        <SettingsIcon
          sx={{
            width: '60px',
            height: '60px',
            color: props.darkMode ? 'white' : 'black',
          }}
        />
      </IconButton>
    </>
  )
}
