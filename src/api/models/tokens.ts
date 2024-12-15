import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import User from "./user";

class ApiTokens extends Model {
    public id!: Number;
    public token!: string;
}

const genhash = () => {
    // Generate a random hash sha 512
    return require('crypto').randomBytes(64).toString('hex');
}

ApiTokens.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            defaultValue: genhash()
        }
    },
    {
        sequelize,
        modelName: "api_tokens",
    }
);


export default ApiTokens