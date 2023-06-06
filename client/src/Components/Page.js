import React ,{useState, useEffect} from 'react'


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getSoonBusStops, getAllMetroBuses } from './firebase';

export default function Page(props) {
   
    const direction = props.isClockwise?"clockwise":"counterclockwise"
   // const [soonStops,setSoonStops] = useState([])
    
    return (
        
          <Card>
            <CardContent>
                <Typography sx = {{fontSize: 12 }} color = "text.primary">
                    The next buses for {props.busStop} going {direction}
                </Typography>
                <Typography sx = {{fontSize: 15}} color = "text.primary">
                    Metro ETA 
                </Typography>
                <Typography >
                    FUNCTIONALITY IN PROGRESS
                </Typography>
                <Typography sx = {{fontSize: 15}} color = "text.primary">
                    Loop Coming
                </Typography>
                <Typography >
                    {
                        props.soon?"SOON":"In a bit (>3 stops away)"
                    }
                </Typography>
                
            </CardContent>
          </Card>

    )
}

