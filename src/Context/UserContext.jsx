import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  // Light mode only — these values are kept so legacy components don't crash
  const [bg, setbg] = useState("#f9fafb");
  const [dark, setdark] = useState("#f3f4f6");
  const [light, setlight] = useState("#ffffff");
  const [bc, setbc] = useState("#2563eb");
  const [ibg, setibc] = useState("#111827");
  const [currentthemes, setcurrentthemes] = useState(false); // always light
  const [URL, setURL] = useState(import.meta.env.VITE_API_URL || 'http://localhost:9090');
  const [fontSize, setFontSize] = useState('14px');
  const [profileImage, setprofileImage] = useState("");
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedRoles = localStorage.getItem('roles');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (storedProfileImage) setprofileImage(storedProfileImage);
    if (storedRole) {
      setRole(storedRole);
    } else if (storedRoles) {
      try {
        const parsedRoles = JSON.parse(storedRoles);
        setRole(Array.isArray(parsedRoles) ? parsedRoles[0] || null : parsedRoles);
      } catch {
        setRole(storedRoles);
      }
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(storedUser);
      }
    }
    if (storedToken) setToken(storedToken);
    setAuthReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('roles');
    localStorage.removeItem('user');
    localStorage.removeItem('profileImage');
    setprofileImage("");
    setRole(null);
    setUser(null);
    setToken(null);
  };

  // Helper used by every API call — replaces the old btoa Basic Auth pattern
  const getAuthHeader = () => ({
    'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
  });

  return (
    <UserContext.Provider value={{
      profileImage, setprofileImage,
      fontSize, setFontSize,
      URL, setURL,
      ibg, bc, bg, dark, light,
      user, token, role, currentthemes, authReady,
      setRole, setUser, setToken, logout, setcurrentthemes,
      getAuthHeader,
    }}>
      {children}
    </UserContext.Provider>
  );
};
