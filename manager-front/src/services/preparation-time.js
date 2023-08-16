import api from './api';

export async function getDefaultPreparationTimeWarehouses() {
  return await api.get('/preparationtime/warehouses');
}

export async function getSellersExceptionsPreparationTime() {
  return await api.get('/preparationtime/warehouses/seller/divergences');
}

export async function changePreparationTime(warehouseName, json) {
  return await api.post('/preparationtime/warehouse/' + warehouseName, json);
}