import  { useState, useEffect } from 'react';
import api from '../api'


const Imagenes = () => {
    const [imagenes, setImagenes] = useState([]);
    const [nombreImagen, setNombreImagen] = useState({
        idAlojamiento:'',
        RutaArchivo:''
    });
    const [editid, setEditid] = useState('');

    const [alojamientos, setAlojamientos] = useState([]);


     useEffect(()=>{
        fetchImagenes();
        fetchAlojamientos();
     },[]);
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
    
    const crearImagen =()=>{
        api.post('/imagen/createImagen',nombreImagen)
        .then(response=>{
            setImagenes([...imagenes,response.data]);
            
            fetchImagenes();
            resetFormulario();
            alert('Imagen Creada Exitosamente');
            
        })
        .catch(error=>{
            console.error('Error al Crear la Imagen',error);
            alert('Error al Crear la imagen'); 
            
         });  
    };

    const actualizarImagen =(id)=>{
        api.put(`/imagen/updateImagen/${id}`,nombreImagen)
        .then(response=>{
            fetchImagenes();
            resetFormulario();
           
            alert('Imagen Editada Correctamente');
         

        })
        .catch(error=>{
            console.error('Error al Editar la Imagen',error);
            alert('Error al Editar la Imagen'); 
            
         }); 
    };
    const eliminarImagenes = (id) => {
        api.delete(`/imagen/deleteImagen/${id}`)
          .then(() => {
            setImagenes(imagenes.filter(imagen => imagen.idImagen !== id));
            alert('Se Elimino la Imagen')
          })
          .catch(error => {
            console.error('Error al eliminar la Imagen:', error);
            alert('No se Pudo Eliminar la Imagen')
          });
      };
      const handleSubmit = () => {
        if (editid){
            actualizarImagen(editid)
        }
        else {
            crearImagen();
        }
      };
        const handleInputChange= (event) =>{
          const{name,value} = event.target;
          setNombreImagen({...nombreImagen,[name]:value})
        }
        const resetFormulario =() =>{
            setNombreImagen({
                idAlojamiento:'',
                RutaArchivo:''
            });
            setEditid(null)

        }
        const iniciarEdicion = (imagen)=>{
            setNombreImagen({
                idAlojamiento: imagen.idAlojamiento,
                RutaArchivo: imagen.RutaArchivo
            });
            setEditid(imagen.idImagen);
        }
        const getAlojamientoNombre = (id)=>{
             
            const alojamiento = alojamientos.find(a => a.idAlojamiento === id)
            return alojamiento ? alojamiento.Titulo: 'desconocido';
        }; 
      
        return(
        <div className="contenedor-admin">
            <h1 className="texto-admin">Imágenes</h1>
            <ul >
               {imagenes.map(imagen=>(
                 <li className='rutaiamgenes'  key={imagen.idImagen}>
                 Alojamiento:{getAlojamientoNombre(imagen.idAlojamiento)}, ruta:{imagen.RutaArchivo}

                   <img className='imagenhotcabdept' src={`./Imagenes/${imagen.RutaArchivo} `}alt="Imagen no Encontrada" /> {/*classname aca */}
                    
                    
                    <button className="botoneliminareditar1" onClick={()=> iniciarEdicion(imagen)}>Editar Imagen</button>
                    <button className="botoneliminareditar2" onClick={()=>{eliminarImagenes(imagen.idImagen)}}>Eliminar Imagen</button>

                 </li>
               ))} 
            </ul>
            <h2 className="texto-admin1" >{editid ? 'Editar Imagen' : 'Crear nueva Imagen'}</h2>
            <select className='imagselec' name="idAlojamiento" value={nombreImagen.idAlojamiento} onChange={handleInputChange}>
            <option value="">Seleccionar Alojamiento</option>
             {alojamientos.map(alojamiento => (
             <option  key={alojamiento.idAlojamiento} value={alojamiento.idAlojamiento}>
            {alojamiento.Titulo}
            </option>
        ))}
      </select>
      <input
        type="text"
        name="RutaArchivo"
        value={nombreImagen.RutaArchivo}
        onChange={handleInputChange}
        placeholder="Ruta de Imagen (ej. img.jpg)"
      />
      <button className='botoncrearalojamiento' onClick={handleSubmit}>{editid ? 'Actualizar' : 'Crear'} Imagen</button>
      {editid && <button onClick={resetFormulario}>Cancelar</button>}
        </div>
    );

};    
export default Imagenes;
