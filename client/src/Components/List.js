import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AboutButton from './AboutButton'
import { Box } from '@mui/material'
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
            }}>
                <AppBar sx={{
                    width: '100%',
                    position: 'absolute',
                    top: '0px',
                    left: '100px'
                }}>
                    Select a Bus Stop
                </AppBar>
                <List sx={{
                    width: '100%',
                    position: 'absolute',
                    left: '100px',
                    top: '40px',
                    overflow: 'auto',
                    maxHeight: '100%'
                }}>
                    {stops.map((stop) => (
                        <ListItemButton onClick ={()=> setShowPage(stop)}>
                            <ListItemText primary={stop} />
                            {showPage==stop ? <Page busStop = {stop}/>: null}
                        </ListItemButton>))}


                </List>


                <AboutButton />
            </Box>
        </>
    )
}