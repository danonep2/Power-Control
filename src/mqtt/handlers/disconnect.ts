import Aedes, { Client } from 'aedes';
import Device from '../../api/models/device';

export function handleDisconnect(aedes: Aedes) {
    aedes.on('clientDisconnect', async (client: Client) => {
        console.log(`Client disconnected: ${client.id}`);
        await Device.update({ online: false }, { where: { cliente_id: client.id } });
    });
}
