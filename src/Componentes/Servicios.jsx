import  { useState, useEffect } from 'react';
import api from '../api';

const Servicios = () => {
    const [servicios, setServicios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [editid, setEditid] = useState('');


     useEffect(()=>{
        fetchServicios();
     },[]);
     const fetchServicios = ()=>{
        api.get('/servicio/getAllServicios')
        .then(response=>{
            setServicios(response.data)
        })
        .catch(error=>{
           console.error('Error al Obtener los Servicios',error); 
           
        });  
    };
    
    const crearServicio =()=>{
        api.post('/servicio/createServicio',{Nombre:nombre})
        .then(response=>{
            setServicios([...servicios,response.data]);
            setNombre('');
            alert('Servicio Creado Exitosamente');
            fetchServicios();
        })
        .catch(error=>{
            console.error('Error al Crear el Servicio',error);
            alert('Error al Crear el Servicio'); 
            
         });  
    };
                 
    const actualizarServicio =(id)=>{
        api.put(`/servicio/updateServicio/${id}`,{Nombre:nombre})
        .then(response=>{
            fetchServicios();
            setNombre('');
            setEditid(null);
            alert('Servicio Editado Correctamente');
                    

        })
        .catch(error=>{
            console.error('Error al Editar el Servicio',error);
            alert('Error al Editar el Servicio'); 
            
         }); 
    };
    const eliminarServicios = (id) => {
        api.delete(`/servicio/deleteServicio/${id}`)
          .then(() => {
            setServicios(servicios.filter(servicio => servicio.idServicio !== id));
            alert('Se Elimino el Servicio')
          })
          .catch(error => {
            console.error('Error al eliminar el Servicio:', error);
            alert('No se Pudo Eliminar Servicio')
          });
      };
      const handleSubmit = () => {
        if (editid){
            actualizarServicio(editid)
        }
        else {
            crearServicio();
        }
      };

      return(
        <div className="contenedor-admin">
            <h1 className="texto-admin11">Servicios</h1>
            <ul>
               {servicios.map(servicio=>(
                 <li clas key={servicio.idServicio}>
                    {servicio.Nombre}
                    <button className="botoneliminareditar1" onClick={()=>{setNombre(servicio.Nombre); setEditid(servicio.idServicio);}}>Editar</button>
                    <button className="botoneliminareditar2" onClick={()=>{eliminarServicios(servicio.idServicio)}}>Eliminar</button>

                 </li>
               ))} 
            </ul>
            <input className="inputipoaloja" type="text" 
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            placeholder ="Nombre del Servicio"
            />
            <button className="botoncrearalojamiento" onClick={handleSubmit}>{editid ? 'Actualizar' : 'Crear'} Servicio</button>
        </div>
    );

};    
export default Servicios;
