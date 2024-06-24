import React from 'react'
import Menu from '../Componentes/Menu'
import Footer from '../Componentes/Footer'





export default  function Alquileres(){
    return (
        <div>
           <Menu/>
         
           
        <body>  
        <div className="contenedor-alojamientos">
            
           <h2 className='textoalojamientos'>Nuestros Alojamientos</h2>
             
            <div className='imagenhoteles'>
            <a href="./Hoteles"><button className='botonalquilereres'>Hoteles</button></a>
            
             
            </div>
            <p className='parrafoalquileres'>
¡Encuentra tu alojamiento ideal con nosotros!
¿Estás buscando el lugar perfecto para tus próximas vacaciones o viaje de negocios? ¡No busques más! , 
te ofrecemos una amplia selección de hoteles en todo la Argentina para que encuentres el que mejor se adapte a tus necesidades y presupuesto.

Explora nuestra amplia gama de opciones:

Hoteles de ciudad: Disfruta del corazón de las principales ciudades de Argentina con nuestros hoteles céntricos y llenos de estilo.
Hoteles de playa: Relájate en las mejores playas de nuestro hermoso territorio con nuestros hoteles frente al mar.
Hoteles de montaña: Vive una experiencia única en la naturaleza con nuestros hoteles en las montañas y en las sierras. </p>
            
            <div className='imagencabañas'>
            <a href="./cabañas"><button className='botonalquilereres'>Cabañas</button></a>
            
            </div>
            
            <p className='parrafoalquileres'>¿Sueñas con una escapada tranquila a la naturaleza? ¿Buscas un refugio acogedor para tus próximas vacaciones en familia o con amigos?, te ofrecemos una experiencia 
            única en nuestras cabañas de alquiler en los rincones más bellos de Argentina!

Vive una experiencia inolvidable en cabañas para todos los gustos:

Cabañas en la montaña y en las sierras : Rodeadas de imponentes paisajes cordilleranos, ideales para amantes del senderismo, trekking y actividades al aire libre.
Cabañas en el lago: Disfruta de la tranquilidad de la vida junto al lago, perfectas para pesca, navegación y deportes acuáticos.
Cabañas en el bosque y el mar: Sumérgete en la magia del bosque nativo, y hermosas playas ideales para el descanso y la conexión con la naturaleza.</p>
            
            <div className='imagendepartamentos'>
            <a href="./departamentos"><button className='botonalquilereres'>Departamentos</button></a>
           
            </div>

            <p className='parrafoalquileres'>¿Estás buscando un alojamiento cómodo y flexible para tu próxima estadía en Argentina? ¡No busques más!, te ofrecemos una amplia selección de departamentos en alquiler temporario en las mejores ciudades del país.

Disfruta de la comodidad de un hogar lejos de casa:

Amplia variedad de departamentos: Contamos con departamentos de varias habitaciones, para que encuentres el espacio perfecto para ti, ya sea que viajes solo, en pareja, en familia o con amigos.
Ubicaciones privilegiadas: Nuestros departamentos se encuentran en las zonas más convenientes de cada ciudad, cerca de atracciones turísticas, centros comerciales, medios de transporte y todo lo que necesitas para una estadía confortable.
Equipamiento completo: Todos nuestros departamentos están totalmente equipados con cocina, electrodomésticos, ropa de cama, toallas y todo lo necesario para que te sientas como en casa.</p>
            </div>      
        </body>  
        <Footer/>
          
        </div>
    )
}
