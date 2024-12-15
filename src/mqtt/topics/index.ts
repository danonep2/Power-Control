import Aedes, { Client, PublishPacket } from "aedes";
import { handleConsumption } from "./consumption";
import { handleLogs } from "./logs";

export function handleTopics(aedes: Aedes, client: Client, packet: PublishPacket, payload: string) {
    const topic = packet.topic;

    const topicParts = topic.split('/');
    console.log(topicParts);

    //verificar se o cliente é o mesmo que está no tópico

    if (topicParts[1] !== client.id) {
        console.log(`Client ${client.id} is not authorized to access topic: ${topic}`);
        return;
    }

    switch (topicParts[0]) {
        case 'consumption':
            handleConsumption(aedes, client, payload);
            break;
        case 'logs':
            handleLogs(aedes, client, payload);
            break;
        default:
            console.log(`Unknown topic: ${topic}`);
    }
}