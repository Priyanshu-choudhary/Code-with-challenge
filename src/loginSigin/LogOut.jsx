
import Dashboard from '../dashBoard/Dashboard';
import React, { useContext,useEffect } from 'react';

import { UserContext } from '../Context/UserContext';


function LogOut() {
    const { user, setUser, logout } = useContext(UserContext);
  
 
    useEffect(() => {
        logout();
        console.log(localStorage.getItem("username"));
        console.log(user);
      }, []);
  return (
    <><Dashboard/>
   <div className="flex justify-center items-center h-screen">
    <b>You are Logout...</b>
   </div>
   </>
  );
  
}

export default LogOut
