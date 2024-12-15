import Aedes, { Client } from "aedes";
import Device from "../../api/models/device";
import Consumption from "../../api/models/consumption";

export async function handleConsumption(aedes: Aedes, client: Client, payload: string) {
    console.log(`Consumption: ${payload}`);
    const client_id = client.id;

    const device = await Device.findOne({ where: { cliente_id: client_id } });
    if (device) {
        const consumption = payload;

        //verificar se o valor pode ser consertido para float
        const consumption_float = parseFloat(consumption);
        if (!isNaN(consumption_float)) {
            await Consumption.create({ value: consumption, device_id: device.id });
        }
    }
}