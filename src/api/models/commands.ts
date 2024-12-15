import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import Device from "./device";

class Command extends Model {
    public id!: Number;
    public value!: String;
    public device_id!: Number;
}

Command.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    },
    {
        sequelize,
        modelName: "commands",
    }
);

//definir a chave estrangeira
Command.belongsTo(Device, {
    foreignKey: 'device_id',
    onDelete: 'CASCADE',
});

export default Command