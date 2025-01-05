import path from "path";
import { Sequelize } from "sequelize";
import 'dotenv/config'

const dbName: string = process.env.PG_DATABASE || '';
const dbUser: string = process.env.PG_USER || '';
const dbPassword: string = process.env.PG_PASSWORD || '';
const dbHost: string = process.env.PG_HOST || '';
// Crie uma nova instância do Sequelize para o PostgreSQL

console.log('Bomdia!')
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: 5432,
    dialect: "postgres", // Use 'postgres' para PostgreSQL
    logging: true, // Defina como true se desejar ver as consultas SQL executadas
    timezone: "America/Sao_Paulo"

});

export default sequelize;
