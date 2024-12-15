import { UUID } from "crypto";
import sequelize from "../config/sequelize";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import User from "./user";

export class tokens extends Model {
    public id!: number;
    public token!: string;

}

tokens.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'api_tokens',
        sequelize,
        timestamps: true,
    },
);

tokens.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});


export default tokens