import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AboutButton from './AboutButton'
import { Box, Typography, Drawer} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Page from './Page';


export default function ListView() {
    const stops = ['Main Entrance', 'Lower Campus', 'Village/Farm',
        'East Remote', 'East Field/OPERS', 'Cowell', 'Crown', '9/10', 'Science Hill',
        'Kresge', 'Kerr Hall', 'RCC/Porter', 'Family Student Housing', 'Oakes/West Remote', 'Arboretum'];
    //const [showPage, setShowPage] = useState('');
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [stop,displayStop] = useState('')
    const handleDrawerOpen = () => {
        setDrawerOpen(true)
      }
    
      const handleDrawerClose = () => {
        setDrawerOpen(false)
      }
    const setStop = (newStop) => {
        displayStop(newStop)
    }
    return (
        <>
            <Box sx={{
                display:'flex',
                height: window.innerHeight,
                width: '100vw',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: '5vh',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}
            
            >

                <List sx={{
                    width: '100%',
                    position: 'absolute',
                    left: '100px',
                    top: '80px',
                    overflow: 'auto',
                    maxHeight: '100%',
                    backgroundColor: 'background'
                }}>
                    {stops.map((stop) => (
                        <ListItemButton onClick ={()=> {handleDrawerOpen(); setStop(stop)}}>
                            <ListItemText primary={stop} sx={{color:'text.primary'}} />
    
                        </ListItemButton>))}


                </List>
                <Drawer anchor = "bottom" open = {isDrawerOpen} onClose = {handleDrawerClose}>
                        <Page busStop = {stop}/>
                </Drawer>


            </Box>
        </>
    )
}