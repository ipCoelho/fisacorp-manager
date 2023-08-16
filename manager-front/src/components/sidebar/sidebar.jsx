import { useNavigate } from 'react-router-dom';

import { Layout, Menu, Row } from 'antd';
import {
    ApiOutlined,
    DashboardOutlined,
    LogoutOutlined,
    UserOutlined,
    WarningOutlined,
    ContainerOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

import './css/index.css'

import { useAuth } from '../../hooks/AuthContext';

import LogoRockit from '../../public/image/logorockitblack.png'

import ContentLoading from '../loading/contentLoading';

export default function Sidebar({ children }) {

    const navigate = useNavigate()

    const { user, handleLogout, contentLoading } = useAuth();

    return (
        <>
            {contentLoading && <ContentLoading />}
            <Layout >
                <Sider
                    className="sidebar"
                    width="250"
                    breakpoint="xxl"
                    collapsedWidth={0}
                >
                    <Row justify='center'>
                        <img className="logo" src={LogoRockit} width="156" height="54" alt="Logo rockit" />
                    </Row>
                    <Menu theme="dark" mode="vertical" defaultSelectedKeys={[1]}
                        items={
                            [
                                {
                                    key: '1',
                                    icon: <DashboardOutlined />,
                                    label: 'Dashboard',
                                    onClick: () => navigate('/dashboard'),

                                },
                                {
                                    key: '2',
                                    icon: <ApiOutlined />,
                                    label: 'Cadastrar Seller',
                                    onClick: () => navigate('/newseller')
                                },
                                {
                                    key: '3',
                                    icon: <UserOutlined />,
                                    label: 'Gerenciar Seller',
                                    onClick: () => navigate('/gerenciar-seller')
                                },
                                {
                                    key: '4',
                                    icon: <ContainerOutlined />,
                                    label: 'Tempo de CD',
                                    onClick: () => navigate('/gerenciar-seller/centerdistribution/time'),
                                },
                                {
                                    key: '5',
                                    icon: <LogoutOutlined />,
                                    className: 'logout-sidebar',
                                    onClick: () => handleLogout()
                                },
                                {
                                    key: '6',
                                    icon: <WarningOutlined />,
                                    label: 'NF/Sefaz Contigência',
                                    onClick: () => navigate('/invoice-contigency')
                                },
                                ,
                                {
                                    key: '7',
                                    icon: <UserOutlined />,
                                    label: 'Usuários e Privilégios',
                                    onClick: () => navigate('/users-privileges')
                                },
                            ]
                        }
                    >
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background"  >
                        <span className='name-user'>Olá, {user.name}</span>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 20,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}


