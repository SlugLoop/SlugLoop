import React, { useState, useEffect, useRef , useContext} from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton';
import { Box, Typography,Modal, Card, CardContent, Button} from '@mui/material'
import Page from './Page';
import BusStops from './bus-stops.json'
import { getSoonBusStops} from './firebase';
import SettingsContext from '../SettingsContext';

export default function ListView() {
    /*
    const stops = ['Main Entrance CW', 'Main Entrance CCW','Lower Campus', 'Village/Farm',
        'East Remote', 'East Field/OPERS', 'Cowell', 'Crown', '9/10', 'Science Hill',
        'Kresge', 'Kerr Hall', 'RCC/Porter', 'Family Student Housing', 'Oakes/West Remote', 'Arboretum'];
        */
    //const [showPage, setShowPage] = useState('');
    const cwstops = BusStops.bstop.CW
    console.log(cwstops)
    const ccwstops = BusStops.bstop.CCW
    const {settings} = useContext(SettingsContext)
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [isDirModalOpen, setDirModal] = useState(true)
    const [isClockwise, setDirection] = useState(true)
    const [soonStops,setSoonStops] = useState([])
    const [metroId, setMetroId] = useState('')
    const [name, setName] = useState('')
    const [stop,displayStop] = useState('')
    const [soon, setSoon] = useState(false)
    const getStopInfo = () => {
        getSoonBusStops().then((stops)=>{
            setSoonStops(stops)
        })
        if(isClockwise){ 
            setSoon(soonStops[1][stop])
        }
        else{
            setSoon(soonStops[0][stop])
        }
        
        
    }
    const handleDirModalClose = () => {
        setDirModal(false)
    }
    const handleDrawerOpen = () => {
        setDrawerOpen(true)
      }
    
    const handleDrawerClose = () => {
        setDrawerOpen(false)
      }
    const initialLoad = useRef(true)
    useEffect(()=>{
        if(initialLoad.current){
            initialLoad.current = false
            getSoonBusStops().then((stops)=>{
                setSoonStops(stops)
            })
        }
        else{
            getStopInfo()
        }      
    },[stop])
    
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
                    backgroundColor: 'background.default',                   
                }}>
                    <ListItemButton 
                        onClick = {()=> setDirection(!isClockwise)}
                        sx = {{width: '100%', marginBottom: '10px'}}
                    >
                        <Typography sx = {{color:'text.primary'}}>
                        Your direction is {isClockwise ? 'clockwise' : 'counterclockwise'}.  Click to change directions
                    
                        </Typography>
                    </ListItemButton>  
                    { 
                        
                        (isClockwise?cwstops:ccwstops).map((key, index) => {
                            const busstop = Object.keys(key)[0]

                            console.log(index + 'index')
                        return(
                        <ListItemButton 
                            onClick ={()=> {handleDrawerOpen(); displayStop(busstop); setMetroId(key[busstop].metro); setName(key[busstop].name)}}
                            sx = {{ width: '100%', marginBottom: '10px' }}
                            key= {busstop}
                        >
                            <Typography primary={busstop} sx={{color:'text.primary'}}>
                                {key[busstop].name}  
                            </Typography>
                        </ListItemButton>)})
                        
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
                    <Page busStop = {stop} isClockwise = {isClockwise} soon = {soon} id ={metroId} name = {name} />
                </Modal>


            </Box>
        </>
    )
}

