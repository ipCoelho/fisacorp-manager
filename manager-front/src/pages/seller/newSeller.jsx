import { useState, useEffect } from 'react';

import InputMask from 'react-input-mask';

import { Form, Col, Input, Row, Select, Button, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getDistributionCenter, getSalesChannels, newCompany } from '../../services/seller';
import { useAuth } from '../../hooks/AuthContext';

import './css/index.css';

export default function NewSeller() {

  const [form] = Form.useForm();

  const { handleErrors, setContentLoading } = useAuth();

  const [salesChannelsList, setSalesChannelsList] = useState([]);
  const [distributionCenterList, setDistributionCenterList] = useState([]);
  const [distributionCenterValue, setDistributionCenterValue] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetSalesChannels();
    handleGetDistributionCenter();
  }, []);

  useEffect(() => {
    const items = distributionCenterValue.map(value => (
      distributionCenterList.find(item => value === item.Name)
    ));
    setSelected(items);
  }, [distributionCenterValue]);

  async function handleGetSalesChannels() {
    setContentLoading(true);
    try {
      const { data } = await getSalesChannels();

      setSalesChannelsList(data);

    } catch (error) {
      handleErrors(error.response);
    } finally {
      setContentLoading(false);
    }
  }

  async function handleGetDistributionCenter() {
    setContentLoading(true);
    try {
      const { data } = await getDistributionCenter();

      setDistributionCenterList(data);

    } catch (error) {
      handleErrors(error.response);
    } finally {
      setContentLoading(false);
    }
  }

  async function handleCompany() {
    setLoading(true);
    try {
      const data = await newCompany(form.getFieldsValue());

      handleErrors(data);
      form.resetFields();
      setSelected([]);

    } catch (error) {
      handleErrors(error.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Row justify="center">
        <Col md={12} lg={24} className="gutter-row">

          <Form form={form} layout="vertical" labelWrap onFinish={handleCompany}  >
            <Row gutter={8}>
              <Col xs={24} lg={8} className="gutter-row">
                <Form.Item label="CNPJ" name="cnpj" rules={[{ required: true, message: "CNPJ é obrigatório" }]}>
                  <InputMask mask={'99.999.999/9999-99'}>
                    <Input size="large" />
                  </InputMask>
                </Form.Item>
              </Col>

              <Col xs={24} lg={8} className="gutter-row">
                <Form.Item label="Telefone" name="telephone">
                  <InputMask mask={'(99) 99999-9999'} >
                    <Input size="large" />
                  </InputMask>
                </Form.Item>
              </Col>

              <Col xs={24} lg={8} className="gutter-row">
                <Form.Item label="Razão Social" name="razaoSocial" rules={[{ required: true, message: "Razão Social é obrigatório" }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col xs={24} lg={8} className="gutter-row">
                <Form.Item label="Email para receber credenciais do Admin" name="emailCredenciais" rules={[{ required: true, message: "Email para receber credenciais do Admin é obrigatório" }]}>
                  <Input size="large" type="email" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8} className="gutter-row">
                <Form.Item label="Email do seller" name="emailSeller" rules={[{ required: true, message: "Email do seller é obrigatório" }]}>
                  <Input size="large" type="email" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8} className="gutter-row">
                <Form.Item label="Nomenclatura URL/Domínio" name="nomenclatura" rules={[{ required: true, message: "Nomenclatura é obrigatório" }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col xs={24} lg={12} className="gutter-row">
                <Form.Item label="Canais de Venda" name="salesChannels" rules={[{ required: true, message: "Canais de Venda é obrigatório" }]}>
                  <Select allowClear showArrow labelInValue size="large" mode='multiple' placeholder="Selecione"
                    notFoundContent="Nenhum canal de venda foi encontrado!"
                  >
                    {salesChannelsList.map(value => (
                      <Select.Option
                        key={value.IDTypeCompanyIntegration}
                        value={value.IntegrationName}>
                        {value.IntegrationName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12} className="gutter-row">
                <Form.Item
                  label="Centro de Distribuição" name="distributionCenter"
                >
                  <Select allowClear showArrow size="large" mode='multiple' placeholder="Selecione"
                    notFoundContent="Nenhum centro de distribuição foi encontrado!"
                    onChange={value => setDistributionCenterValue(value)}
                  >
                    {distributionCenterList.map(value => (
                      < Select.Option
                        key={value.Name}
                        value={value.Name}>
                        {value.Name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify='end'>
              <Col xs={24} sm={24} md={24} lg={8}>
                <Button block type="primary" htmlType="submit" size='large' disabled={loading}>
                  {loading ? <LoadingOutlined /> : 'Cadastrar Seller'}
                </Button>
              </Col>
            </Row>

            {selected.length > 0 && (
              <div>
                <span>Centro de Distribuição Selecionados:</span>
              </div>
            )}

            <Row gutter={8} className="card-new-seller">
              {selected.map((value, key) => (
                <Col xs={24} lg={6} key={key}>
                  <Card title={value.Name} style={{ marginBottom: '10px' }}>
                    <p><b>GALPÃO CNT - </b>{value.Galpao}</p>
                    <p><b>ENDEREÇO - </b>{value.Endereco}</p>
                    <p><b>CEP - </b>{value.Cep.substring(5, 0) + "-" + value.Cep.substring(5, 9)}</p>
                    <p><b>UF - </b>{value.UF}</p>
                    <p><b>CIDADE - </b>{value.Cidade}</p>
                    <p><b>BAIRRO - </b>{value.Bairro}</p>
                    <p><b>NÚMERO - </b>{value.Numero}</p>
                    <p><b>COMPLEMENTO - </b>{value.Complemento}</p>
                  </Card>
                </Col >
              ))}
            </Row>
          </Form>
        </Col>
      </Row >
    </>
  )
}
