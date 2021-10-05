import React, { useState } from 'react';
import { useMapbox } from "../hooks/useMapbox";
import axios from 'axios';

const initialPoint = {
  lng: -99.1695,
  lat: 19.4218,
  zoom: 11.5,
};

const config = {
  headers: { Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnb256YWxvLmNhc3RpbGxvQHBhaW5hbmkubXgiLCJyb2xlcyI6IlZhbGlkYWRvcixBbmFsaXN0YSxDQUMsQWRtaW5pc3RyYWRvciJ9.f_bKUhV1-_EEVMBIw19EbqPxUGWdxkDV8nC69QmPXbkXbrbPvDNPmvIIsqdMM0K4MlTaufAJC6oUTsEVKO9QFg` }
};

export const MapaPage = () => {
    const [ repartidores, setRepatidores ] = useState([]);
    const { setRef, coords, setRep } = useMapbox(initialPoint);

    React.useEffect(() => {
      axios.get('https://painani2.herokuapp.com/empleados/repartidores/cac/1/disponibilidad', config).then((response) => {
        setRepatidores(response.data)
      })
    }, []);


  return (
    <>
      <div className="info">
        Latitud: {coords.lat} | Longitud: {coords.lng} | zoom: {coords.zoom}
      </div>

      <div className="list">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {
              repartidores && repartidores.map((repartidor) => (
                <tr ref={setRep} key={`${repartidor.disponibilidadRepartidor.idEmpleado}`} onClick={() => console.log('painani', repartidor)}>
                    <td>{repartidor.disponibilidadRepartidor.empleadosByIdEmpleadoActualizo.empleado}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="mapContainer" ref={setRef} />
    </>
  );
};
