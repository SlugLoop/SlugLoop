import {Dialog, DialogTitle, IconButton} from '@mui/material'
import React, {useContext, useState} from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import Button from '@mui/material/Button'
import SettingsContext from './SettingsContext'
//import makeStyles from "@mui/styles/makeStyles";

//import ListItemButton from "@mui/material";

export default function SettingsButton(props) {
  const {settings, dispatch} = useContext(SettingsContext)
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
            //props.toggleDisplayTime()
            dispatch({type: "SET_DISPLAY_TIME"})
            setOpen(false)
          }}
        >
          {settings.displayTime ? 'Hide Time' : 'Show Time'}
        </Button>
        <Button
          onClick={() => {
            //props.handleDarkToggle()
            dispatch({type: 'SET_DARK_MODE'})
            setOpen(false)
          }}
        >
          {settings.darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <Button
          onClick={() => {
            //props.handleFilterToggle()
            dispatch({type: 'SET_FILTER'})
            setOpen(false)
          }}
        >
          {settings.filter ? 'Show All Buses' : 'Show Only Recent Buses'}
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
            color: settings.darkMode ? 'white' : 'black',
          }}
        />
      </IconButton>
    </>
  )
}
