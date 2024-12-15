import Aedes from "aedes";
import { CommandEventEmitter } from "../../api/models/commands";
import Device from "../../api/models/device";

export function RealtimeCommands(aedes: Aedes) {
    // Escuta eventos de criação de comandos
    CommandEventEmitter.on("commandCreated", async (command) => {
        const device = await Device.findOne({ where: { id: command?.device_id } });

        if (!device) {
            return
        }
        const topic = `commands/${device?.cliente_id}`;

        // Publica o comando no tópico MQTT
        aedes.publish({
            topic,
            payload: command?.value,
            cmd: 'publish',
            qos: 0,
            dup: false,
            retain: false
        }, (err) => {
            if (err) {
                console.error('Failed to publish message:', err);
            } else {
                //console.log(`Published to ${mqttTopic}: ${mqttMessage}`);
            }
        });
    });
}
