import React, { useState } from 'react'
import Map from './Map'
import List from './List'
import Button from '@mui/material/Button'

export default function Main() {
    const [showMap, setMap] = useState(true);

    function toggleShowMap() {
        setMap(!showMap)
    }

    return (
        <>
            {showMap ? <Map /> : <List />}
            <Button
                onClick={toggleShowMap}
                disableRipple
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',

                    backgroundColor: 'white',
                    borderRadius: '5px',
                    opacity: '0.7',
                }}
            >
                {showMap ? 'Map View' : 'List View'}
            </Button>
        </>
    )
}