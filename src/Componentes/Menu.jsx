import React from "react";
import { Link } from "react-router-dom";


export default function Menu(){
    return( 
         <header className="hh-header">
           
          
            <div className="hh-header-div">
              <p className="hh-title">Inmobiliaria J&D Alquileres Temporarios</p>
              <img className="hh-imagen-logo"  
              
              src="./casas.jpg"
              alt="logo de casas" /> 
            </div>

            
           <nav className="hh-nav" >
           <ul className="hh-ul" >
              <li className="hh-nav-link" >
              <Link to={"/"}style={{textDecoration: "none"}}>Página Principal</Link>
              </li>  
              <li className="hh-nav-link">
              <Link to={"/quienessomos"}style={{textDecoration: "none"}}>Quienes Somos</Link>
              </li>
              <li className="hh-nav-link">
              <Link to={"/contactos"}style={{textDecoration: "none"}}>Contactos</Link>
              </li>
              <li className="hh-nav-link">
              <Link to={"/alquileres"}style={{textDecoration: "none"}}>Alquileres</Link>
              </li>
              <li className="hh-nav-link">
              <Link to={"/administracion"}style={{textDecoration: "none"}}>Administración</Link>
              </li>
              
              
              
              <li className="hh-nav-link">
              <Link to={"/buscador"}style={{textDecoration: "none"}}>Buscador</Link>
              </li>
              
             
             
            
            
            
            </ul>
            
            </nav>
           
      </header>
     
     
      
    );
}