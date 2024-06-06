

async function SignApi(username, password) {
  const url = 'https://testcfc-1.onrender.com/Public/Create-User';
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



export default SignApi;
