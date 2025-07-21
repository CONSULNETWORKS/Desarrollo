import { createContext, useContext, useState, useEffect } from 'react';
import UserService from './user.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdminCNW, setIsAdminCNW] = useState(false);
  const [isAdministradorCNW, setIsAdministradorCNW] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // 🔍 Verificar usuario en localStorage
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        console.log("Usuario en localStorage:", storedUser);

        if (storedUser.roles && Array.isArray(storedUser.roles)) {
          console.log("Roles en localStorage:", storedUser.roles);
          setRoles(storedUser.roles); // Guardar roles en el estado

          // 🔄 Asignar estados basados en los roles
          setIsAdmin(storedUser.roles.includes('ROLE_ADMINISTRADOR'));
          setIsUser(storedUser.roles.includes('ROLE_USUARIO'));
          setIsModerator(storedUser.roles.includes('ROLE_MODERADOR'));
          setIsAdministradorCNW(storedUser.roles.includes('ROLE_ADMINISTRADOR-CNW'));
          setIsAdminCNW(storedUser.roles.includes('ROLE_ADMIN_CNW'));

          return; // Evita hacer peticiones innecesarias si los roles están en localStorage
        }

        // 🚀 Si no hay roles en localStorage, hacer peticiones a la API
        const userResponse = await UserService.getUserBoard();
        setIsUser(!!userResponse.data);

        const adminResponse = await UserService.getAdminBoard();
        setIsAdmin(!!adminResponse.data);

        const moderatorResponse = await UserService.getModeratorBoard();
        setIsModerator(!!moderatorResponse.data);

        const adminCNWResponse = await UserService.getAdminCNW();
        setIsAdminCNW(!!adminCNWResponse.data);

      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <AuthContext.Provider value={{
      roles, isUser, isAdmin, isModerator, isAdminCNW, isAdministradorCNW, loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
