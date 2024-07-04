async function login(username, password) {
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    try {
        const response = await fetch('https://hytechlabs.online:9090/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            },
            body: JSON.stringify({ name: username, password: password }),
        });

        if (response.ok) {
            const userData = await response.json();  // Parse the response as JSON
            const roles = userData.roles; 
            console.log('Roles:', roles);
            return roles; 
        } else {
            console.log('Login failed');
            alert("Wrong Username/Password");
            throw new Error('Wrong Username/Password');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default login;
