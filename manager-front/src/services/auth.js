import api from './api';

export async function signIn(data) {
  return await api.post('/login', data);
}

export async function register(user) {
  return await api.post('/user', user);
}
