import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Typography,Modal} from '@mui/material'
import Page from './Page';
import {useViewportWidth} from '../App'

export default function ListView() {
    const viewportWidth = useViewportWidth()
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
                            sx = {{ width: viewportWidth > 600 ? '20%' : '50%' }}
                            
                        >
                            <Typography primary={stop} sx={{color:'text.primary'}}>
                                {stop}
                            </Typography>
                            <ListItemText />
    
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