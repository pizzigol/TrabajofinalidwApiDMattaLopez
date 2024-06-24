import { useState, useEffect } from 'react';
import api from '../api'

const AlojamientosServicios = () => {
  const [alojamientosServicios, setAlojamientosServicios] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [nuevoAlojamientoServicio, setNuevoAlojamientoServicio] = useState({
    idAlojamiento: '',
    idServicio: ''
  });
  const [editAlojamientoServicio, setEditAlojamientoServicio] = useState(null);

  useEffect(() => {
    fetchAlojamientosServicios();
    fetchAlojamientos();
    fetchServicios();
  }, []);

  const fetchAlojamientosServicios = () => {
    api.get('/alojamientosServicios/getAllAlojamientoServicios')
      .then(response => {
        setAlojamientosServicios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los alojamientos con servicios:', error);
      });
  };

  const fetchAlojamientos = () => {
    api.get('/alojamiento/getAlojamientos')
      .then(response => {
        setAlojamientos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los alojamientos:', error);
      });
  };

  const fetchServicios = () => {
    api.get('/servicio/getAllServicios')
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los servicios:', error);
      });
  };

  const crearAlojamientoServicio = () => {
    api.post('/alojamientosServicios/createAlojamientoServicio', nuevoAlojamientoServicio)
      .then(response => {
        setAlojamientosServicios([...alojamientosServicios, response.data]);
        setNuevoAlojamientoServicio({
          idAlojamiento: '',
          idServicio: ''
        });
        alert('Relación entre alojamiento y servicio creada exitosamente');
        fetchAlojamientosServicios();
      })
      .catch(error => {
        console.error('Error al crear la relación entre alojamiento y servicio:', error);
        alert('No se pudo crear la relación entre alojamiento y servicio');
      });
  };

  const actualizarAlojamientoServicio = () => {
    if (!editAlojamientoServicio) return;

    api.put(`/alojamientosServicios/updateAlojamientoServicio/${editAlojamientoServicio.idAlojamientoServicio}`, editAlojamientoServicio)
      .then(response => {
        setAlojamientosServicios(alojamientosServicios.map(item =>
          item.idAlojamientoServicio === editAlojamientoServicio.idAlojamientoServicio ? response.data : item
        ));
        setEditAlojamientoServicio(null);
        alert('Relación entre alojamiento y servicio actualizada exitosamente');
        fetchAlojamientosServicios()
      })
      .catch(error => {
        console.error('Error al actualizar la relación entre alojamiento y servicio:', error);
        alert('No se pudo actualizar la relación entre alojamiento y servicio');
      });
  };

  const eliminarAlojamientoServicio = (id) => {
    api.delete(`/alojamientosServicios/deleteAlojamientoServicio/${id}`)
      .then(() => {
        setAlojamientosServicios(alojamientosServicios.filter(item => item.idAlojamientoServicio !== id));
        alert('Relación entre alojamiento y servicio eliminada exitosamente');
      })
      .catch(error => {
        console.error('Error al eliminar la relación entre alojamiento y servicio:', error);
        alert('No se pudo eliminar la relación entre alojamiento y servicio');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAlojamientoServicio({ ...nuevoAlojamientoServicio, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAlojamientoServicio({ ...editAlojamientoServicio, [name]: value });
  };

  const getAlojamientoNombre = (id) => {
    const alojamiento = alojamientos.find(aloj => aloj.idAlojamiento === id);
    return alojamiento ? alojamiento.Titulo : 'Desconocido';
  };

  const getServicioNombre = (id) => {
    const servicio = servicios.find(serv => serv.idServicio === id);
    return servicio ? servicio.Nombre : 'Desconocido';
  };

  return (
    <div className='contenedor-admin'>
      <h1 className='texto-admin' >Alojamientos y Servicios</h1>
      <ul>
        {alojamientosServicios.map(item => (
          <li key={item.idAlojamientoServicio}>
            Alojamiento: {getAlojamientoNombre(item.idAlojamiento)}, Servicio: {getServicioNombre(item.idServicio)}
            <button className='botoncrearalojamiento' onClick={() => eliminarAlojamientoServicio(item.idAlojamientoServicio)}>Eliminar</button>
            <button className='botoneliminareditar1' onClick={() => setEditAlojamientoServicio(item)}>Editar</button>
          </li>
        ))}
      </ul>
      <h2 className='texto-admin2'>Crear nueva relación entre Alojamiento y Servicio</h2>
      <select className='inputipoaloja' name="idAlojamiento" value={nuevoAlojamientoServicio.idAlojamiento} onChange={handleInputChange}>
        <option value="">Seleccionar Alojamiento</option>
        {alojamientos.map(alojamiento => (
          <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
            {alojamiento.Titulo}
          </option>
        ))}
      </select>
      <select className='inputipoaloja' name="idServicio" value={nuevoAlojamientoServicio.idServicio} onChange={handleInputChange}>
        <option value="">Seleccionar Servicio</option>
        {servicios.map(servicio => (
          <option key={servicio.idServicio} value={servicio.idServicio}>
            {servicio.Nombre}
          </option>
        ))}
      </select>
      <button className='botoncrearalojamiento' onClick={crearAlojamientoServicio}>Crear Relación</button>
      
      {editAlojamientoServicio && (
        <div>
          <h2 className='texto-admin2' >Editar relación entre Alojamiento y Servicio</h2>
          <select className='inputipoaloja' name="idAlojamiento" value={editAlojamientoServicio.idAlojamiento} onChange={handleEditChange}>
            <option value="">Seleccionar Alojamiento</option>
            {alojamientos.map(alojamiento => (
              <option key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
                {alojamiento.Titulo}
              </option>
            ))}
          </select>
          <select className='inputipoaloja' name="idServicio" value={editAlojamientoServicio.idServicio} onChange={handleEditChange}>
            <option value="">Seleccionar Servicio</option>
            {servicios.map(servicio => (
              <option key={servicio.idServicio} value={servicio.idServicio}>
                {servicio.Nombre}
              </option>
            ))}
          </select>
          <button className='botoncrearalojamiento' onClick={actualizarAlojamientoServicio}>Actualizar Relación</button>
        </div>
      )}
    </div>
  );
};

export default AlojamientosServicios;