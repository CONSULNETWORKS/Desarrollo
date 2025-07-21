import { useAuth } from '../services/AuthContext';

// project imports
import MainLayout from '../layout/MainLayout/index.jsx';

// administrador routing

// utilities routing

// Inicio
import Inicio from '@/layout/Inicio/Inicio/Index.jsx';
import AccesosRapidos from '@/layout/Inicio/Accesos Rapidos/Index.jsx'

// Infraestructura y Tecnologia


//CLientes y Servicios


//Operaciones Internas


// Inteligencia Artificial y Analisis


// Gestion de Usuarios
import Administracion from '@/layout/Gestion de Usuarios/Administración General/Index.jsx'
import Seguridad from '@/layout/Gestion de Usuarios/Seguridad y Control de Accesos/Index.jsx'
import Perfil from '../layout/Gestion de Usuarios/Perfil y Personalizacion/Index.jsx'
import Seguimiento from '../layout/Gestion de Usuarios/Estadisticas y Seguimiento/Index.jsx'

//Comunicacion
import Chats from '../layout/Comunicación/Mensajeria y Chats/Index.jsx'
import SoporteC from '../layout/Comunicación/Soporte y Colaboracion/Index.jsx'
import Foros from '../layout/Comunicación/Foros y Comunicaciones/Index.jsx'
import Alertas from '../layout/Comunicación/Reuniones y Alertas/Index.jsx'

//Gestion financiera


//Gobierno TIC


//Formación y Capacitación
import Plataforma from '../layout/Formación y Capacitacion/Plataforma de Aprendizaje/Index.jsx'
import Evaluacion from '../layout/Formación y Capacitacion/Evaluacion y Seguimiento/Index.jsx'
import Recursos from '../layout/Formación y Capacitacion/Recursos y Soporte/Index.jsx'

//Recursos Humanos


//Configuración y Apariencia


//Integraciones


//Seguridad


//Laboratorio de Innovación


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = () => {
  const { isAdmin, isUser, isAdministradorCNW } = useAuth();

  const adminRoutes = isAdmin ? [

    {
      path: 'usuarios',
      children: [
        { path: 'administracion', element: <Administracion /> },
        { path: 'seguridad', element: <Seguridad /> },
        { path: 'perfil', element: <Perfil /> },
        { path: 'seguimiento', element: <Seguimiento /> },
      ],
    },
    {
      path: 'comunicacion',
      children: [
        { path: 'chats', element: <Chats /> },
        { path: 'soporte', element: <SoporteC /> },
        { path: 'foros', element: <Foros /> },
        { path: 'alertas', element: <Alertas /> },
      ],
    },

    {
      path: 'capacitacion',
      children: [
        { path: 'plataforma', element: <Plataforma /> },
        { path: 'evaluacion', element: <Evaluacion /> },
        { path: 'recursos', element: <Recursos /> },
      ],
    },
  ] : [];

  const CNWRoutes = isAdministradorCNW ? [
    {
      path: 'CNW-dashboard',
      children: [
        { path: 'gestion-usuarios-CNW', element: <Administracion /> },
      ],
    },
    {
      path: 'usuarios',
      children: [
        { path: 'administracion', element: <Administracion /> },
        { path: 'seguridad', element: <Seguridad /> },
        { path: 'perfil', element: <Perfil /> },
        { path: 'seguimiento', element: <Seguimiento /> },
      ],
    },
    {
      path: 'comunicacion',
      children: [
        { path: 'chats', element: <Chats /> },
        { path: 'soporte', element: <SoporteC /> },
        { path: 'foros', element: <Foros /> },
        { path: 'alertas', element: <Alertas /> },
      ],
    },
    {
      path: 'capacitacion',
      children: [
        { path: 'plataforma', element: <Plataforma /> },
        { path: 'evaluacion', element: <Evaluacion /> },
        { path: 'recursos', element: <Recursos /> },
      ],
    },
  ] : [];

  const userRoutes = isUser ? [
    {
      path: 'dashboard',
      children: [{ path: 'statistics', element: <Inicio /> }],
    },
  ] : [];

  return {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Inicio /> },
      // Condición para incluir las rutas de Administrador General
      ...adminRoutes,
      // Condición para incluir las rutas de Administrador CNW
      ...CNWRoutes,
      // Rutas para usuarios generales
      ...userRoutes,
      {
        path: 'inicio',
        children: [
          { path: 'inicio', element: <Inicio /> },
          { path: 'accesos-rapidos', element: <AccesosRapidos /> },
        ],
      },
    ],
  };
};

export default MainRoutes;
