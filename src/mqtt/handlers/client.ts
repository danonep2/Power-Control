import Aedes, { Client } from 'aedes';

export async function handleClient(aedes: Aedes) {
    aedes.on('client', (client: Client) => {
        console.log(`Client ${client.id} connected`);
    });
}