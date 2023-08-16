import { Table, Select, Col, Row, Form, Tag, Space, Divider } from 'antd';
import { useEffect, useState } from 'react';


import { 
    getAllSefazContingency,
    getSefazContingency,
    activateContingency as nfeActivateContingency,
    deactivateContingency as nfeDeactivateContingency,
    getAllBrStates
} from '../../services/nfe';
import { useAuth } from '../../hooks/AuthContext';

import './css/index.css';

export default function nfeSefazContingency() {

    let pos = -1;

    const { handleErrors, setContentLoading } = useAuth();

    const [uf, setUf] = useState('');

    const [listBrState, setListBrState] = useState([]);
    const [listContingency, setListContingency] = useState([]);

    useEffect(() => {
        handleListBrState();
    }, []);

    function adaptToDataTable(data){
        return data.map(o=>{
            o.key = o.IDSefazContingency;
            return o;
        });
    }

    function stateWithContingency(data){
        let result = {};

        data.map(o=>{         
            if(!result[o.State] && !(o.DtHrStartBr && o.DtHrEndBr)){
                result[o.State] = true;
            }
        });
        return result;
    }

    function generateRegStateWithContingency(stateWithContingency,listBrState){
        stateWithContingency = listBrState.map(o => {
            if(!stateWithContingency[o.id]){
                return {
                    Mode: "Normal",
                    DtHrStartBr:null,
                    DtHrEndBr:null,
                    IDSefazContingency:pos--,
                    State:o.id
                };
            }
        });
        return stateWithContingency.filter(Boolean);
    }

    function addStateWithoutContingencyToTheList(data,listBrState){
        const listStateWithContingency = stateWithContingency(data);

        data.push(...generateRegStateWithContingency(listStateWithContingency,listBrState));

        return data;
    }

    function sortContingency(a,b){
        if( a.State.toLowerCase() == b.State.toLowerCase() ){
            if(!a.DtHrStartBr){
                return -1;
            }
            return (!a.DtHrEndBr) ? -1 : (!b.DtHrEndBr) ? 1 : a.DtHrEndBr > b.DtHrStartBr ? 1 : -1;
        }
        return a.State.toLowerCase() > b.State.toLowerCase() ? 1 : -1;
    }

    async function handleListBrState() {
        let listBrUf = [];
        if(listBrState.length){
            listBrUf = listBrState;
        } else {
            listBrUf = getAllBrStates();
            setListBrState(listBrUf);
        }

        let { data } = await getAllSefazContingency();

        data = addStateWithoutContingencyToTheList(data,listBrUf);

        //Add expected key attribute required by Table
        data = adaptToDataTable(data);

        data.sort(sortContingency);

        setListContingency(data);


        setUf("Todos os estados");
    }

    async function deactivateContingency(e,IDSefazContingency,State){
        if(IDSefazContingency < 0){
            throw new Error("Invalid sefaz contingency ID. Should be positive ID indicating it will be UPDATED and not INSERTED.");
        }

        let { data } = await nfeDeactivateContingency(IDSefazContingency,State);

        updateReg(data.sefazContingency,IDSefazContingency,State);

        if(uf.length == 2){
            handleBrState(uf);
        }
    }

    async function activateContingency(e,IDSefazContingency,State){
        if(IDSefazContingency > 0){
            throw new Error("Invalid sefaz contingency ID. Should be negative indicating it will be INSERTED and not UPDATED.");
        }
        let { data } = await nfeActivateContingency(State);
       
        updateReg(data.sefazContingency,IDSefazContingency,State);

        if(uf.length == 2){
            handleBrState(uf);
        }
    }

    async function scheduleContingency(e,IDSefazContingency){
        console.log(e);
        console.log(IDSefazContingency);
    }

    async function scheduledeactivateContingency(e,IDSefazContingency){
        console.log(e);
        console.log(IDSefazContingency);
    }

    async function handleBrState(uf) {
        setUf("");
        setContentLoading(true);
        try {
            let { data } = await getSefazContingency(uf);

            const onlyFinalizados = data.filter(o=> o.Mode != "Finalizado" ).length === 0;

            if(!data.length || onlyFinalizados){
                data.push({
                    Mode: "Normal",
                    DtHrStartBr:null,
                    DtHrEndBr:null,
                    IDSefazContingency:pos--,
                    State:uf
                });
            }

            data = adaptToDataTable(data);

            data.sort(sortContingency);

            setListContingency(data);
            setUf(uf);
        } catch (error) {
            handleErrors(error.response);
        } finally {
            setContentLoading(false);
        }
    }

    function updateReg(reg,IDSefazContingency,State, debug = false){
        if(debug){
            console.log(reg);
            console.log(IDSefazContingency);
            console.log(State);
        }

        let index = listContingency.findIndex((o) =>{
            if( IDSefazContingency < 0 ){
                return o.IDSefazContingency == IDSefazContingency;
            } else {
                return o.IDSefazContingency == reg.IDSefazContingency;
            }
        });

        if(debug){
            console.log(index);
        }

        //Deep copy
        let data = JSON.parse(JSON.stringify(listContingency));


        if(debug){
            console.log(data);
        }

        for (const key of Object.keys(reg)){
            if(debug){
                console.log(key)
                console.log(data[index][key]);
            }
            data[index][key] = reg[key];
            if(debug){
                console.log(data[index][key]);
            }
        }

        if(debug){
            console.log(data);
            console.log(data[index]);
        }

        addStateWithoutContingencyToTheList(data,listBrState);

        data.sort(sortContingency);

        setListContingency(data);
    }

    //If desire to use schedule, it could be the actions links on column Ações
    //{(record.Mode == 'Contingência') ? <div><a style={{color:"#0b8235"}} onClick={e => deactivateContingency(e,record.IDSefazContingency,record.State)}>Desativar contingência</a><Divider dashed style={{margin: "6px 0"}} /><a onClick={e => scheduledeactivateContingency(e,record.IDSefazContingency)}>Agendar desativação contingência</a></div> : <div><a style={{color:"#cf1322"}} onClick={e => activateContingency(e,record.IDSefazContingency,record.State)}>Ativar contingência</a><Divider dashed style={{margin: "6px 0"}} /><a onClick={e => scheduleContingency(e,record.IDSefazContingency)}>Agendar contingência</a></div>}

    return (
        <>
            <Row justify='center'>
                <h2>Gerenciar Contingência SEFAZ/NFe</h2>
            </Row>
            <Row justify='start' className='scroll-table'>
                <Col xs={24} lg={10}>
                    <Form layout='vertical'>
                        <Form.Item label="Selecione um estado" name="br_state" rules={[{ required: false }]}>
                            <Select
                                showSearch
                                placeholder="Selecione"
                                size="large"
                                notFoundContent="Nenhum estado foi encontrado!"
                                onChange={o => {handleBrState(o.key)}}
                                onClear={o=> {handleListBrState()}}
                                labelInValue
                                allowClear
                            >
                                {listBrState.map(o => (
                                    <Select.Option key={o.id} value={o.id}>
                                        {o.id} - {o.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row justify='center' className='scroll-table'>
                <h3>Lista de contingência{(uf) ? ` - ${uf}` : ""}</h3>
            </Row>
            <Table pagination={{ pageSize: 20 }} scroll={{ y: 390 }} dataSource={listContingency} locale={{ emptyText: 'Não há registro de contingências' }} >
                <Table.Column title="Estado" dataIndex="State" key="State" filterSearch="true" />
                <Table.Column title="Status" dataIndex="Mode" key="Mode" render={(mode) => (
                    <>
                    <Tag color={mode == 'Contingência' ? "red" : mode == "Finalizado" ? 'default' : "blue"} key={mode}>
                    {mode}
                    </Tag>
                    </>
                )}/>
                <Table.Column title="Início" dataIndex="DtHrStartBr" key="DtHrStartBr" />
                <Table.Column title="Fim" dataIndex="DtHrEndBr" key="DtHrEndBr" />
                <Table.Column title="Ações" render={(_, record) => (
                    (record.Mode == "Finalizado") ? 
                        ""
                    :
                    <Space size="middle">
                    {(record.Mode == 'Contingência') ? <div><a style={{color:"#0b8235"}} onClick={e => deactivateContingency(e,record.IDSefazContingency,record.State)}>Desativar contingência</a></div> : <div><a style={{color:"#cf1322"}} onClick={e => activateContingency(e,record.IDSefazContingency,record.State)}>Ativar contingência</a></div>}
                    </Space>
                )} />
            </Table>
        </>
    )
}
