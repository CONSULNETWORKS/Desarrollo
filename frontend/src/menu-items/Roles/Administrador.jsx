import {IconUserEdit, IconUserSearch, IconUsersGroup, IconUserShield} from '@tabler/icons-react';

const administrador = (isVisible = false) => {

  if (!isVisible) return null;

  return {
    id: 'Administrador',
    title: 'Gestión de Usuarios',
    type: 'group',
    children: [
      {
        id: 'administracion',
        title: 'Administración General',
        type: 'item',
        url: '/usuarios/administracion',
        icon: IconUsersGroup,
        breadcrumbs: false,
      },
      {
        id: 'seguridad',
        title: 'Seguridad y Control de Acceso',
        type: 'item',
        url: '/usuarios/seguridad',
        icon: IconUserShield,
        breadcrumbs: false,
      },
      {
        id: 'perfil',
        title: 'Perfil y Personalizacion',
        type: 'item',
        url: '/usuarios/perfil',
        icon: IconUserEdit,
        breadcrumbs: false,
      },
      {
        id: 'seguimiento',
        title: 'Estadisticas y Seguimiento',
        type: 'item',
        url: '/usuarios/seguimiento',
        icon: IconUserSearch,
        breadcrumbs: false,
      },
    ],
  };
};

export default administrador;
