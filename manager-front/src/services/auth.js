import api from './api';

export async function signIn(data) {
  return await api.post('/login', data);
}

export async function getUser() {
  return await api.get('/me');
}

export async function forgotPassword(email) {
  // return await api.post('/forgot-password', email);
}

export async function signOut(token) {
  return await api.post('/logout', token);
}
