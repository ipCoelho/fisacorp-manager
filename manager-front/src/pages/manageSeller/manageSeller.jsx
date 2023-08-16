import { Table, Select, Col, Row, Form } from 'antd';
import { useEffect, useState } from 'react';

import { getCompany, getAdminCompany } from '../../services/seller';
import { useAuth } from '../../hooks/AuthContext';

import './css/index.css';

export default function manageSeller() {

    const { handleErrors, setContentLoading } = useAuth();

    const [listCompany, setListCompany] = useState([]);
    const [listSeller, setListSeller] = useState([]);

    useEffect(() => {
        handleListCompany();
    }, []);

    async function handleListCompany() {
        try {
            const { data } = await getCompany();

            setListCompany(data);

        } catch (error) {
            handleErrors(error.response);
        }
    }

    async function handleAdminCompany(id) {
        setContentLoading(true);
        try {
            const { data } = await getAdminCompany(id);

            setListSeller(data);

        } catch (error) {
            handleErrors(error.response);
        } finally {
            setContentLoading(false);
        }
    }

    return (
        <>
            <Row justify='end' className='scroll-table'>
                <Col xs={24} lg={10}>
                    <Form layout='vertical'>
                        <Form.Item label="Selecione uma empresa" name="company" rules={[{ required: true }]}>
                            <Select
                                showSearch
                                placeholder="Selecione"
                                size="large"
                                notFoundContent="Nenhum empresa foi encontrado!"
                                onChange={id => handleAdminCompany(id.key)}
                                labelInValue
                            >
                                {listCompany.map(value => (
                                    <Select.Option key={value.IDCompany} value={value.AccountName}>
                                        {value.AccountName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Table pagination={{ pageSize: 20 }} scroll={{ y: 390 }} dataSource={listSeller} locale={{ emptyText: 'Não há dados' }} >
                <Table.Column title="Login" dataIndex="login" key="login" />
                <Table.Column title="Url" dataIndex="url" key="url" />
            </Table>
        </>
    )
}
