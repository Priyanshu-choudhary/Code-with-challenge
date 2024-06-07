async function signUp(username, password) {
    try {
      const response = await fetch('https://testcfc-1.onrender.com/Public/Create-User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password: password }),
      });
  
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  export default signUp;
  