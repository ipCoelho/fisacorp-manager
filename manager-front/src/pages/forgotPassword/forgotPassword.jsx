import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { Row, Col, Form, Input, Button, Divider, Carousel } from 'antd'
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

import logoForgot from '../../public/image//logo-login-forgot.png'

import { useAuth } from '../../hooks/AuthContext';
import { forgotPassword } from '../../services/auth';

export default function ForgotPassword() {

  const { handleError } = useAuth()

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleForgotPassword() {
    console.log('Em desenvolvimento');
    return;
    setLoading(true)
    try {

      const data = await forgotPassword(email)

      console.log(data);

    } catch (error) {
      handleError(error.response)
    } finally {
      setLoading(false)
    }

  }

  return (
    <>

      <Col className="gutter-row box-main" xs={24} sm={24} md={24} lg={12}>
        <Form layout="vertical" className='box-form' onFinish={handleForgotPassword} >
          <div>
            <img className='logo-main' src={logoForgot} alt="Logo recuperar senha" />
          </div>
          <Divider orientation="center">Esqueci minha senha Admin CNT</Divider>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email é obrigatório" }]}>
            <Input size="large" type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Item>

          <Row justify='end'>
            <a className='box-retrieve-password' onClick={() => navigate('/login')} >Voltar para login?</a>
          </Row>

          <Button block htmlType="submit" disabled={loading} size='large'>{loading ? <LoadingOutlined /> : 'ENVIAR'}</Button>
        </Form>
      </Col>
    </>
  )
}
