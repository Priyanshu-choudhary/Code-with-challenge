async function login(username, password) {
    const apiUrl = import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL}`;
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        alert("Wrong Username/Password");
        throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('roles', JSON.stringify(data.roles));
    return data.roles;
}

export default login;
