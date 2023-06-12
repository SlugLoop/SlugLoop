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
            return body
        })
    }
    catch {
        console.log('error fetching')
        return {}
    }
}

export default function Page(props) {
    const direction = props.isClockwise?"clockwise":"counterclockwise"
    
   // const [soonStops,setSoonStops] = useState([])
    const [metroBuses,setMetroBuses] = useState([])
    const [noMetro, setNoMetro ] = useState(false)
    useEffect(()=>{
        let busarr =[]
        getMetroEta(props.id).then((result) => {
            console.log(Object.keys(result)+"result")
            if(Object.keys(result).length>0){
            result.forEach((bus) => {

                busarr.push(bus)
               
            })
        }
        else{
            setNoMetro(true)
        }
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
                !noMetro?
                metroBuses.map((bus)=>{
                    return(
                    <Typography sx = {{fontSize: 15}} color = "text.primary">
                        Bus {bus.rt} is coming {bus.prdctdn=="DUE"?"< 1 minute":"in "+bus.prdctdn+" minutes"}
                    </Typography>
                    )
                }):(<Typography sx = {{fontSize: 15}} color = "text.primary">
                        Metro bus is greater than 30 minutes away
                    </Typography>)}
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

