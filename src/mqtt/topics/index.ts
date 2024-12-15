import Aedes, { Client, PublishPacket } from "aedes";
import { handleConsumption } from "./consumption";
import { handleLogs } from "./logs";

export function handleTopics(aedes: Aedes, client: Client, packet: PublishPacket, payload: string) {
    const topic = packet.topic;

    const topicParts = topic.split('/');
    console.log(topicParts)

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