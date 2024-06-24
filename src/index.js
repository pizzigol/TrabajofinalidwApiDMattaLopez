import React from 'react';

import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PaginaPrincipal from './routes/PaginaPrincipal';
import QuienesSomos from './routes/QuienesSomos';
import Contactos from './routes/Contactos';
import Alquileres from './routes/Alquileres';
import Error from './routes/Error';
import Administración from './routes/Administracion';
import Hoteles from './routes/Hoteles';
import Cabañas from './routes/Cabañas';
import Departamentos from './routes/Departamentos';
import Buscador from './routes/Buscador';
import Serviciosweb from './routes/Serviciosweb';
import Imagenesweb from './routes/Imagenesweb';
import Alojamientoweb from './routes/Alojamientoweb';
import AlojamientosyServiciosweb from './routes/AlojamientosyServicioosweb';






import './Componentes/Menu.css';
import './Componentes/Footer.css';
import './Componentes/Hero.css';
import './Componentes/QuienesSomos.css';
import './Componentes/Formulario.css';
import './Componentes/Alquileres.css';
import './Componentes/Contactos.css';
import './Componentes/Alojamientos.css';
import './Componentes/TipoAlojamiento.css';
import './Componentes/Administracion.css';
import './Componentes/CardsCabañas.css'
import './Componentes/imagenes.css';
import './Componentes/Cards.css';
import './Componentes/CardsDepartamento.css';
import './Componentes/ListaAlojamientos.css';
import './Componentes/AlojamientosServicios.css';
import './Componentes/Servicios.css';
import './Componentes/BotonesAdministracion.css';







const router = createBrowserRouter([
  {
     path: '/',
     element: <PaginaPrincipal/>,
     errorElement:<Error/>
  },
  {
    path: '/quienessomos',
    element: <QuienesSomos/>
 },
 {
  path: '/contactos',
  element: <Contactos/>
},
{
  path: '/alquileres',
  element: <Alquileres/>
},
{
  path: '/administracion',
  element: <Administración/>
},
{
  path: '/buscador',
  element: <Buscador/>
},
{
  path: '/hoteles',
  element: <Hoteles/>
},

{
  path: '/cabañas',
  element: <Cabañas/>
},

{
  path: '/departamentos',
  element: <Departamentos/>
},

{
  path: '/serviciosweb',
  element: <Serviciosweb/>
},
{
  path: '/imagenesweb',
  element: <Imagenesweb/>
},
{
  path: '/alojamientoweb',
  element: <Alojamientoweb/>
},
{
  path: '/alojamientosyserviciosweb',
  element: <AlojamientosyServiciosweb/>
},




]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);

reportWebVitals();
