import Aedes, { Client } from 'aedes';

export function handleDisconnect(aedes: Aedes) {
    aedes.on('clientDisconnect', async (client: Client) => {
        console.log(`Client disconnected: ${client.id}`);
    });
}
