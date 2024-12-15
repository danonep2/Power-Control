import Aedes, { Client } from 'aedes';
import Device from '../../api/models/device';

export async function handleClient(aedes: Aedes) {
    aedes.on('client', async (client: Client) => {
        console.log(`Client ${client.id} connected`);
        const client_id = client.id;

        await Device.findOne({ where: { cliente_id: client_id } }).then(async (device) => {
            if (!device) {
                await Device.create({ tag: client_id, cliente_id: client_id });
                await Device.update({ online: true }, { where: { cliente_id: client_id } });
            }
            await Device.update({ online: true }, { where: { cliente_id: client_id } });
        });
    });
}