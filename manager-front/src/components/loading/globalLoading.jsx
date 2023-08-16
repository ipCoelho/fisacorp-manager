import { Spin, Space, Row } from 'antd';

export default function GlobalLoading() {
    return (
        <>
            < Row justify='center' align='middle' style={{ height: '100vh' }} >
                < Space size="middle">
                    <Spin size="large" />
                </Space>
            </Row >
        </>
    )
}
