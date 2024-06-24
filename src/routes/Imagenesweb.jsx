import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'
import Imagenes from '../Componentes/Imagenes'
import BotonesAdministracion from '../Componentes/BotonesAdminitracion'


export default  function Imagenesweb(){
    return (
        
        <div>
            <Menu/>
            
             <Imagenes/>
             <BotonesAdministracion/>
            
             
            <Footer/>
            
        </div>
    )
}
