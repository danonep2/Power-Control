import Aedes, { Client } from 'aedes';

export function handleSubscriptions(aedes: Aedes) {
    aedes.on('subscribe', (subscriptions: any, client: Client) => {
        if (client && subscriptions.length > 0) {
            const topic = subscriptions[0]?.topic;
            console.log(`Client ${client.id} subscribed to topic: ${topic}`);
        }
    });
}
