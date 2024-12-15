import Aedes from 'aedes';
import { createServer } from 'net';
import { handleClient } from './mqtt/handlers/client';
import { handleDisconnect } from './mqtt/handlers/disconnect';
import { handlePublish } from './mqtt/handlers/publish';
import { handleSubscriptions } from './mqtt/handlers/subscribe';


const aedes = new Aedes();
const server = createServer(aedes.handle);
server.listen(1883, () => {
    console.log(`MQTT Server 🚀 listening on port tcp: ${1883}`);
    handleClient(aedes);
    handleDisconnect(aedes);
    handlePublish(aedes);
    handleSubscriptions(aedes);
});