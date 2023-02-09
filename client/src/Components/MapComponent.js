import React, {useState, useEffect, useRef} from 'react';
import getAllBusses from './firebase';
import Legend from './Legend';
import {useAuthUser} from './Auth';

export default function MapComponent({center, zoom}) {
  const markerRef = useRef({});
  const ref = useRef();
  const mapRef = useRef();
  const currentFreeColor = useRef(1);
  const busColors = useRef({});
  const [legendItems, setLegendItems] = useState({});
  const auth = useAuthUser();

  useEffect(() => {
    if (mapRef.current) return;
    mapRef.current = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    // Initial load of markers
    getAllBusses(auth).then((busses) => {
      // Sort busses based on route
      busses.sort((a, b) => {
        if (a.route < b.route) {
          return -1;
        }
        if (a.route > b.route) {
          return 1;
        }
        return 0;
      });
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
          markerRef.current[bus.id] = new window.google.maps.Marker({
            position: {lat: bus.lastLatitude, lng: bus.lastLongitude},
            map: mapRef.current,
            title: bus.name,
            icon: `${busColors.current[bus.route]}.ico`,
          });
        }
      });

      // Set legend items
      const temp = Object.keys(busColors.current).map((route) => ({
        name: route,
        icon: `${busColors.current[route]}.ico`,
      }));
      setLegendItems(temp);
    });
  }, [center, zoom]);

  // Update positions of markers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getAllBusses(auth).then((busses) => {
        busses.forEach((bus) => {
          // Create marker if it doesn't exist
          if (!markerRef.current[bus.id]) {
            if (busColors.current[bus.route] === undefined) {
              busColors.current = {
                ...busColors.current,
                [bus.route]: currentFreeColor.current,
              };
              currentFreeColor.current = currentFreeColor.current + 1;

              // Add new color to legend
              setLegendItems(
                Object.keys(busColors.current).map((route) => ({
                  name: route,
                  icon: `${busColors.current[route]}.ico`,
                })),
              );
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

  return (
    <>
      <div
        ref={ref}
        id="map"
        style={{height: window.innerHeight, width: '100vw'}}
      />
      <Legend legendItems={legendItems} />
    </>
  );
}
