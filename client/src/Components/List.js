import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AboutButton from './AboutButton'
import { Box, Typography, Drawer, Modal} from '@mui/material'
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
            <Box 
                
                display = 'flex'
                height= 'window.innerHeight' 
                width = 'window.innerWidth'
                sx={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                overflowX: 'hidden',
                paddingTop: '3vh',
                alignItems: 'left',
    
                backgroundColor: 'background.default'
            }}
            
            >

                <List 
                    sx={{
                    width: 'window.innerWidth',
                    paddingLeft: '3vw',
                    maxHeight: 'window.innerHeight',                   
                    backgroundColor: 'background',                   
                }}>
                    {stops.map((stop) => (
                        <ListItemButton 
                            onClick ={()=> {handleDrawerOpen(); setStop(stop)}}
                            sx = {{width:'20%'}}
                            
                        >
                            <ListItemText primary={stop} sx={{color:'text.primary'}} />
    
                        </ListItemButton>))}


                </List>
                <Modal 
                anchor = "bottom" 
                open = {isDrawerOpen} 
                onClose = {handleDrawerClose}
                sx = {{
                    width: '50%',
                    display: 'flex',
                    left: '25%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                        <Page busStop = {stop}/>
                </Modal>


            </Box>
        </>
    )
}