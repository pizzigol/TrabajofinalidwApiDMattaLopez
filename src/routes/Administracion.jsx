import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'
import TiposAlojamiento from '../Componentes/TipoAlojamiento'








export default  function Administracion(){
    return (
        <div>
           <Menu/>
           <body>  
        <div className="contenedor-alojamientos">
            
           <h2 className='textoalojamientos'>Administración de Alojamientos</h2>
             
            <TiposAlojamiento/> 
            
            <h3 className='textoalojamientos3'> Seleccione botón para continuar con los cambios </h3>
            <a href="./Alojamientoweb"><button className='botonalquilereres'>Alojamiento</button></a>
            <a href="./Serviciosweb"><button className='botonalquilereres'>Servicios</button></a>
            <a href="./AlojamientosyServiciosweb"><button className='botonalquilereres'>Alojamientos y  Servicios</button></a>
            <a href="./Imagenesweb"><button className='botonalquilereres'>Imágenes</button></a>
            
            
            
            
            
        
        </div>      
        </body>    
        <Footer/>
          
        </div>
    )
}
