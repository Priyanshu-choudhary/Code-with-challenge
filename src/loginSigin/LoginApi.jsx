
async function login(username, password) {
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
    
    try {
        const response = await fetch('https://testcfc-1.onrender.com/users/login', {
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
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export default login;
