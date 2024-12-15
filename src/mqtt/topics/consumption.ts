import Aedes, { Client } from "aedes";

export function handleConsumption(aedes: Aedes, client: Client, payload: string) {
    console.log(`Consumption: ${payload}`);
}