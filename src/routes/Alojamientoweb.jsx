import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'
import Alojamientos from '../Componentes/Alojamientos'
import BotonesAdministracion from '../Componentes/BotonesAdminitracion'



export default  function Alojamientoweb(){
    return (
        <div>
           <Menu/>
           <body>  
        <div className="contenedor-alojamientos">
            
           <h2 className='textoalojamientos'>Administración de Alojamientos</h2>
             
            
            <Alojamientos/> 
            <BotonesAdministracion/>
            
            
            
        
        </div>      
        </body>    
        <Footer/>
          
        </div>
    )
}