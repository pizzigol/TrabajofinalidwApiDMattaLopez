import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'
import BotonesAdministracion from '../Componentes/BotonesAdminitracion'




import AlojamientosServicios from '../Componentes/AlojamientosServicios'
import { ImPower } from 'react-icons/im'

export default  function AlojamientosyServiciosweb(){
    return (
        
        <div >
            <Menu/>
           
         
       
            
            <AlojamientosServicios/>
            <BotonesAdministracion/>
            
             
            

            
            
            <Footer/>
            
        </div>
    )
}
