import { createContext, useContext, useState } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const result = await authService.login(username, password);
    setUser(result);
    return result;
  };

  const register = async (username, email, imageUrl, password) => {
    const result = await authService.register(username, email, imageUrl, password);
    setUser(result);
    return result;
  };

  const logout = async () => {
    if (user?.sessionToken) {
      await authService.logout(user.sessionToken);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
