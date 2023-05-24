import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AboutButton from './AboutButton'
import { Box } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Page from './Page';
import Typography from '@mui/material/Typography';


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
            }} >
                <AppBar sx={{
                    width: '100%',
                    height: '10%',
                    position: 'absolute',
                    top: '0px',
                    left: '100px'
                }}>
                    <Typography variant = 'h3'
                    sx = {{fontSize: 20 , position: 'absolute', top: '20px', left: '20px' }} 
                    color = "#ffffff">
                        Select a bus stop
                    </Typography>
                </AppBar>
                <List sx={{
                    width: '100%',
                    position: 'absolute',
                    left: '100px',
                    top: '60px',
                    overflow: 'auto',
                    maxHeight: '90%'
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