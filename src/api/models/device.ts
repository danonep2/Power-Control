import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

class Device extends Model {
    public id!: Number;
    public tag!: string;
    public cliente_id!: string;
    public online!: boolean;
}

Device.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        cliente_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            unique: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "devices",
    }
);

export default Device