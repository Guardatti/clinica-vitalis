import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";

interface IProfessionals {
    id: number;
    name: string;
    surname: string;
    dni: number;
    birthdate: Date;
    gender: string;
    address: string;
    speciality: string;
}

interface IProfessionalsAttributes extends Optional<IProfessionals, 'id'> {}

interface ProfessionalInstance extends Model<IProfessionals, IProfessionalsAttributes>, IProfessionals {}

export const Professionals = sequelize.define<ProfessionalInstance>('Profesionales', {
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
    dni: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    speciality: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})