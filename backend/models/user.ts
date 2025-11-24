import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";
import { ROLES } from "../helpers/constants";

export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    rol?: string;
}

interface UserCreationAttributes extends Optional<IUser, 'id' | 'rol'> {}

interface UserInstance extends Model<IUser, UserCreationAttributes>, IUser {}

export const User = sequelize.define<UserInstance>('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: ROLES.user,
        allowNull: false,
    },
})