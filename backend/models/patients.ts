import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/config";


interface IPatients {
    id: number;
    name: string;
    surname: string;
    dni: number;
    birthdate: Date;
    gender: string;
    address: string;
    socialWork: string;
}

interface IPatientsAttributes extends Optional<IPatients, 'id'> {}

interface PatientInstance extends Model<IPatients, IPatientsAttributes>, IPatients {}

export const Patients = sequelize.define<PatientInstance>('Pacientes', {
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
    socialWork: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})