import { useState, useEffect } from "react";

/**
 * Hook personalizado para manejar la autenticación
 * Se actualiza automáticamente cuando cambia el localStorage
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para obtener el token
    const getToken = () => {
        return localStorage.getItem("token");
    };

    // Función para obtener el usuario
    const getUser = () => {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
    };

    // Función para cargar los datos del localStorage
    const loadAuthData = () => {
        const storedToken = getToken();
        const storedUser = getUser();
        
        setToken(storedToken);
        setUser(storedUser);
        setLoading(false);
    };

    useEffect(() => {
        // Cargar datos inicialmente
        loadAuthData();

        // Escuchar cambios en el localStorage (para sincronizar entre pestañas)
        const handleStorageChange = (e) => {
            if (e.key === 'token' || e.key === 'user') {
                loadAuthData();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Función para hacer login
    const login = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    // Función para actualizar el usuario
    const updateUser = (newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
    };

    return {
        user,
        token,
        loading,
        isAuthenticated: token,
        login,
        logout,
        updateUser
    };
};

export default useAuth;