import { useState, useEffect } from "react";
import api from "../api";



const TiposAlojamiento =()=>{
    const[tipos,setTipos]= useState([]);
    const[descripcion,setDescripcion] = useState('');
    const[editId,setEditId]= useState(null);
    useEffect(()=>{
        fetchTipos();
    }, []);
    const fetchTipos =()=>{
        api.get('/tiposAlojamiento/getTiposAlojamiento')
        .then(response =>{
            setTipos(response.data);
        })
        .catch(error=>{
            console.error('Error al obtener los Datos',error);
        });
    };
    const crearTipoAlojamiento =()=>{
        api.post('/tiposAlojamiento/createTipoAlojamiento',{Descripcion: descripcion })
        .then(response =>{
            setTipos([...tipos,response.data]);
            fetchTipos();/*actualiza pagina*/
            setDescripcion('');
            
            alert('Se Creo Exitosamente')/*alerta*/

        })
        .catch(error=>{
            console.error('Error al Crear',error);
            alert('Error al Crear')/*alerta*/
        });
    }

    const actualizarTipoAlojamiento =(id)=>{
        api.put(`/tiposAlojamiento/putTipoAlojamiento/${id}`,{Descripcion: descripcion })
        .then(response =>{
            fetchTipos();
            setDescripcion('');
            setEditId(null);
            alert('Se Actualizo Exitosamente')/*alerta*/
        
        })
        
        
        .catch(error=>{
            console.error('Error al Actualizar',error);
            alert('Error al Actualizar')/*alerta*/
        
        });

   }

   const eliminarTipoAlojamiento =(id)=>{
    api.delete(`/tiposAlojamiento/deleteTipoAlojamiento/${id}`)
    .then( ()=>{
        setTipos(tipos.filter(tipo=>tipo.id !== id))
        fetchTipos();
        alert('Se Elimino Exitosamente')/*alerta*/
    
    })
    
    
    .catch(error=>{
        console.error('Error al Eliminar',error);
        alert('Error al Eliminar')/*alerta*/
    });

     
    }
    const handleSubmit=()=>{
        if (editId){
            actualizarTipoAlojamiento(editId);
            
        }else{
            crearTipoAlojamiento();
        }
    };

    return(
        <div className="contenedor-admin">
            <h1 className="texto-admin">Tipos de Alojamientos</h1>
            <ul>
               {tipos.map(tipo=>(
                 <li clas key={tipo.idTipoAlojamiento}>
                    {tipo.Descripcion}
                    <button className="botoneliminareditar1" onClick={()=>{setDescripcion(tipo.Descripcion); setEditId(tipo.idTipoAlojamiento);}}>Editar</button>
                    <button className="botoneliminareditar2" onClick={()=>{eliminarTipoAlojamiento(tipo.idTipoAlojamiento)}}>Eliminar</button>

                 </li>
               ))} 
            </ul>
            <input className="inputipoaloja" type="text" 
            value={descripcion}
            onChange={(e)=>setDescripcion(e.target.value)}
            placeholder ="Descripción Tipo de Alojamiento"
            />
            <button className="botoncrearalojamiento" onClick={handleSubmit}>{editId ? 'Actualizar' : 'Crear'} Tipo de Alojamiento</button>
        </div>
    );

};    
export default TiposAlojamiento;

