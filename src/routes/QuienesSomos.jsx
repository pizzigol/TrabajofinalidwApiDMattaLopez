import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'

export default  function QuienesSomos(){
    return (
        
        <div>
            <Menu/>
            <section className="quienes-somos">
               <div className="contenedor2"> {/*div contenedor tiene dos div para que 
               cada uno se piense como una columna y poder 
                ubicar imagen a la izq y a la derecha el texto*/}
               <div className="imagen-quienessomos"></div>
         
         <div className="texto">
            
            <h2 >Inmobiliaria J&D</h2>
            <p className='parrafo1'>LOS AÑOS PASAN...
              NOSOTROS SEGUIMOS...USTEDES NOS ELIGEN...
              LOS SUEÑOS SE CONCRETAN.<p/>
<p className='parrafo2'>
Por ser una firma familiar y lider, de gran trayectoria por los años de trabajo en la zona, y contando con una amplia experiencia de nuestro personal, quienes concocen a profundidad 
los requerimientos del mercado inmobiliario y teniendo una extensa lista de inmuebles para ofrecerles, la cual es actualizada constantemente para que nuestros clientes se aseguren una inversión confiable y favorable; es que lo invitamos a que nos conozca y nos consulte antes de realizar cualquier operación inmobiliaria, asegurándose así que su inversión sea la más favorable.
Y si ya nos conoce, le agradecemos la confianza y lealtad que nos ha brindado todos estos años.
La firma nació en 1990, creció junto a usted, y seguira creciendo para asegurales un buen futuro en sus próximas operaciones.</p>
</p>                
         </div>
         </div> 
          </section>     
            
            
            <Footer/>
            
        </div>
    )
}
