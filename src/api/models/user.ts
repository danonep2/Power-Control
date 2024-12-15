import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

class User extends Model {
    public id!: Number;
    public username!: string;
    public auth_hash!: string;
}


User.init(
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
        modelName: "users",
    }
);

export default User