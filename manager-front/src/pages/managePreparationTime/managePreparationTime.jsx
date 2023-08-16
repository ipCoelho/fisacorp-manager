import { InputNumber, Row, Col, Select, TimePicker, Form, Checkbox, Button, Table, Tag, Space, Divider } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react'
import { getDistributionCenter } from '../../services/seller';
import { getCompanies, getCompaniesByDistributionCenter } from '../../services/privileges';
import { useAuth } from '../../hooks/AuthContext';

import '../managePrivileges/css/style.css';
import { changePreparationTime, getDefaultPreparationTimeWarehouses, getSellersExceptionsPreparationTime } from '../../services/preparation-time';
import { ToastContainer, toast } from 'react-toastify';

export default function ManagePreparationTime(props) {
  const { handleErrors, setContentLoading } = useAuth();

  const [allSellersInfo, setAllSellersInfo] = useState([]);

  const [centerDistributionSelect, setCenterDistributionSelect] = useState([]);
  const [centerDistributionSelected, setCenterDistributionSelected] = useState();

  const [selectAllSellers, setSelectAllSellers] = useState(true);
  const [sellerOptions, setSellerOptions] = useState([]);
  const [selectedSellerOptions, setSelectedSellerOptions] = useState([]);

  const [preparationtimeOne, setPreparationtimeOne] = useState();
  const [preparationtimeTwo, setPreparationtimeTwo] = useState();

  const [cutoffTimeOne, setCutoffTimeOne] = useState();
  const [cutoffTimeTwo, setCutoffTimeTwo] = useState();

const [centerDistributionTableData, setCenterDistributionTableData] = useState([]);
const [sellersExceptionTableData, setSellersExceptionTableData] = useState([])

  useEffect(() => {
    populateCompanies();
    populateCenterDistributionSelect();
    populateCenterDistributionTable();
    populateSellersExceptionsTable();
  }, []);

  useEffect(() => {
    populateSellerOptionsByDistributionCenter(centerDistributionSelected);
  }, [centerDistributionSelected]);

  async function populateCompanies() {
    try {
      setContentLoading(true);

      const { data } = await getCompanies();

      setAllSellersInfo(data.data);
    } catch (error) {
      handleErrors(error.response);
      toast.error('Não foi possível recuperar os dados dos Sellers!');
    } finally {
      setContentLoading(false);
    }
  }

  async function populateCenterDistributionSelect() {
    try {
      setContentLoading(true);

      const { data } = await getDistributionCenter();

      setCenterDistributionSelect(data.map(({ Name }) => {
        return { label: Name, value: Name };
      }));
    } catch (error) {
      handleErrors(error.response);
      toast.error('Não foi possível recuperar os dados dos CDs!');
    } finally {
      setContentLoading(false);
    }
  }

  async function populateSellerOptionsByDistributionCenter(distributionCenter) {
    if (!distributionCenter) return;
    try {
      setContentLoading(true);

      setSellerOptions([]);

      const { data } = await getCompaniesByDistributionCenter(distributionCenter);

      const sellersList = data.data;

      if (sellersList.length == 0) return;

      let sellerOptionsData = sellersList.map(sellerFiltered => {
        const sellerInfo =  allSellersInfo.find(seller => seller.IDCompany == sellerFiltered.IDCompany);

        return {
          label: sellerInfo.AccountName,
          value: sellerInfo.AccountName
        };
      });

      sellerOptionsData.sort((a, b) => a.value.localeCompare(b.value));

      sellerOptionsData = Array.from(new Set(sellerOptionsData.map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str));

      setSellerOptions(sellerOptionsData);
    } catch (error) {
      handleErrors(error);
    } finally {
      setContentLoading(false);
    }
  }

  async function populateCenterDistributionTable() {
    try {
      setContentLoading(true);

      const { data } = await getDefaultPreparationTimeWarehouses();

      const centerDistributionList = [...new Set(data.warehouses.map(({ Warehouse }) => Warehouse))];

      const centerDistributionTableData = centerDistributionList.map((centerDistributionName, index) => {
        return {
          key: index + 1,
            CDName: centerDistributionName,
            cutoffTimeOne: data.warehouses.find(record => record.Warehouse == centerDistributionName && record.CutoffType == "primeiro-horario").CutoffTime,
            preparationTimeOne: data.warehouses.find(record => record.Warehouse == centerDistributionName && record.CutoffType == "primeiro-horario").PreparationTimeInDays,
            cutoffTimeTwo: data.warehouses.find(record => record.Warehouse == centerDistributionName && record.CutoffType == "segundo-horario").CutoffTime,
            preparationTimeTwo: data.warehouses.find(record => record.Warehouse == centerDistributionName && record.CutoffType == "segundo-horario").PreparationTimeInDays,
        };
      });
      
      setCenterDistributionTableData(centerDistributionTableData);
    } catch (error) {
      handleErrors(error);
      toast.error('Não foi possível recuperar os dados dos Tempos de Preparo dos CDs!');
    } finally {
      setContentLoading(false);
    }
  }

  async function populateSellersExceptionsTable() {
    try {
      setContentLoading(true);

      const { data: { data } } = await getSellersExceptionsPreparationTime();

      const sellerExceptionsFormatted = data.map((sellerData, index) => {
        return {
          key: index + 1,
          SellerName: sellerData.accountName,
          cutoffTimeOne: sellerData.info[0].CutoffTime,
          preparationTimeOne: sellerData.info[0].PreparationTimeInDays,
          cutoffTimeTwo: sellerData.info[1].CutoffTime,
          preparationTimeTwo: sellerData.info[1].PreparationTimeInDays,
          CD: sellerData.info[0].Warehouse
        };
      });
      
      setSellersExceptionTableData(sellerExceptionsFormatted);
    } catch (error) {
      handleErrors(error);
      toast.error('Não foi possível recuperar os dados das Exceções de Sellers!');      
    } finally {
      setContentLoading(false);
    }
  }

  async function alterPreparationTime() {
    if (!centerDistributionSelected || centerDistributionSelected == 'undefined') {
      return toast.warning('Selecione um CD!');
    } else if (preparationtimeOne === null || preparationtimeTwo === null || cutoffTimeOne === null || cutoffTimeTwo === null) {
      return toast.warning('Selecione os Tempos de CD e os Horários de corte!');
    } else if (!selectAllSellers && selectedSellerOptions.length == 0) {
      return toast.warning('Selecione algum Seller ou ative a seleção de todos os Sellers + CD!');
    }

    try {
      setContentLoading(true);

      const selectedSellers = selectAllSellers ? 
        sellerOptions.map(sellerFiltered => allSellersInfo.find(seller => seller.AccountName == sellerFiltered.label))
        :
        selectedSellerOptions.map(sellerFiltered => allSellersInfo.find(seller => seller.AccountName == sellerFiltered));

      const body = {
        centerDistribution: centerDistributionSelected,
        changeCDandSellersPreparationTime: selectAllSellers,
        preparationTimeOne: preparationtimeOne,
        cutoffTimeOne: cutoffTimeOne,
        preparationTimeTwo: preparationtimeTwo,
        cutoffTimeTwo: cutoffTimeTwo,
        sellers: selectedSellers
      };

      const { data, status } = await changePreparationTime(centerDistributionSelected, body);

      if (status == 200) {
        populateCenterDistributionTable();
        populateSellersExceptionsTable();
        toast.success(data.message ?? 'Tempo de CD alterado!')
      } else {
        toast.error(data.message ?? 'Erro ao trocar tempo de CD!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      populateCenterDistributionTable();
      setContentLoading(false);
    }
  }

  const [form] = Form.useForm();
  dayjs.extend(customParseFormat);

  return (
    <>
      <ToastContainer/>
      <Form
        name='preparationTimeForm'
        form={form}
        layout='vertical'
      >
        <Row justify='start'>
          <Col span={8}>
          <Form.Item label='Selecionar CD:'>
              <Select
                showSearch
                style={{ width: 230 }}
                onChange={(value) => setCenterDistributionSelected(value)}
                placeholder="Selecionar CD"
                options={centerDistributionSelect}
                optionFilterProp="children"
              />
            </Form.Item>
            <Checkbox 
              defaultChecked={true} 
              onChange={event => {
                setSelectAllSellers(event.target.checked);
                setSelectedSellerOptions([]);
              }}
            >
              Selecionar o CD e seus sellers
            </Checkbox>
          </Col>

          <Col span={6} >
            <Form.Item label='Tempo de CD 1:' required>
              <InputNumber min={0} max={10} onChange={(value) => setPreparationtimeOne(value)} />
            </Form.Item>
          </Col>            

          <Col  span={6}>
            <Form.Item label='Tempo de CD 2:' required>
              <InputNumber min={0} max={10} onChange={(value) => setPreparationtimeTwo(value)} />
            </Form.Item>
          </Col>

        </Row>
        <Row style={{ marginTop: 30 }} justify='start'>

          <Col span={8}>
            {
              selectAllSellers == true && sellerOptions.length > 0 ? null :
                <Checkbox.Group
                  className='manage-privilegies-sellers-checkboxgroup'
                  style={{ maxHeight: 250, maxWidth: 300 }}
                  options={sellerOptions} 
                  defaultValue={[]} 
                  onChange={(value) => setSelectedSellerOptions(value)}
                />
            }
          </Col>

          <Col span={6}>
            <Form.Item label='Horário de corte 1:' required>
              <TimePicker placeholder='Selecionar horário' minuteStep={30} onChange={(_, dateString) => setCutoffTimeOne(dateString)} format='HH:mm' />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label='Horário de corte 2:' required>
              <TimePicker placeholder='Selecionar horário' minuteStep={30} onChange={(_, dateString) => setCutoffTimeTwo(dateString)} format='HH:mm' />
            </Form.Item>
          </Col>
        </Row>
        <Row justify='end'>
          <Form.Item>
            <Button 
              disabled={centerDistributionSelected == null || preparationtimeOne === null || preparationtimeTwo === null || cutoffTimeOne == null || cutoffTimeTwo == null ? true : false} 
              type="primary" 
              onClick={alterPreparationTime}
            >
              Salvar
            </Button>
          </Form.Item>
        </Row>
      </Form>
      <Divider>Tabela de CDs</Divider>
      <Row>
        <Table pagination={{ pageSize: 7 }} scroll={{ y: 390 }} dataSource={centerDistributionTableData} locale={{ emptyText: 'Não há registro de Centros de Distribuição!' }} >
          <Table.Column 
            title="Centro de Distribuição" 
            dataIndex="CDName" 
            key="CDName" 
            sorter={(a, b) => a.CDName.localeCompare(b.CDName)} 
            filters={centerDistributionTableData.map(r => ({ text: r.CDName, value: r.CDName }))} 
            onFilter={(value, record) => record.CDName.includes(value)}
          />
          <Table.Column 
            title="Tempo de CD 1" 
            dataIndex="preparationTimeOne" 
            key="preparationTimeOne" 
            sorter={(a, b) => a.preparationTimeOne - b.preparationTimeOne}
            filters={[...new Set(centerDistributionTableData.map(r => r.preparationTimeOne))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.preparationTimeOne == value}
          />
          <Table.Column 
            title="Horário de Corte 1" 
            dataIndex="cutoffTimeOne" 
            key="cutoffTimeOne" 
            sorter={(a, b) => a.cutoffTimeOne.localeCompare(b.CDName)}
            filters={[...new Set(centerDistributionTableData.map(r => r.cutoffTimeOne))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.cutoffTimeOne == value.toString()}
          />
          <Table.Column 
            title="Tempo de CD 2" 
            dataIndex="preparationTimeTwo" 
            key="preparationTimeTwo" 
            sorter={(a, b) => a.preparationTimeTwo - b.preparationTimeTwo}
            filters={[...new Set(centerDistributionTableData.map(r => r.preparationTimeTwo))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.preparationTimeTwo == value}
          />
          <Table.Column 
            title="Horário de Corte 2" 
            dataIndex="cutoffTimeTwo" 
            key="cutoffTimeTwo" 
            sorter={(a, b) => a.cutoffTimeTwo.localeCompare(b.cutoffTimeTwo)}
            filters={[...new Set(centerDistributionTableData.map(r => r.cutoffTimeTwo))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.cutoffTimeTwo == value.toString()}
          />
        </Table>
      </Row>
      <Divider>Tabela de Excessão de Sellers</Divider>
      <Row>
        <Table pagination={{ pageSize: 7 }} scroll={{ y: 390 }} dataSource={sellersExceptionTableData} locale={{ emptyText: 'Não há registro de Excessão de Seller!' }} >
          <Table.Column 
            title="Nome do Seller" 
            dataIndex="SellerName" 
            key="SellerName" 
            sorter={(a, b) => a.SellerName.localeCompare(b.SellerName)} 
            filters={sellersExceptionTableData.map(r => ({ text: r.SellerName, value: r.SellerName }))} 
            onFilter={(value, record) => record.SellerName.includes(value)}
          />
          <Table.Column 
            title="Tempo de CD 1" 
            dataIndex="preparationTimeOne" 
            key="preparationTimeOne" 
            sorter={(a, b) => a.preparationTimeOne - b.preparationTimeOne} 
            filters={[...new Set(sellersExceptionTableData.map(r => r.preparationTimeOne))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.preparationTimeOne == value}
          />
          <Table.Column 
            title="Horário de Corte 1" 
            dataIndex="cutoffTimeOne" 
            key="cutoffTimeOne" 
            sorter={(a, b) => a.cutoffTimeOne.localeCompare(b.cutoffTimeOne)}
            filters={[...new Set(sellersExceptionTableData.map(r => r.cutoffTimeOne))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.cutoffTimeOne == value.toString()}
          />
          <Table.Column 
            title="Tempo de CD 2" 
            dataIndex="preparationTimeTwo" 
            key="preparationTimeTwo" 
            sorter={(a, b) => a.preparationTimeTwo - b.preparationTimeTwo} 
            filters={[...new Set(sellersExceptionTableData.map(r => r.preparationTimeTwo))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.preparationTimeTwo == value}
          />
          <Table.Column 
            title="Horário de Corte 2" 
            dataIndex="cutoffTimeTwo" 
            key="cutoffTimeTwo" 
            sorter={(a, b) => a.cutoffTimeTwo.localeCompare(b.cutoffTimeTwo)}
            filters={[...new Set(sellersExceptionTableData.map(r => r.cutoffTimeTwo))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.cutoffTimeTwo == value.toString()}
          />
          <Table.Column 
            title="CD" 
            dataIndex="CD" 
            key="CD" 
            sorter={(a, b) => a.CD.localeCompare(b.CD)}
            filters={[...new Set(sellersExceptionTableData.map(r => r.CD))].map(r => ({ text: r, value: r }))} 
            onFilter={(value, record) => record.CD == value.toString()}
          />
        </Table>
      </Row>
    </>
  )
}