import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Typography,Modal, Card, CardContent, Button} from '@mui/material'
import Page from './Page';
import {useViewportWidth} from '../App'
import BusStops from './bus-stops.json'

export default function ListView() {
    const viewportWidth = useViewportWidth()
    /*
    const stops = ['Main Entrance CW', 'Main Entrance CCW','Lower Campus', 'Village/Farm',
        'East Remote', 'East Field/OPERS', 'Cowell', 'Crown', '9/10', 'Science Hill',
        'Kresge', 'Kerr Hall', 'RCC/Porter', 'Family Student Housing', 'Oakes/West Remote', 'Arboretum'];
        */
    //const [showPage, setShowPage] = useState('');
    const cwstops = BusStops.bstop.CW.map((key)=>Object.keys(key)[0])
    const ccwstops = BusStops.bstop.CCW.map((key)=>Object.keys(key)[0])
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [isDirModalOpen, setDirModal] = useState(true)
    const [isClockwise, setDirection] = useState(true)
    const [stop,displayStop] = useState('')
    const handleDirModalClose = () => {
        setDirModal(false)
    }
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
                <Modal  
                anchor = "bottom" 
                open = {isDirModalOpen} 
                onClose = {handleDirModalClose}
                sx = {{
                    width: '50%',
                    display: 'flex',
                    left: '25%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}
                >
                    <Card>
                        <CardContent>
                        <Typography sx={{fontSize: '15', color:'text.primary'}}>
                            Choose a direction
                        </Typography>
                        <Button onClick = {()=> {setDirection(true); handleDirModalClose()}}>
                            Clockwise
                        </Button>
                        <Button onClick = {()=> {setDirection(false); handleDirModalClose()}}>
                            Counterclockwise
                        </Button>
                        </CardContent>
                    </Card>
                </Modal>
                <List 
                    sx={{
                    width: 'window.innerWidth',
                    paddingLeft: '3vw',
                    maxHeight: 'window.innerHeight',                   
                    backgroundColor: 'background',                   
                }}>
                    <ListItemButton 
                        onClick = {()=> setDirection(!isClockwise)}
                        sx = {{width: viewportWidth > 600 ? '40%' : '60%'}}
                    >
                        <Typography sx = {{color:'text.primary'}}>
                        Your direction is {isClockwise ? 'clockwise' : 'counterclockwise'}.  Click to change directions
                    
                        </Typography>
                    </ListItemButton>  
                    { 
                        
                        (isClockwise?cwstops:ccwstops).map((stop) => (
                        <ListItemButton 
                            onClick ={()=> {handleDrawerOpen(); setStop(stop)}}
                            sx = {{ width: viewportWidth > 600 ? '20%' : '50%' }}
                            
                        >
                            <Typography primary={stop} sx={{color:'text.primary'}}>
                                {stop}
                            </Typography>
                        </ListItemButton>))
                        
                        }


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
                    <Page busStop = {stop} isClockwise = {isClockwise}/>
                </Modal>


            </Box>
        </>
    )
}

