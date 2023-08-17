import React, { useState } from 'react';

import { Row, Col, Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

import logoLogin from '../../public/image/logo-login-forgot.png';

import './css/index.scss';

import { signIn } from '../../services/auth';
import { useAuth } from '../../hooks/AuthContext';

export default function Login() {
  const { setUser, handleErrors } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      const { data } = await signIn({ email: email, password: password });

      // localStorage.setItem('token', data.token)

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      setUser(data);

      navigate('/dashboard');
    } catch (error) {
      handleErrors(error.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Col className="gutter-row box-main" xs={24} sm={24} md={24} lg={12}>
        <Form layout="vertical" className="box-form" onFinish={handleSignIn}>
          <div>
            <img className="logo-main" src={logoLogin} alt="Logo login" />
          </div>
          <Divider orientation="center">Admin CNT</Divider>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email é obrigatório' }]}
          >
            <Input
              size="large"
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: 'Senha é obrigatório' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Item>

          <Row justify="end">
            <a
              className="box-retrieve-password"
              onClick={() => navigate('/forgot-password')}
            >
              Esqueceu a senha?
            </a>
          </Row>

          <Button block htmlType="submit" disabled={loading} size="large">
            {loading ? <LoadingOutlined /> : 'ENTRAR'}
          </Button>
        </Form>
      </Col>
    </>
  );
}
