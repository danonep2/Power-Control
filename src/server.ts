import Aedes from 'aedes';
import { createServer } from 'net';
import { handleClient } from './mqtt/handlers/client';
import { handleDisconnect } from './mqtt/handlers/disconnect';
import { handlePublish } from './mqtt/handlers/publish';
import { handleSubscriptions } from './mqtt/handlers/subscribe';

import express from 'express';
import cors from 'cors';
import router from './api/routers';
import sequelize from './api/config/sequelize';
import User from './api/models/user';

import bcrypt from 'bcrypt';
import Auth from './api/middleware/auth';
import Consumption from './api/models/consumption';
import { RealtimeCommands } from './mqtt/realtime/commands';


// MQTT
const aedes = new Aedes();
const server = createServer(aedes.handle);
server.listen(1883, () => {
    console.log(`MQTT Server 🚀 listening on port api: ${1883}`);
    handleClient(aedes);
    handleDisconnect(aedes);
    handlePublish(aedes);
    handleSubscriptions(aedes);

    //realtime functions
    RealtimeCommands(aedes);
});


// API
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const publicRoutes = ['/api/v1/register'];
    if (publicRoutes.includes(req.path)) {
        return next();
    }
    Auth(req, res, next);
});

app.use("/api/v1", router);

app.listen(80, () => {
    console.log(`API Server 🚀 listening on port http: ${80}`);
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        console.log("Conexão ao banco de dados estabelecida com sucesso.");

        //verificar se o usuario admin existe
        const admin = await User.findOne({ where: { username: 'admin' } });


        if (!admin) {
            await User.create({
                username: process.env.ADMIN_USER || 'admin',
                auth_hash: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin', 10)
            });
        }

    } catch (error) {
        console.error("Não foi possível conectar ao banco de dados:", error);
    }
})();