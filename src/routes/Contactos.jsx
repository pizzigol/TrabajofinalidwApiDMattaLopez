import { useState } from 'react'
import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'
import Formulario from '../Componentes/Formulario'






export default  function Contactos(){

  
    
  return (
    <div className='contacto'>
        <Menu/>
        <Formulario/>
       
        <div className="contenedor">
         
         
         
         <h2 className="textcontactos">Contactos</h2>

          <ul className="listacontactos">
            
            <li>👉 Dirección  Córdoba 1800 Rosario 2000  Santa Fe</li>
            <li>👉 Teléfono  431455632</li>
            <li>👉 WhatsApp  +549341455633</li>
            <li>👉 Instagram@InmobiliariaJ&D</li>
            
          </ul>
         
         <form action="https://maps.app.goo.gl/755mFCY44Lmn1bTz7"target="_blank">
           <button className="botonparadireccion">Ubicación</button>
           
         </form>
        
        


         <div class="mapa-imagen">
        
         <a href="https://maps.app.goo.gl/755mFCY44Lmn1bTz7"target="_blank">
         <img src="./mapa.jpg"
         alt="mapa"
         width="150"
         height="100"/>
         </a>
         </div>
         
         
      </div> 
      
   <Footer/>

        
    </div>
          )
}
