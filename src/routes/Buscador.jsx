import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'
import ListaAlojamientos from '../Componentes/ListaAlojamientos'

export default  function Buscador(){
    return (
        
        <div>
            <Menu/>
            <body>  
            <div className="contenedor-alojamientos">
            
           <h2 className='textoalojamientos'>Buscador de Alojamientos</h2>
           
             <ListaAlojamientos/>

             </div>      
             </body>   
            
            
            <Footer/>
            
        </div>
    )
}
