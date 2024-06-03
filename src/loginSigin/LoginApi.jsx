import React, { useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';

async function LoginApi(username, password) {
  const url = 'http://localhost:9090/Public/Create-User';
  const payload = {
    name: username,
    password: password
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

     const data = await response.json();
    console.log('Success:', data);
    return payload;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



export default LoginApi;
