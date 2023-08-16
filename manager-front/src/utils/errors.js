import Notification from './feedback';

export default function Errors(data) {

    if (data.data === undefined) {
        return;
    }

    switch (data.status) {
        case 200:
            Notification('success', data.data.message);
            break;
        case 201:
            Notification('success', data.data.message, data.data.seller);
            break;
        case 400:
            Notification('error', data.data.message ?? data.data.message_validate[0]);
            break;
        case 401:
            Notification('error', data.data.message);
            break;
        case 500:
            Notification('error', 'Servidor temporariamente indisponível. Tente novamente em alguns instantes.');
            break;
    }
}
