import api from './api';

export async function getCompanies() {
  return await api.get('/privilege/company');
}

export async function cloneUserAndPrivilegeGroupToSeller(data) {
  return await api.post('/privilege/company/copy', data);
}

export async function getCompanyInfo(companyID) {
  return await api.get(`/privilege/company/info?companyId=${companyID}`);
}

export async function getCompaniesByDistributionCenter(distributionCenterString) {
  return await api.get(`/privilege/company?cd=${distributionCenterString}`);
}