import { useAuth } from '../services/AuthContext';

import administrador from './Roles/Administrador.jsx';
import administradorCNW from './Roles/AdministradorCNW.jsx';
import moderator from './Roles/Moderador.jsx';
import user from './Roles/User.jsx';

import inicio from './Areas/inicio.jsx';
import comunicacion from './Areas/Comunicacion.jsx';
import capacitacion from './Areas/Capacitacion.jsx';

const MenuItems = () => {
  const { isAdmin, isUser, isModerator, isAdministradorCNW } = useAuth();

  const sharedItems = [
    inicio,
    ...(isAdministradorCNW ? [capacitacion] : []),
    ...(isAdministradorCNW ? [administradorCNW(true)] : []),
    ...(isAdministradorCNW ? [comunicacion] : []),

    ...(isAdmin ? [capacitacion] : []),
    ...(isAdmin ? [administrador(true)] : []),
    ...(isAdmin ? [comunicacion] : []),

    ...(isModerator ? [capacitacion] : []),
    ...(isModerator ? [moderator(true)] : []),
    ...(isModerator ? [comunicacion] : []),

    ...(isUser ? [capacitacion] : []),
    ...(isUser ? [user(true)] : []),
    ...(isUser ? [comunicacion] : []),
  ];

  return { items: sharedItems };
};

export default MenuItems;
