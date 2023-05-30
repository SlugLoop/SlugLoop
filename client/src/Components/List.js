import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AboutButton from './AboutButton'
import { Box, Typography} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Page from './Page';


export default function ListView() {
    const stops = ['Main Entrance', 'Lower Campus', 'Village/Farm',
        'East Remote', 'East Field/OPERS', 'Cowell', 'Crown', '9/10', 'Science Hill',
        'Kresge', 'Kerr Hall', 'RCC/Porter', 'Family Student Housing', 'Oakes/West Remote', 'Arboretum'];
    const [showPage, setShowPage] = useState('');
    return (
        <>
            <Box sx={{
                height: window.innerHeight,
                width: '100vw',
                backgroundColor: 'background.default'
            }}
            
            >
                <AppBar sx={{
                    width: '100%',
                    height: '5%',
                    position: 'sticky',
                    top: '60px',
                    left: '0px'
                }}>
                    <Typography 
                        variant = "h7"
                        color="text.primary" 
                        align="center"
                    >
                        Select a bus stop to see estimated times
                    </Typography>
                </AppBar>
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
                        <ListItemButton onClick ={()=> setShowPage(stop)}>
                            <ListItemText primary={stop} sx={{color:'text.primary'}} />
                            {showPage==stop ? <Page busStop = {stop}/>: null}
                        </ListItemButton>))}


                </List>


            </Box>
        </>
    )
}