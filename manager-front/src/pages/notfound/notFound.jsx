import { Result, Button, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <Row justify='center' align='middle'>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você visitou não existe."
        extra={<Button type="primary" onClick={() => navigate('/dashboard')}>Voltar para home</Button>}
      />
    </Row>
  )
}
