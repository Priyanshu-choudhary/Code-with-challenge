const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

/**
 * Login → get JWT → fetch full user profile → return all three.
 */
async function login(username, password) {
  // Step 1: Authenticate — get JWT token
  const authRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!authRes.ok) {
    throw new Error('Invalid username or password');
  }

  const { token, roles } = await authRes.json();

  // Step 2: Fetch full user profile using the token we just got
  const profileRes = await fetch(`${API_URL}/users/getUser`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  let user = { name: username }; // safe fallback
  if (profileRes.ok) {
    user = await profileRes.json();
  }

  // Step 3: Persist to localStorage — NO password stored
  localStorage.setItem('token', token);
  localStorage.setItem('roles', JSON.stringify(roles));
  localStorage.setItem('user', JSON.stringify(user));
  if (user.profileImg) {
    localStorage.setItem('profileImage', user.profileImg);
  }

  return { token, roles, user };
}

export default login;
