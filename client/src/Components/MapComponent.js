import React, {useEffect, useRef, useState} from 'react';
import getAllBusses from './firebase';

export default function MapComponent({center, zoom}) {
  const markerRef = useRef({});
  const ref = useRef();
  const mapRef = useRef();
  const currentFreeColor = useRef(1);
  const busColors = useRef({});

  useEffect(() => {
    if (mapRef.current) return;
    mapRef.current = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    // Initial load of markers
    getAllBusses().then((busses) => {
      busses.forEach((bus) => {
        if (busColors.current[bus.route] === undefined) {
          // Set marker to next free color
          busColors.current = {
            ...busColors.current,
            [bus.route]: currentFreeColor.current,
          };
          markerRef.current[bus.id] = new window.google.maps.Marker({
            position: {lat: bus.lastLatitude, lng: bus.lastLongitude},
            map: mapRef.current,
            title: bus.name,
            icon: `/${currentFreeColor.current}.ico`,
          });
          currentFreeColor.current = currentFreeColor.current + 1;
          // Increment the value of currentFreeColor.current by 1
        } else {
          console.log('samecolor');
          markerRef.current[bus.id] = new window.google.maps.Marker({
            position: {lat: bus.lastLatitude, lng: bus.lastLongitude},
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
              busColors.current = {
                ...busColors.current,
                [bus.route]: currentFreeColor.current,
              };
              currentFreeColor.current = currentFreeColor.current + 1;
            }

            markerRef.current[bus.id] = new window.google.maps.Marker({
              position: {lat: bus.lastLatitude, lng: bus.lastLongitude},
              map: mapRef.current,
              title: bus.name,

              icon: `${currentFreeColor.current}.ico`,
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

  return <div ref={ref} id="map" style={{height: '100vh', width: '100vw'}} />;
}
