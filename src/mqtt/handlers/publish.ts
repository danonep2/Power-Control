import Aedes, { Client, PublishPacket } from 'aedes';
import { handleTopics } from '../topics';

export function handlePublish(aedes: Aedes) {
    aedes.on('publish', (packet: PublishPacket, client: Client | null) => {
        if (client) {
            const topic = packet.topic;
            const message = packet.payload.toString();

            console.log(`Received message on topic ${topic}: ${message}`);
            handleTopics(aedes, client, packet, message);
        }
    });
}
