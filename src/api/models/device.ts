import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

class Device extends Model {
    public id!: Number;
    public tag!: string;
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
    },
    {
        sequelize,
        modelName: "devices",
    }
);

export default Device