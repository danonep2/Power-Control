import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import Device from "./device";
import EventEmitter from "events";

export const CommandEventEmitter = new EventEmitter();

class Command extends Model {
    public id!: Number;
    public value!: String;
    public device_id!: Number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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

// Sequelize Hook para disparar eventos em tempo real
Command.addHook("afterCreate", (command) => {
    CommandEventEmitter.emit("commandCreated", command.dataValues);
});

Command.addHook("afterUpdate", (command) => {
    CommandEventEmitter.emit("commandUpdated", command);
});

export default Command