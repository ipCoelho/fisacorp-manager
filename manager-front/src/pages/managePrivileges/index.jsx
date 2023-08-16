import React, { useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { InputWithLabel } from '../../components/InputWithLabel';
import { useAuth } from '../../hooks/AuthContext';
import { 
  getCompanies,
  cloneUserAndPrivilegeGroupToSeller,
  getCompanyInfo,
  getCompaniesByDistributionCenter
} from '../../services/privileges';
import { styles } from './style/styles';
import './style/index.css';
import { getDistributionCenter } from '../../services/seller';

export default function managePrivilegiesPage() {
  const { setContentLoading, handleErrors } = useAuth();

  const [selectCheckedOption, setSelectCheckedOption] = useState({
    privilege: {},
    company: {},
    user: {},
  });
  const [selectOptions, setSelectOptions] = useState({
    privileges: [],
    companies: [],
    users: []
  });
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedSellers, setCheckedSellers] = useState([]);
  
  const [allSellers, setAllSellers] = useState([]);
  const [renderableSellers, setRenderableSellers] = useState([]);
  
  const [distributionCenters, setDistributionCenters] = useState([]);
  const [resetState, setResetState] = useState(false);
  

  useEffect(() => {
    handleCompanies();
    handleDistributionCenters();
  }, [])

  useEffect(() => {
    setResetState(false);
  }, [resetState]);

  async function handleCompanies() {
    try {
      setContentLoading(true);

      const request = await getCompanies();
      const { data } = request.data;

      const companySelectArray = data.map(singleCompany => singleCompany.AccountName ? singleCompany.AccountName : '');
      const checkboxCompaniesArray = data.map(singleCompany => ({
        label: singleCompany.AccountName ? singleCompany.AccountName : '',
        value: singleCompany.AccountName ? singleCompany.AccountName : ''
      }));

      setSelectOptions({
        ...selectOptions,
        companies: companySelectArray
      });
      setAllSellers(data);
      setRenderableSellers(checkboxCompaniesArray);
    } catch (error) {
      handleErrors(error.response);
    } finally {
      setContentLoading(false);
    }
  }

  async function handleDistributionCenters() {
    try {
      setContentLoading(true);

      const { data } = await getDistributionCenter();
      setDistributionCenters(data);
    } catch(error) {
      handleErrors(error.response);
    } finally {
      setContentLoading(false);
    }
  }

  async function onChangeSelectedCompany(selectValue) {
    try {
      const companyRecord = allSellers.find(({ AccountName }) => AccountName === selectValue);
      
      setContentLoading(true);
  
      const { data } = await getCompanyInfo(companyRecord.IDCompany);

      const getAllUserNamesFromRecords = data
        .filter(record => record.Status === 1 && record.UserName != null && record.UserName != "");
  
      const privilegeIdArray = [... new Set(data.map(({ IDUserPrivilegeGroup }) => IDUserPrivilegeGroup))];
  
      const allPrivilegesIDAndNameArray = privilegeIdArray.map((privilegeGroupId) => {
        const { IDUserPrivilegeGroup, PrivilegeGroupName } = data.find(record => record.IDUserPrivilegeGroup === privilegeGroupId);
        return { PrivilegeGroupName, IDUserPrivilegeGroup };
      });
  
      setSelectCheckedOption({
        company: selectValue,
        user: getAllUserNamesFromRecords[0],
        privilege: allPrivilegesIDAndNameArray.map(privilegeObj => privilegeObj.PrivilegeGroupName),
      });

      setSelectOptions({
        ...selectOptions,
        users: getAllUserNamesFromRecords,
        privileges: allPrivilegesIDAndNameArray.map(privilegeObj => privilegeObj.PrivilegeGroupName),
      });
    } catch(error) {
      handleErrors(error.response);
    } finally {
      setContentLoading(false);
    }
  }

  function onChangeSelectedUser(value) {
    const selectedUserCompleteRecord = selectOptions.users.find(record => record.UserName === value);

    setSelectCheckedOption({
      ...selectCheckedOption,
      user: selectedUserCompleteRecord,
      privilege: selectedUserCompleteRecord.PrivilegeGroupName,
    });
    setSelectOptions({
      ...selectOptions,
      privileges: [selectedUserCompleteRecord.PrivilegeGroupName],
    });
  }

  function onChangeSelectedPrivilege(value) {
    const allUsersWithSelectedPrivilegeGroup = allSellers.filter(record => record.PrivilegeGroupName === value);

    setSelectCheckedOption({
      ...selectCheckedOption,
      user: allUsersWithSelectedPrivilegeGroup,
      privilege: value
    });
  }

  async function onChangeSelectedDistributionCenter(selectedCd) {
    try {
      setContentLoading(true);

      const request = await getCompaniesByDistributionCenter(selectedCd);
      const { data } = request.data;
      
      const sellers = data.map(record => {
        return allSellers
          .find(empresa => empresa.IDCompany === record.IDCompany)
      });
      
      setRenderableSellers(sellers.map(singleCompany => ({
        label: singleCompany.AccountName,
        value: singleCompany.AccountName
      })));
    } catch(error) {
      handleErrors(error.response);
    } finally {
      setContentLoading(false);
    }
  }

  function onChangeCheckedSellers(checkedSellers) {
    setCheckedSellers(checkedSellers);
    setIndeterminate(!!checkedSellers.length && checkedSellers.length < renderableSellers.length);
    setCheckAll(checkedSellers.length === renderableSellers.length);
  }

  function onCheckAllChange(e) {
    setCheckedSellers(e.target.checked? renderableSellers.map(seller => seller.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  }

  async function changePrivilegies() {
    if (!selectCheckedOption.privilege || !selectCheckedOption.company || checkedSellers.length <= 0) {
      toast.warning('Preencha todos os campos e selecione ao menos um Seller!');
      return;
    }
    
    try {
      setContentLoading(true);
  
      const dataThatWillBeFetched = {
        company: allSellers.find(seller => seller.AccountName === selectCheckedOption.company),
        user: selectCheckedOption.user,
        privilege: selectCheckedOption.privilege,
        sellers: checkedSellers.map(checkSeller => allSellers.find(seller => seller.AccountName === checkSeller))
      };

      const { data } = await cloneUserAndPrivilegeGroupToSeller(dataThatWillBeFetched);

      const sellersWithStatusFalse = data.clonePrivilegeGroupStatus.filter(sellerStatus => sellerStatus.status === false);

      if (sellersWithStatusFalse.length > 0) {
        const allSellersString = allSellers.reduce((prev, curr) => {
          const message = data.seller.find(({ IDCompany }) => IDCompany === curr.IDCompany).AccountName;
          return `${prev + message} `;
        }, '');

        toast.error(`Erro ao gerenciar privilégios nos Sellers: ${allSellersString}`);
      } else {
        toast.success(`${data.clonePrivilegeGroupStatus.length} Seller(s) atualizado(s), ${sellersWithStatusFalse.length} erros encontrados.`);
      }
    } catch (error) {
      handleErrors(error.response);
    } finally {
      setContentLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='manage-privilegies-title-container'>
        <h4 style={styles.h4}>Gerenciar Usuários e Privilégios</h4>
      </div>
      <div className='manage-privilegies-flex-container'>
        <div className='manage-privilegies-select-group'>
          <InputWithLabel
            selectContext='companies'
            labelTitle='Selecione uma empresa:'
            selectOptions={selectOptions.companies}
            width='80%' 
            onChange={(_, value) => onChangeSelectedCompany(value)}
          />
          <InputWithLabel 
            selectContext='users' 
            labelTitle='Selecione o usuário:' 
            selectOptions={selectOptions.users} 
            width='80%' 
            onChange={(_, value) => onChangeSelectedUser(value)} 
          />
          <InputWithLabel 
            selectContext='privileges' 
            labelTitle='Selecione um privilégio:' 
            selectOptions={selectOptions.privileges} 
            width='80%' 
            onChange={(_, value) => onChangeSelectedPrivilege(value)}
          />
          <InputWithLabel 
            selectContext='cds' 
            labelTitle='Selecione um CD:' 
            selectOptions={distributionCenters}
            width='80%' 
            onChange={(_, value) => onChangeSelectedDistributionCenter(value)} 
          />
        </div>
        <div className='manage-privilegies-sellers-checkboxes'>
          <p><span style={styles.span}>*</span> Selecione os sellers para receber o usuário:</p>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Selecionar Todos
          </Checkbox>
          <Checkbox.Group 
            className='manage-privilegies-sellers-checkboxgroup'
            options={renderableSellers}
            value={checkedSellers}
            onChange={onChangeCheckedSellers}
          />
        </div>
        <Button type='primary' onClick={changePrivilegies} style={styles.Button}>
            Iniciar
        </Button>
      </div>
    </>
  );
}