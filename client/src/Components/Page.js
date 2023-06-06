import React from 'react'


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Page({busStop}) {
   
    
    return (
        
          <Card>
            <CardContent>
                <Typography sx = {{fontSize: 12 }} color = "text.primary">
                    The next buses for {busStop}
                </Typography>
                <Typography sx = {{fontSize: 15}} color = "text.primary">
                    Metro ETA 
                </Typography>
                <Typography >
                    12 Minutes
                </Typography>
                <Typography sx = {{fontSize: 15}} color = "text.primary">
                    Loop ETA 
                </Typography>
                <Typography >
                    12 Minutes
                </Typography>
                
            </CardContent>
          </Card>

    )
}

