import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null)
  const [bg, setbg] = useState("#121418")
  const [dark, setdark] = useState("#1f202a");
  const [light, setlight] = useState("#27293a");
  const [bc, setbc] = useState("#5D12A8")
  const [ibg, setibc] = useState("white")
  const [currentthemes, setcurrentthemes] = useState("true")
  
useEffect(() => {

  if(currentthemes== true){
    setbg("#121418");
    setdark("#1f202a");
    setlight("#27293a");
    setbc("#5D12A8");
    setibc("white");
   
  } else if(currentthemes== false){
    setbg("#d6e6ff");
    setdark("#d7f9f8");
    setlight("#e5d4ef");
    setbc("#fff0d4");
    setibc("black");

  }

 
}, [currentthemes])


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPassword = localStorage.getItem('password');
    const storedRole=localStorage.getItem('role');

    if(storedRole){
      setRole(storedRole);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedPassword) {
      setPassword(storedPassword); // Set password directly without parsing
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('role');
    setRole(null);
    setUser(null);
    setPassword(null);
  };

  return (
    <UserContext.Provider value={{ibg,bc,bg,dark,light, user, password, role,currentthemes, setRole, setUser, setPassword, logout,setcurrentthemes }}>
      {children}
    </UserContext.Provider>
  );
};
