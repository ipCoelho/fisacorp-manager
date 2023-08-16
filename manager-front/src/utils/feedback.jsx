import { message as messageCopy, notification, Modal, Button } from 'antd';

import { CopyOutlined } from '@ant-design/icons';

import copy from 'copy-to-clipboard';

import './css/index.css';

export default function Notification(type, message, seller) {

    const notifications = () => {
        notification[type]({
            description: message,
            duration: 3,
        });
    }

    const modal = () => {
        Modal.info({
            title: 'Informações sobre o seller',
            content: (
                <>
                    <div className='content-modal'>
                        <ul>
                            <li><b>Login:</b> {seller.login}</li>
                            <li><b>Url:</b> {seller.urlAcesso}</li>
                        </ul>
                    </div>
                    <div className='footer-button'>
                        <Button type='primary' onClick={handleCopy}>
                            <CopyOutlined />
                            Copiar
                        </Button>
                    </div>
                </>
            ),
            width: 550,
            keyboard: false,
            okText: "Fechar",
            onOk() { },
        });
    };

    function handleCopy() {
        copy(`Login: ${seller.login}, \nUrl: ${seller.urlAcesso}`);

        messageCopy.success({
            content: 'Seller copiado!',
            duration: 2,
        });
    }

    if (seller) {
        modal();
    }

    notifications();
}