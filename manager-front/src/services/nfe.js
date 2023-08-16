import api from './api';

export async function getSefazContingency(BrState) {
  return await api.get(`/nfe/sefaz/contingency/${BrState}`);
}

export async function getAllSefazContingency() {
  return await api.get(`/nfe/sefaz/contingency`);
}

export async function activateContingency(State){
  return await api.put('/nfe/sefaz/contingency',{IDSefazContingency:-1,State:State});
}

export async function deactivateContingency(IDSefazContingency,State){
  return await api.post('/nfe/sefaz/contingency/disable',{
    IDSefazContingency:IDSefazContingency,
    State:State
  });
}

export function getAllBrStates(){
    return [ 
        {"name": "Acre", "id": "AC"},
        {"name": "Alagoas", "id": "AL"},
        {"name": "Amapá", "id": "AP"},
        {"name": "Amazonas", "id": "AM"},
        {"name": "Bahia", "id": "BA"},
        {"name": "Ceará", "id": "CE"},
        {"name": "Distrito Federal", "id": "DF"},
        {"name": "Espírito Santo", "id": "ES"},
        {"name": "Goiás", "id": "GO"},
        {"name": "Maranhão", "id": "MA"},
        {"name": "Mato Grosso", "id": "MT"},
        {"name": "Mato Grosso do Sul", "id": "MS"},
        {"name": "Minas Gerais", "id": "MG"},
        {"name": "Pará", "id": "PA"},
        {"name": "Paraíba", "id": "PB"},
        {"name": "Paraná", "id": "PR"},
        {"name": "Pernambuco", "id": "PE"},
        {"name": "Piauí", "id": "PI"},
        {"name": "Rio de Janeiro", "id": "RJ"},
        {"name": "Rio Grande do Norte", "id": "RN"},
        {"name": "Rio Grande do Sul", "id": "RS"},
        {"name": "Rondônia", "id": "RO"},
        {"name": "Roraima", "id": "RR"},
        {"name": "Santa Catarina", "id": "SC"},
        {"name": "São Paulo", "id": "SP"},
        {"name": "Sergipe", "id": "SE"},
        {"name": "Tocantins", "id": "TO"}
    ];
}