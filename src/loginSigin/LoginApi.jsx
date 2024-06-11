async function login(username, password) {
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    try {
        const response = await fetch('https://testcfc.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            },
            body: JSON.stringify({ name: username, password: password }),
        });

        if (response.ok) {
            const userId = await response.text();
            console.log('User ID:', userId);
            return userId; // Return userId if needed
        } else {
            console.log('Login failed');
            alert("Wrong Username/Password");
            throw new Error('Wrong Username/Password');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to be caught in handleSubmit
    }
}

export default login;
