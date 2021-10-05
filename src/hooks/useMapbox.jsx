import { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { getRepartidores } from '../server/fetch';
import { v4 } from "uuid";


mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VsZXZyYTc3MDAiLCJhIjoiY2t0dnUyamY2MDRjMjJ3bndpY3k5a3BtMyJ9.pvwtcGyZSfpcYCZUlSVbYA";


export const useMapbox = (initialPoint) => {
  // Reference to map div
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);

  const rep = useRef();
  const setRep = useCallback((node) => {
    rep.current = node;
  }, []);

  const mapa = useRef();
  const [coords, setCoords] = useState(initialPoint);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [initialPoint.lng, initialPoint.lat],
      zoom: initialPoint.zoom,
    });

    mapa.current = map;
  }, [initialPoint]);

  // When moves the map
  useEffect(() => {
    mapa?.current?.on('move', () => {
      const { lng, lat } = mapa?.current?.getCenter();
      setCoords({
        lat: lat.toFixed(4),
        lng: lng.toFixed(4),
        zoom: mapa.current?.getZoom().toFixed(2)
      })
    });
    return mapa?.current?.off('move');
  }, []);


  //Add marker when select to user
  useEffect(() => {
    console.log('click repartidor');
    mapa.current?.on('click', (ev) => {
      const { lng, lat } = ev.lngLat;

      const marker = new mapboxgl.Marker();
      marker.id = v4();
      
      //first set lng! 
      marker.setLngLat([
        lng, lat
      ]).addTo(mapa.current).setDraggable(true);
    })
  })

  return {
    coords,
    setRef
  }
}
