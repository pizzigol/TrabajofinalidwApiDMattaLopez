import { useState, useEffect } from 'react';
import api from '../api';

const Alojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [alojamientosServicios, setAlojamientosServicios] = useState([]);
  const [nuevoAlojamiento, setNuevoAlojamiento] = useState({
    Titulo: '',
    Descripcion: '',
    Latitud: '',
    Longitud: '',
    PrecioPorDia: '',
    CantidadDormitorios: '',
    CantidadBanios: '',
    Estado: '',
    TipoAlojamiento: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAlojamientos();
    fetchTiposAlojamiento();
    fetchImagenes();
    fetchAlojamientosServicios();
  }, []);

  const fetchAlojamientos = () => {
    api.get('/alojamiento/getAlojamientos')
      .then(response => {
        setAlojamientos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los alojamientos:', error);
      });
  };

  const fetchTiposAlojamiento = () => {
    api.get('/tiposAlojamiento/getTiposAlojamiento')
      .then(response => {
        setTiposAlojamiento(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los tipos de alojamiento:', error);
      });
  };
  const fetchImagenes = () => {
    api.get('/imagen/getAllImagenes')
      .then(response => {
        setImagenes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las imágenes:', error);
      });
  };

  const fetchAlojamientosServicios = () => {
    api.get('/alojamientosServicios/getAllAlojamientoServicios')
      .then(response => {
        setAlojamientosServicios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las relaciones entre alojamientos y servicios:', error);
      });
  };

  const crearAlojamiento = () => {
    const data = {
      ...nuevoAlojamiento,
      TipoAlojamiento: parseInt(nuevoAlojamiento.TipoAlojamiento, 10),
      Latitud: parseFloat(nuevoAlojamiento.Latitud),
      Longitud: parseFloat(nuevoAlojamiento.Longitud),
      PrecioPorDia: parseFloat(nuevoAlojamiento.PrecioPorDia),
      CantidadDormitorios: parseInt(nuevoAlojamiento.CantidadDormitorios, 10),
      CantidadBanios: parseInt(nuevoAlojamiento.CantidadBanios, 10)
    };
    api.post('/alojamiento/createAlojamiento', data)
      .then(response => {
        setAlojamientos([...alojamientos, response.data]);
        resetFormulario();
        alert('Alojamiento creado exitosamente');
        fetchAlojamientos();
      })
      .catch(error => {
        console.error('Error al crear el alojamiento:', error);
        alert('No se pudo crear el alojamiento');
      });
  };

  const actualizarAlojamiento = (id) => {
    const data = {
      ...nuevoAlojamiento,
      TipoAlojamiento: parseInt(nuevoAlojamiento.TipoAlojamiento, 10),
      Latitud: parseFloat(nuevoAlojamiento.Latitud),
      Longitud: parseFloat(nuevoAlojamiento.Longitud),
      PrecioPorDia: parseFloat(nuevoAlojamiento.PrecioPorDia),
      CantidadDormitorios: parseInt(nuevoAlojamiento.CantidadDormitorios, 10),
      CantidadBanios: parseInt(nuevoAlojamiento.CantidadBanios, 10)
    };

    api.put(`/alojamiento/putAlojamiento/${id}`, data)
      .then(response => {
        fetchAlojamientos();
        resetFormulario();
        alert('Alojamiento actualizado exitosamente');
        fetchAlojamientos();
      })
      .catch(error => {
        console.error('Error al actualizar el alojamiento:', error);
        alert('No se pudo actualizar el alojamiento');
      });
  };

  const eliminarAlojamiento = (idAlojamiento) => {
    const imagenesAEliminar = imagenes.filter(img => img.idAlojamiento === idAlojamiento);
    const serviciosAEliminar = alojamientosServicios.filter(as => as.idAlojamiento === idAlojamiento);

    // Eliminar imágenes asociadas
    Promise.all(imagenesAEliminar.map(img => api.delete(`/imagen/deleteImagen/${img.idImagen}`)))
      .then(() => {
        // Eliminar relaciones de servicios asociadas
        return Promise.all(serviciosAEliminar.map(as => api.delete(`/alojamientosServicios/deleteAlojamientoServicio/${as.idAlojamientoServicio}`)));
      })
      .then(() => {
        // Después de eliminar las imágenes y servicios, eliminar el alojamiento
        return api.delete(`/alojamiento/deleteAlojamiento/${idAlojamiento}`);
      })
      .then(() => {
        setAlojamientos(alojamientos.filter(alojamiento => alojamiento.idAlojamiento !== idAlojamiento));
        setImagenes(imagenes.filter(img => img.idAlojamiento !== idAlojamiento));
        setAlojamientosServicios(alojamientosServicios.filter(as => as.idAlojamiento !== idAlojamiento));
        alert('Alojamiento, imágenes y servicios asociados eliminados exitosamente');
    })
    .catch(error => {
      console.error('Error al eliminar el alojamiento o sus dependencias:', error);
      alert('No se pudo eliminar el alojamiento o sus dependencias');
    });
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNuevoAlojamiento({ ...nuevoAlojamiento, [name]: value });
};

const handleSubmit = () => {
  if (editId) {
    actualizarAlojamiento(editId);
  } else {
    crearAlojamiento();
  }
};

const resetFormulario = () => {
  setNuevoAlojamiento({
    Titulo: '',
    Descripcion: '',
    Latitud: '',
    Longitud: '',
    PrecioPorDia: '',
    CantidadDormitorios: '',
    CantidadBanios: '',
    Estado: '',
    TipoAlojamiento: ''
  });
  setEditId(null);
};

const iniciarEdicion = (alojamiento) => {
  setNuevoAlojamiento({
    Titulo: alojamiento.Titulo,
    Descripcion: alojamiento.Descripcion,
    Latitud: alojamiento.Latitud,
    Longitud: alojamiento.Longitud,
    PrecioPorDia: alojamiento.PrecioPorDia,
    CantidadDormitorios: alojamiento.CantidadDormitorios,
    CantidadBanios: alojamiento.CantidadBanios,
    Estado: alojamiento.Estado,
    TipoAlojamiento: alojamiento.TipoAlojamiento
});
setEditId(alojamiento.idAlojamiento);
};

return (
<div className='Alojamientoscomponente'>
  <h1 className='textoalojamiento'>Alojamientos</h1>
  <ul className='listacontenedor'>
    {alojamientos.map(alojamiento => (
      <li className='listaAlojamiento' key={alojamiento.idAlojamiento}>
        {alojamiento.Titulo} - {alojamiento.Estado}
        <button className='botonElimAlojamiento' onClick={() => iniciarEdicion(alojamiento)}>Editar</button>
        <button className='botonElimAlojamiento' onClick={() => eliminarAlojamiento(alojamiento.idAlojamiento)}>Eliminar</button>
      </li>
    ))}
  </ul>
  <h2 className='textoAlojamiento2' >{editId ? 'Editar Alojamiento' : 'Crear nuevo Alojamiento'}</h2>
  <input className='titulo' type="text" name="Titulo" value={nuevoAlojamiento.Titulo} onChange={handleInputChange} placeholder="Título" />
  <input type="text" name="Descripcion" value={nuevoAlojamiento.Descripcion} onChange={handleInputChange} placeholder="Descripción" />
  <input type="number" step="0.00000001" name="Latitud" value={nuevoAlojamiento.Latitud} onChange={handleInputChange} placeholder="Latitud" />
  <input type="number" step="0.00000001" name="Longitud" value={nuevoAlojamiento.Longitud} onChange={handleInputChange} placeholder="Longitud" />
  <input type="number" step="0.01" name="PrecioPorDia" value={nuevoAlojamiento.PrecioPorDia} onChange={handleInputChange} placeholder="Precio por día" />
  <input type="number" name="CantidadDormitorios" value={nuevoAlojamiento.CantidadDormitorios} onChange={handleInputChange} placeholder="Dormitorios" />
  <input type="number" name="CantidadBanios" value={nuevoAlojamiento.CantidadBanios} onChange={handleInputChange} placeholder="Baños" />
  <select className='selecestado' name="Estado" value={nuevoAlojamiento.Estado} onChange={handleInputChange}>
    <option value="">Seleccionar Estado</option>
    <option value="Disponible">Disponible</option>
    <option value="Reservado">Reservado</option>
  </select>
  <select className='selecTipoAlojamiento' name="TipoAlojamiento" value={nuevoAlojamiento.TipoAlojamiento} onChange={handleInputChange}>
    <option value="">Seleccionar Tipo de Alojamiento</option>
    {tiposAlojamiento.map(tipo => (
          <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>
            {tipo.Descripcion}
          </option>
        ))}
      </select>
      <button className='botonCrearAlojamiento' onClick={handleSubmit}>{editId ? 'Actualizar' : 'Crear'} Alojamiento</button>
      {editId && <button onClick={resetFormulario}>Cancelar</button>}
    </div>
  );
};

export default Alojamientos;
