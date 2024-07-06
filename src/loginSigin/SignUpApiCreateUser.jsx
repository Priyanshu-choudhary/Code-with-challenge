async function signUp(username, password, email,profileImg) {
  try {
    const roles = ["USER"]; // Assuming you want every user to have the role "USER"

    const response = await fetch('https://hytechlabs.online:9090/Public/Create-User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password: password, email: email, roles: roles ,profileImg:profileImg}),
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default signUp;
