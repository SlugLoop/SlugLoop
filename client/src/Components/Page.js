import React from 'react'


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getSoonBusStops } from './firebase';

export default function Page({busStop, isClockwise}) {
   
    const direction = isClockwise?"clockwise":"counterclockwise"
    return (
        
          <Card>
            <CardContent>
                <Typography sx = {{fontSize: 12 }} color = "text.primary">
                    The next buses for {busStop} going {direction}
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

                    }
                </Typography>
                
            </CardContent>
          </Card>

    )
}

