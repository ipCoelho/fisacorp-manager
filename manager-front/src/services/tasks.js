import api from './api';

export async function getTasks(userId) {
  const token = localStorage.getItem('token');
  return await api.get(`/user/${userId}/tasks`, {
    headers: { Authorization: 'Bearer ' + token },
  });
}

export async function createTask(task) {
  const token = localStorage.getItem('token');
  return await api.post(`/task`, task, {
    headers: { Authorization: 'Bearer ' + token },
  });
}

export async function deleteTask(taskId) {
  const token = localStorage.getItem('token');
  return await api.delete(`/task/${taskId}`, {
    headers: { Authorization: 'Bearer ' + token },
  });
}
