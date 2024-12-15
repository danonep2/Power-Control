import Aedes, { Client } from "aedes";

export function handleLogs(aedes: Aedes, client: Client, payload: string) {
    console.log(`Logs: ${payload}`);
}