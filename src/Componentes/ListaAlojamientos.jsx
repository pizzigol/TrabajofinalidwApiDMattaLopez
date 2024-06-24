import  { useState, useEffect } from 'react';
import api from '../api'



const ListaAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [alojamientosServicios, setAlojamientosServicios] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [filtros, setFiltros] = useState({
    tipoAlojamiento: '',
    disponibilidad: '',
    precioMin: '',
    precioMax: '',
    cantidadDormitorios: '',
    cantidadBanios: '',
    servicio: ''
  });

  useEffect(() => {
    fetchAlojamientos();
    fetchTiposAlojamiento();
    fetchServicios();
    fetchAlojamientosServicios();
    fetchImagenes();
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

  const fetchServicios = () => {
    api.get('/servicio/getAllServicios')
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los servicios:', error);
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

  const fetchImagenes = () => {
    api.get('/imagen/getAllImagenes')
      .then(response => {
        setImagenes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las imágenes:', error);
      });
  };

  const getImagen = (idAlojamiento) => {
    const imagen = imagenes.find(img => img.idAlojamiento === idAlojamiento);
    return imagen ? `/imagenes/${imagen.RutaArchivo}` : '/imagenes/default.jpg';
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const alojamientosFiltrados = alojamientos.filter(alojamiento => {
    const tieneServicio = filtros.servicio ? 
      alojamientosServicios.some(as => as.idAlojamiento === alojamiento.idAlojamiento && as.idServicio === parseInt(filtros.servicio)) : 
      true;

    return (
      tieneServicio &&
      (filtros.tipoAlojamiento ? alojamiento.TipoAlojamiento === parseInt(filtros.tipoAlojamiento) : true) &&
      (filtros.disponibilidad ? alojamiento.Estado === filtros.disponibilidad : true) &&
      (filtros.precioMin ? alojamiento.PrecioPorDia >= parseFloat(filtros.precioMin) : true) &&
      (filtros.precioMax ? alojamiento.PrecioPorDia <= parseFloat(filtros.precioMax) : true) &&
      (filtros.cantidadDormitorios ? alojamiento.CantidadDormitorios === parseInt(filtros.cantidadDormitorios) : true) &&
      (filtros.cantidadBanios ? alojamiento.CantidadBanios === parseInt(filtros.cantidadBanios) : true)
    );
  });

  return (
    <div className="lista-alojamientos-container">
      <h1>Lista de Alojamientos</h1>
      <div className="filtro">
        <select className='tipoAlojamiento' name="tipoAlojamiento" value={filtros.tipoAlojamiento} onChange={handleFiltroChange}>
          <option value="">Todos los tipos</option>
          {tiposAlojamiento.map(tipo => (
            <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>
              {tipo.Descripcion}
            </option>
          ))}
        </select>
        <select className='disponibilidad' name="disponibilidad" value={filtros.disponibilidad} onChange={handleFiltroChange}>
          <option value="">Disponibilidad</option>
          <option value="Disponible">Disponible</option>
          <option value="Reservado">Reservado</option>
        </select>
        <input className='input'
          type="number"
          name="precioMin"
          value={filtros.precioMin}
          onChange={handleFiltroChange}
          placeholder="Precio mínimo"
        />
        <input className='input'
          type="number"
          name="precioMax"
          value={filtros.precioMax}
          onChange={handleFiltroChange}
          placeholder="Precio máximo"
        />
        <input className='input'
          type="number"
          name="cantidadDormitorios"
          value={filtros.cantidadDormitorios}
          onChange={handleFiltroChange}
          placeholder="Dormitorios"
        />
        <input className='input'
          type="number"
          name="cantidadBanios"
          value={filtros.cantidadBanios}
          onChange={handleFiltroChange}
          placeholder="Baños"
        />
        <select className='todoslosservicios'  name="servicio" value={filtros.servicio} onChange={handleFiltroChange}>
          <option  value="">Todos los servicios</option>
          {servicios.map(servicio => (
            <option key={servicio.idServicio} value={servicio.idServicio}>
              {servicio.Nombre}
            </option>
          ))}
        </select>
        <button className='botonfiltrar' onClick={() => setFiltros({ ...filtros })}>Filtrar</button>
      </div>
      <div className="lista-alojamientos">
        {alojamientosFiltrados.map(alojamiento => (
          <div key={alojamiento.idAlojamiento} className="alojamiento-card">
            <img src={getImagen(alojamiento.idAlojamiento)} alt={`Imagen de ${alojamiento.Titulo}`} className="alojamiento-imagen" />
            <div className="alojamiento-info">
              <h2>{alojamiento.Titulo}</h2>
              <p>{alojamiento.Descripcion}</p>
              <p><strong>Precio por día:</strong> ${alojamiento.PrecioPorDia}</p>
              <p><strong>Estado:</strong> {alojamiento.Estado}</p>
              <p><strong>Dormitorios:</strong> {alojamiento.CantidadDormitorios}</p>
              <p><strong>Baños:</strong> {alojamiento.CantidadBanios}</p>
              <p><strong>Servicios:</strong> {alojamientosServicios
                .filter(as => as.idAlojamiento === alojamiento.idAlojamiento)
                .map(as => servicios.find(servicio => servicio.idServicio === as.idServicio)?.Nombre)
                .filter(Boolean)
                .join(', ')
              }</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaAlojamientos;


/*const ListaAlojamientos =()=>{
    const [alojamientos, setAlojamientos] = useState([]);
    const [tiposAlojamiento, setTipoAlojamiento] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [alojamientosServicios, setAlojamientosServicios] = useState([]);
    const [imagenes, setImagenes] = useState([]);
    const [filtros, setFiltros] = useState({
        tipoAlojamiento:'',
        disponibilidad:'',
        precioMin:'',
        precioMax:'',
        cantidadDormitorios:'',
        cantidadBaños:'',
        servicio:''
    });
    useEffect(()=>{
        fetchImagenes();
        fetchAlojamientos();
        fetchTiposAlojamientos();
        fetchAlojamientosServicios();
        fetchServicios();
     },[]);

     const fetchServicios = () => {
      api.get('/servicio/getAllServicios')
        .then(response => {
          setServicios(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los servicios:', error);
        });
    };

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
     const fetchImagenes = ()=>{
        api.get('/imagen/getAllImagenes')
        .then(response=>{
            setImagenes(response.data)
            console.log(response.data)
        })
        .catch(error=>{
           console.error('Error al Obtener las Imagenes',error); 
           
        });  
    };
    const fetchTiposAlojamientos = () => {   /*obtenemos tipos de alojamientos*/
        /*api.get('/tiposAlojamiento/getTiposAlojamiento')
          .then(response => {
            setTipoAlojamiento(response.data);
          })
          .catch(error => {
            console.error('Error al obtener los Tipos de alojamientos:', error);
          });
      };

      const getImagen = (idAlojamiento)=>{
            
        const imagen = imagenes.find(a => a.idAlojamiento === idAlojamiento)
        return imagen ? `/imagenes/${imagen.RutaArchivo}` : '/imagenes/SinFoto.jpg';
    }; 
    const handleFiltroChange= (event) =>{
        const{name,value} = event.target;
        setFiltros({...filtros,[name]:value})
      }
    
    const alojamientosFiltrados = alojamientos.filter(alojamiento =>{
             const tieneServicio = filtros.servicio ?
             alojamientosServicios.some(i=>i.idAlojamiento===alojamiento.idAlojamiento && i.idServicio===parseInt(filtros.servicio)) :
             true;
             
        return (
            (filtros.tipoAlojamiento ? alojamiento.TipoAlojamiento === parseInt(filtros.tipoAlojamiento): true )&& /*if y transforma parset entero*/
           /* (filtros.disponibilidad ? alojamiento.Estado === filtros.disponibilidad: true )&& 
            (filtros.precioMin ? alojamiento.PrecioPorDia >= parseFloat(filtros.precioMin): true )&& 
            (filtros.precioMax ? alojamiento.PrecioPorDia <= parseFloat(filtros.precioMax): true )&&
            (filtros.cantidadDormitorios ? alojamiento.CantidadDormitorios === parseInt(filtros.cantidadDormitorios): true )&& 
            (filtros.cantidadBaños ? alojamiento.CantidadBanios === parseInt(filtros.cantidadBaños): true )


        );


    });
    
    return (
        <div className="lista-alojamientos-container">*/
        {/*<h1 className='listatexto'>Lista de Alojamientos</h1>*/}
        /*  <div className="filtro">
            <select className='tipoAlojamiento' name="tipoAlojamiento" value={filtros.tipoAlojamiento} onChange={handleFiltroChange}>
              <option  value="">Todos los tipos</option>
              {tiposAlojamiento.map(tipo => (
                <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>
                  {tipo.Descripcion}
                </option>
              ))}
            </select>
            <select className='disponibilidad' name="disponibilidad" value={filtros.disponibilidad} onChange={handleFiltroChange}>
              <option value="">Disponibilidad</option>
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
            </select>
            <input className='input'
              type="number"
              name="precioMin"
              value={filtros.precioMin}
              onChange={handleFiltroChange}
              placeholder="Precio mínimo"
            />
            <input className='input'
              type="number"
              name="precioMax"
              value={filtros.precioMax}
              onChange={handleFiltroChange}
              placeholder="Precio máximo"
            />
            <input className='input'
              type="number"
              name="cantidadDormitorios"
              value={filtros.cantidadDormitorios}
              onChange={handleFiltroChange}
              placeholder="Dormitorios"
            />
            <input className='input'
              type="number"
              name="cantidadBaños"
              value={filtros.cantidadBaños}
              onChange={handleFiltroChange}
              placeholder="Baños"
            />
            <select  className='input' 
              name="servicio"
              value={filtros.servicio}
              onChange={handleFiltroChange}>
              <option value="">Todos los Servicios</option>
              {servicios.map(servicio=>(
                <option key={servicio.idServicio} value={servicio.idServicio}>
                  {servicio.Nombre}
                </option>
              ))}
            </select>
            
            <button className='botonfiltrar' onClick={() => setFiltros({ ...filtros })}>Filtrar</button>
          </div>
          <div className="lista-alojamientos">
            {alojamientosFiltrados.map(alojamiento => (
              <div key={alojamiento.idAlojamiento} className="alojamiento-card">
                <img src={getImagen(alojamiento.idAlojamiento)} alt={`Imagen de ${alojamiento.Titulo}`} className="alojamiento-imagen" />
                <div className="alojamiento-info">
                  <h2>{alojamiento.Titulo}</h2>
                  <p>{alojamiento.Descripcion}</p>
                  <p><strong>Precio por día:</strong> ${alojamiento.PrecioPorDia}</p>
                  <p><strong>Estado:</strong> {alojamiento.Estado}</p>
                  <p><strong>Dormitorios:</strong> {alojamiento.CantidadDormitorios}</p>
                  <p><strong>Baños:</strong> {alojamiento.CantidadBanios}</p>
                  <p><strong>Servicios:</strong> {alojamientosServicios
                   .filter(i=>i.idAlojamiento===alojamiento.idAlojamiento)
                   .map(i=>servicios.find(s=>s.idServicio===i.idServicio)?.Nombre)/*comparo*/
                  /* .filter(Boolean)/*manda mensaje a react si es verdadero o falso*/
                 /*  .join(', ')/*estetico*/
                /*  }</p>

                </div>
              </div>
            ))}
          </div>
        </div>
      );
    
   
};
export default ListaAlojamientos;*/

