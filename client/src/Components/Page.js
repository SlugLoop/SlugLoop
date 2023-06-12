import React ,{useState, useEffect} from 'react'


import Card from '@mui/material/Card';
import {Box, Modal,} from '@mui/material'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getSoonBusStops, getAllMetroBuses } from './firebase';
import BusStops from './bus-stops.json'
async function getMetroEta(id) {
    try {
        return await fetch('http://localhost:3001/metroEta?stopId=' + id, {
            method: 'GET'
        }).then((response) => {
            if (response.status === 200) {
                return (response.json())
            }
            else {
                console.log("error getting response")
                return
            }
        }).then((body) => {
            console.log("body" + body)
            return body
        })
    }
    catch {
        console.log('error fetching')
    }
}

export default function Page(props) {
    const direction = props.isClockwise?"clockwise":"counterclockwise"
    
   // const [soonStops,setSoonStops] = useState([])
    const [metroBuses,setMetroBuses] = useState([])
    useEffect(()=>{
        let busarr =[]
        getMetroEta(props.id).then((result) => {
            result.forEach((bus) => {

                busarr.push(bus)
               
            })
            setMetroBuses(busarr)
        })    
        
        
    },[props.id])
    
    return (
        
          <Card>
            <CardContent>
                <Typography sx = {{fontSize: 12 }} color = "text.primary">
                    The next buses for {props.name} going {direction}
                </Typography>
                <Typography sx = {{fontSize: 15}} color = "text.primary">
                    Metro ETA 
                </Typography>
                
                    
                <Typography>
                {
                metroBuses.map((bus)=>{
                    return(
                    <Typography sx = {{fontSize: 15}} color = "text.primary">
                        Bus {bus.rt} is coming {bus.prdctdn=="DUE"?"< 1 minute":"in "+bus.prdctdn+" minutes"}
                    </Typography>
                    )
                })}
                </Typography>
                
                <Typography sx = {{fontSize: 15}} color = "text.primary">
                    Loop Coming
                </Typography>
                <Typography >
                    {
                        props.soon?"SOON (3 stops away or closer)":"In a bit (>3 stops away)"
                    }
                </Typography>
                
            </CardContent>
          </Card>

    )
}

