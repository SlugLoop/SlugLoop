import React, {useEffect, useRef} from 'react';
import getAllBusses from './firebase';

export default function MapComponent({center, zoom}) {
  const markerRef = useRef({});
  const ref = useRef();
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) return;
    mapRef.current = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    // Initial load of markers
    getAllBusses().then((busses) => {
      busses.forEach((bus) => {
        markerRef.current[bus.id] = new window.google.maps.Marker({
          position: {lat: bus.lastLatitude, lng: bus.lastLongitude},
          map: mapRef.current,
          title: bus.name,
        });
      });
    });
  }, [center, zoom]);

  // Update positions of markers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getAllBusses().then((busses) => {
        busses.forEach((bus) => {
          console.log(bus);

          // Create marker if it doesn't exist
          if (!markerRef.current[bus.id]) {
            markerRef.current[bus.id] = new window.google.maps.Marker({
              position: {lat: bus.lastLatitude, lng: bus.lastLongitude},
              map: mapRef.current,
              title: bus.name,
            });
          } else {
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
