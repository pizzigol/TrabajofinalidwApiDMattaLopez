
import React from "react"
import { Link } from "react-router-dom"

export default function Hero(){
  
   return( 
    
    
    
    <section className="hero">
        <h1 className="herotexto">Elegí Alojamiento para tus </h1>
        <h1 className="herotexto1"> Vacaciones</h1>
        
        <li className="hh-nav-link-hero">
              <Link to={"/alquileres"} style={{textDecoration: "none"}}>Alquileres</Link>
        </li>
          
         
        
        
        
    </section>


      
    )
}
