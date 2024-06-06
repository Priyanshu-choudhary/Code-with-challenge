async function createUser() {
    const url = 'https://testcfc-1.onrender.com/users';
    const name = 'x';  // Replace with your username
    const password = 'x';  // Replace with your password

    const data = {
        name: "x",
        password: "x",
        email: "XXXXXXXbroyadi23@gmail.com",
        collage: "CCSU",
        branch: "CSE",
        year: "4th",
        skills: "4java,python,c",
        badges: "no badges yet",
        number: "37818071134"
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'Basic ' + btoa(name + ":" + password));

    const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log('User created successfully:', responseData);
    } else {
        console.error('Failed to create user:', response.status, response.statusText);
    }
}

createUser();
