
import api from './api'

export async function getSalesChannels() {
    return await api.get('/type-company-integration');
}

export async function getDistributionCenter() {
    return await api.get('/distribution-center');
}

export async function newCompany(data) {
    return await api.post('/seller', data);
}

export async function getCompany() {
    return await api.get('/all-company');
}

export async function getAdminCompany(id) {
    return await api.get(`admins-by-company/${id}`);
}