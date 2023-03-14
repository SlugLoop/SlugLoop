import {Dialog, DialogTitle, IconButton} from '@mui/material'
import React, {useState} from 'react'
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button'
//import makeStyles from "@mui/styles/makeStyles";

//import ListItemButton from "@mui/material";

export default function AboutButton(props) {
  const navigate = useNavigate()
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
            left: '20px',
            paddingBottom: '10px',
          },
        }}
      >
        <DialogTitle position="center">Information</DialogTitle>
        <Button
          onClick={() => {
            navigate('/contact')
          }}
        >
          Contact Us
        </Button>
        <Button
          onClick={() => {
            navigate('/about')
          }}
          autoFocus
          sx={{
            paddingBottom: '6%',
          }}
        >
          About Us
        </Button>
      </Dialog>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'absolute',
          bottom: '30px',
          left: '20px',
        }}
      >
        <HelpOutlineSharpIcon
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
