import React, { useEffect, useRef, useState } from 'react';
import getAllBusses from './firebase';
//import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';

export default function MapComponent({ center, zoom }) {
  const markerRef = useRef({});
  const ref = useRef();
  const mapRef = useRef();
  const [busColors, setBusColors] = useState({});
  let currentFreeColor = 1;


  useEffect(() => {
    if (mapRef.current) return;
    mapRef.current = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    // Initial load of markers
    getAllBusses().then((busses) => {
      busses.forEach((bus) => {

        if (busColors[bus.route] === undefined) {
          // Set marker to next free color
          console.log(bus);
          console.log(currentFreeColor);
          setBusColors({ ...busColors, [bus.route]: currentFreeColor });
          markerRef.current[bus.id] = new window.google.maps.Marker({
            position: { lat: bus.lastLatitude, lng: bus.lastLongitude },
            map: mapRef.current,
            title: bus.name,
            icon: `${currentFreeColor}.ico`,
          });
          currentFreeColor = currentFreeColor + 1;
          // Increment the value of currentFreeColor by 1
        }
        else {
          markerRef.current[bus.id] = new window.google.maps.Marker({
            position: { lat: bus.lastLatitude, lng: bus.lastLongitude },
            map: mapRef.current,
            title: bus.name,
            icon: `${busColors[bus.route]}.ico`,
          });
        }
      });
    });
  }, [center, zoom]);

  // Update positions of markers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getAllBusses().then((busses) => {
        busses.forEach((bus) => {

          // Create marker if it doesn't exist
          if (!markerRef.current[bus.id]) {
            if (busColors[bus.route] === undefined) {
              // Generate random color
              setBusColors({ ...busColors, [bus.route]: currentFreeColor });
              currentFreeColor = currentFreeColor + 1;
            }
            
            markerRef.current[bus.id] = new window.google.maps.Marker({
              position: { lat: bus.lastLatitude, lng: bus.lastLongitude },
              map: mapRef.current,
              title: bus.name,

              icon: `${currentFreeColor}.ico`,
            });

          } else {
            // Update marker position
            markerRef.current[bus.id].setPosition({
              lat: bus.lastLatitude,
              lng: bus.lastLongitude,
            });
          }
        });
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [center]);


  return <div ref={ref} id="map" style={{ height: '100vh', width: '100vw' }} />;

}
