import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import Device from "./device";

class Consumption extends Model {
    public id!: Number;
    public value!: String;
    public device_id!: Number;
}

Consumption.init(
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
        modelName: "consumption",
    }
);

//definir a chave estrangeira
Consumption.belongsTo(Device, {
    foreignKey: 'device_id',
    onDelete: 'CASCADE',
});

export default Consumption