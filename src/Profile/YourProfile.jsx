import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import Dashboard from '../dashBoard/Dashboard';

function YourProfile() {
  const { user, password } = useContext(UserContext);
  return (
    <div>
        <Dashboard/><div className="flex justify-center items-center h-screen">
      
      {user ? <h4>Welcome, <b>{user.name}   {user.password}</b></h4> : <b>Please login ...</b>}
      </div>
    </div>
  )
}

export default YourProfile
